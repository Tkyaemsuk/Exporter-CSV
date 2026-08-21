import { execFileSync } from "node:child_process"
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join, resolve } from "node:path"
import vm from "node:vm"

const root = resolve(new URL("..", import.meta.url).pathname)
let code = await readFile(resolve(root, "src/plugin.js"), "utf8")
code = code.replace(
  "const xn = vn, wn = qt;",
  "e.__test = { kt, resolveConditionalStyle }; const xn = vn, wn = qt;"
)

const noop = () => {}
const internal = new Proxy(
  { SvelteComponent: class {}, safe_not_equal: (a, b) => a !== b },
  { get: (object, key) => key in object ? object[key] : noop }
)
const svelte = new Proxy({}, { get: () => noop })
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
  createElement: () => ({ ...domNode }),
  head: domNode,
  body: domNode
}, { get: (object, key) => key in object ? object[key] : noop })
const context = {
  window: { document },
  document,
  svelte_internal: internal,
  svelte,
  navigator: {},
  Blob: class {},
  URL: {},
  console,
  setTimeout,
  clearTimeout
}

vm.runInNewContext(code, context)
const { kt, resolveConditionalStyle } = context.plugin.__test
const column = {
  field: "Status",
  header: "Status",
  include: true,
  format: "number",
  align: "right",
  conditionalRules: [{
    operator: "equals",
    value: "1",
    background: "#FF0000",
    color: "#FFFFFF",
    enabled: true
  }]
}
const conditionalStyle = resolveConditionalStyle(column, 1)
if (!conditionalStyle || conditionalStyle.background !== "#FF0000") {
  throw new Error("Conditional rule did not match Status = 1")
}

const workbook = kt({
  header: ["Status"],
  body: [
    [{ text: "1", number: 1, raw: 1, conditionalStyle }],
    [{ text: "2", number: 2, raw: 2, conditionalStyle: null }]
  ],
  columns: [column]
}, {
  sheetName: "Test",
  fontFamily: "Tahoma",
  fontSize: 11,
  style: {
    headerBg: "#1F6FEB",
    headerColor: "#FFFFFF",
    bodyBg: "#FFFFFF",
    bodyColor: "#111827",
    stripeEnabled: true,
    stripeBg: "#F3F6FA",
    borderColor: "#D0D7DE"
  }
})

const directory = await mkdtemp(join(tmpdir(), "xlsx-export-condition-"))
const output = join(directory, "condition.xlsx")
try {
  await writeFile(output, workbook)
  const styles = execFileSync("unzip", ["-p", output, "xl/styles.xml"], { encoding: "utf8" })
  const sheet = execFileSync("unzip", ["-p", output, "xl/worksheets/sheet1.xml"], { encoding: "utf8" })
  if (!styles.includes('fgColor rgb="FFFF0000"')) {
    throw new Error("Red conditional fill is missing from XLSX styles.xml")
  }
  if (!/<c r="A2" s="4">/.test(sheet)) {
    throw new Error("Status = 1 cell does not reference the conditional style")
  }
  if (/<c r="A3" s="4">/.test(sheet)) {
    throw new Error("Status = 2 incorrectly references the conditional style")
  }
} finally {
  await rm(directory, { recursive: true, force: true })
}

console.log("Verified conditional colour in exported XLSX")
