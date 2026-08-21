import { execFileSync } from "node:child_process"
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join, resolve } from "node:path"
import vm from "node:vm"

const root = resolve(new URL("..", import.meta.url).pathname)
let code = await readFile(resolve(root, "src/plugin.js"), "utf8")
code = code.replace(
  "const xn = vn, wn = qt;",
  "e.__test = { Jt }; const xn = vn, wn = qt;"
)

const noop = () => {}
let exported = null
let exportError = null
let downloaded = null
const sdk = {
  styleable: null,
  API: null,
  fetchData: null,
  notificationStore: { actions: { error: message => { exportError = String(message) } } },
  builderStore: { subscribe(callback) { callback({ inBuilder: false }); return noop } }
}
const componentStore = { subscribe(callback) { callback({}); return noop } }
const internal = new Proxy({
  SvelteComponent: class {},
  safe_not_equal: (a, b) => a !== b,
  component_subscribe: (component, store, callback) => store?.subscribe ? store.subscribe(callback) : noop,
  onDestroy: noop
}, { get: (object, key) => key in object ? object[key] : noop })
const svelte = new Proxy({
  getContext: key => key === "sdk" ? sdk : componentStore
}, { get: (object, key) => key in object ? object[key] : noop })
const anchor = { style: {}, click: noop }
const domNode = {
  appendChild: noop,
  insertBefore: noop,
  removeChild: noop,
  setAttribute: noop,
  style: {},
  sheet: { insertRule: noop, cssRules: [] }
}
const document = new Proxy({
  getElementsByTagName: () => [domNode],
  createElement: tag => tag === "a" ? anchor : { ...domNode },
  head: domNode,
  body: domNode
}, { get: (object, key) => key in object ? object[key] : noop })
class TestBlob {
  constructor(parts, options) {
    this.parts = parts
    this.options = options
    downloaded = this
  }
}
const context = {
  window: { document },
  document,
  svelte_internal: internal,
  svelte,
  navigator: {},
  Blob: TestBlob,
  URL: { createObjectURL: () => "blob:test", revokeObjectURL: noop },
  console,
  setTimeout,
  clearTimeout
}

vm.runInNewContext(code, context)
const columns = Array.from({ length: 61 }, (_, index) => ({
  field: index === 46 ? "Status" : `Field_${index + 1}`,
  header: index === 46 ? "Status" : `Field ${index + 1}`,
  include: true,
  format: index === 46 ? "number" : "auto",
  align: index === 46 ? "right" : "left",
  headerBg: index % 3 === 0 ? "#BEF7F1" : "",
  conditionalRules: index === 46 ? [{
    operator: "equals",
    value: "2",
    background: "yellow",
    color: "#000000",
    enabled: true
  }] : []
}))
const dataRow = Object.fromEntries(columns.map(column => [column.field, column.field === "Status" ? 2 : "Test"]))
const dataSchema = Object.fromEntries(columns.map(column => [column.field, { type: column.field === "Status" ? "number" : "string" }]))
const component = { $$: { dirty: [-1, -1, -1, -1] } }
const props = {
  sourceMode: "provider",
  dataProvider: { rows: [dataRow], schema: dataSchema },
  exportFormat: "xlsx",
  columnsJson: JSON.stringify({ version: 3, columns }),
  showFooter: false,
  onExport: result => { exported = result },
  onError: result => { exportError = result.message }
}
const state = context.plugin.__test.Jt(component, props, (index, value) => value)
component.$$.dirty = [-1, -1, -1, -1]
component.$$.update()

await state[107]({ detail: { columns } })
if (exportError) throw new Error(exportError)
if (!exported || exported.format !== "xlsx" || !downloaded) {
  throw new Error("Designer component export path did not complete")
}
const bytes = downloaded.parts[0]
if (!bytes || typeof bytes.byteLength !== "number" || bytes.byteLength < 1000) {
  throw new Error("Designer component did not generate XLSX bytes")
}

const directory = await mkdtemp(join(tmpdir(), "xlsx-export-component-"))
const output = join(directory, "component-export.xlsx")
try {
  await writeFile(output, bytes)
  const styles = execFileSync("unzip", ["-p", output, "xl/styles.xml"], { encoding: "utf8" })
  const sheet = execFileSync("unzip", ["-p", output, "xl/worksheets/sheet1.xml"], { encoding: "utf8" })
  if (!styles.includes('fgColor rgb="FFFFFF00"')) {
    throw new Error("Designer conditional yellow fill is missing from exported XLSX")
  }
  const fillsXml = styles.match(/<fills[^>]*>([\s\S]*?)<\/fills>/)?.[1] || ""
  const fills = fillsXml.match(/<fill>[\s\S]*?<\/fill>/g) || []
  const yellowFillId = fills.findIndex(fill => fill.includes('fgColor rgb="FFFFFF00"'))
  const cellXfsXml = styles.match(/<cellXfs[^>]*>([\s\S]*?)<\/cellXfs>/)?.[1] || ""
  const cellXfs = cellXfsXml.match(/<xf\b[\s\S]*?(?:<\/xf>|\/>)/g) || []
  const yellowStyleId = cellXfs.findIndex(xf => new RegExp(`fillId="${yellowFillId}"`).test(xf))
  const statusCellStyleId = Number(sheet.match(/<c r="AU2" s="(\d+)"/)?.[1] ?? -1)
  if (yellowFillId < 0 || yellowStyleId < 0 || statusCellStyleId !== yellowStyleId) {
    throw new Error("Exported Status cell does not reference the conditional yellow style")
  }
} finally {
  await rm(directory, { recursive: true, force: true })
}

console.log("Verified Designer component → XLSX export with conditional colour")
