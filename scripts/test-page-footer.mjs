import { execFileSync } from "node:child_process"
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join, resolve } from "node:path"
import vm from "node:vm"

const root = resolve(new URL("..", import.meta.url).pathname)
let code = await readFile(resolve(root, "src/plugin.js"), "utf8")
code = code.replace(
  "const xn = vn, wn = qt;",
  "e.__test = { kt, Bt, printFooterCss, xlsxFooterText }; const xn = vn, wn = qt;"
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
  style: {}, click: noop,
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
  Blob,
  URL: { createObjectURL: blob => { context.savedBlob = blob; return "blob:test"; }, revokeObjectURL: noop },
  console,
  setTimeout,
  clearTimeout
}

vm.runInNewContext(code, context)

const { kt, Bt, printFooterCss, xlsxFooterText } = context.plugin.__test
const footer = { startDate: "วันที่เริ่มใช้งาน 14/10/2569", docCode: "QSM-FM15/7" }
const data = {
  header: ["Item"], columns: [{ field: "Item" }],
  body: Array.from({ length: 150 }, (_, i) => [{ text: "Row " + (i + 1), raw: i + 1 }])
}
if (xlsxFooterText(footer) !== "&L" + footer.startDate + "&C&P/&N&R" + footer.docCode) throw Error("Incorrect Excel page counters")
if (xlsxFooterText(null) || printFooterCss(null)) throw Error("Disabled footer emitted")
if (!xlsxFooterText({ startDate: "A&B" }).includes("A&&B")) throw Error("Excel ampersand not escaped")
if (!printFooterCss({ docCode: 'A"B\\C' }).includes('A\\"B\\\\C')) throw Error("CSS string not escaped")
await Bt(data, "html", { fileName: "footer", footer })
const html = await context.savedBlob.text()
if (!html.includes('counter(page) "/" counter(pages)') || !html.includes('@media print{body{padding:0}.ec-footer{display:none}}')) throw Error("HTML counters missing")

await Bt(data, "xls", { fileName: "footer", footer })
const xls = await context.savedBlob.text()
if (!xls.includes('<PageSetup><Footer x:Data="') || !xls.includes('&amp;C&amp;P/&amp;N')) throw Error("XLS print footer missing")
console.log("Verified HTML/XLS page footer, escaping and disabled footer")

const directory = await mkdtemp(join(tmpdir(), "xlsx-print-footer-"))
try {
  const file = join(directory, "footer.xlsx")
  await writeFile(file, kt(data, { footer, sheetName: "Footer" }))
  const book = execFileSync("unzip", ["-p", file, "xl/workbook.xml"], { encoding: "utf8" })
  const sheet = execFileSync("unzip", ["-p", file, "xl/worksheets/sheet1.xml"], { encoding: "utf8" })
  // The sheet's view index must resolve to a real workbook view.
  if (!book.includes("<bookViews><workbookView ") || !book.includes('windowWidth="') || !book.includes('windowHeight="')) throw Error("Sheet workbookViewId=0 has no workbookView/window dimensions")
  if (!sheet.includes('workbookViewId="0"')) throw Error("Worksheet view reference missing")
  if (!sheet.includes("&amp;L" + footer.startDate + "&amp;C&amp;P/&amp;N&amp;R" + footer.docCode)) throw Error("XLSX footer did not preserve date/page/code")
  const disabled = join(directory, "disabled.xlsx")
  await writeFile(disabled, kt(data, { footer: null }))
  if (execFileSync("unzip", ["-p", disabled, "xl/worksheets/sheet1.xml"], { encoding: "utf8" }).includes("<headerFooter")) throw Error("Disabled XLSX footer emitted")
} finally {
  await rm(directory, { recursive: true, force: true })
}
const long = xlsxFooterText({ startDate: "ก".repeat(1000), docCode: "&".repeat(1000) })
if (long.length > 255 || !long.includes("&C&P/&N&R")) throw Error("Footer exceeds Excel limit or lost page/code sections")
const clean = xlsxFooterText({ startDate: "A\u0000\nB", docCode: "QSM-FM15/7" })
if (/[\u0000-\u001f]/.test(clean)) throw Error("Control character in Excel footer")
console.log("Verified XLSX workbook view reference and footer compatibility")
