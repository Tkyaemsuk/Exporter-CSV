import { readFile } from "node:fs/promises"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import vm from "node:vm"

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const pkg = JSON.parse(await readFile(resolve(root, "package.json"), "utf8"))
const schema = JSON.parse(await readFile(resolve(root, "schema.json"), "utf8"))
const code = await readFile(resolve(root, "dist/plugin.min.js"), "utf8")
const sourceCode = await readFile(resolve(root, "src/plugin.js"), "utf8")
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
const window = { document }

vm.runInNewContext(code, {
  window,
  document,
  svelte_internal: internal,
  svelte,
  navigator: {},
  Blob: class {},
  URL: {},
  console,
  setTimeout,
  clearTimeout
})

const registration = window["##BUDIBASE_CUSTOM_COMPONENTS##"]?.[0]
const settings = (registration?.schema?.schema?.settings || [])
  .flatMap(section => section.settings || [])
const errors = []

if (!registration) errors.push("Plugin did not register")
if (registration?.version !== pkg.version) errors.push("Bundle version does not match package.json")
if (registration?.schema?.schema?.name !== "xlsx-export") errors.push("Component name must be xlsx-export")
if (registration?.schema?.schema?.friendlyName !== "XLSX-EXPORT") errors.push("Friendly name must be XLSX-EXPORT")
if (pkg.author !== "-") errors.push("Author must be -")
if (schema.version !== pkg.version) errors.push("schema.json version does not match package.json")
if (settings.find(item => item.key === "columnsJson")?.type !== "text") {
  errors.push("columnsJson must use the Budibase 3.4.1-compatible text setting")
}
if (settings.find(item => item.key === "showDocumentHeader")) {
  errors.push("showDocumentHeader must be automatic and not exposed as a separate setting")
}
if (settings.find(item => item.key === "documentHeaderRows")) {
  errors.push("documentHeaderRows must not be exposed as a raw JSON setting")
}
if (settings.find(item => item.key === "documentHeaderImage")) {
  errors.push("documentHeaderImage must be configured in the visual designer")
}
if (!/parseDocumentHeaderRows|openDocumentHeaderDesigner|headerDesigner|hasDocumentHeader|mergeCell|MergeAcross/.test(code)) {
  errors.push("Document header rendering code is missing")
}
if (/logoFileInput|currentHeaderConfig|headerConfig\.enabled|xlsxLogoRequiresBase64/.test(code)) {
  errors.push("Document header image controls must be removed")
}
if (!/parseLockedDesign|documentHeaderRows/.test(code)) {
  errors.push("Unified locked design support is missing")
}
if (!/conditionalRules|openConditionalFormattingDesigner|resolveConditionalStyle/.test(code)) {
  errors.push("Conditional formatting support is missing")
}
if (!/yellow:\s*["']FFFF00["']/.test(sourceCode)) {
  errors.push("Named CSS colours must be converted to XLSX RGB values")
}
if (!/conditionalStyle\s*=\s*resolveConditionalStyle\(t, a\.raw\)/.test(sourceCode)) {
  errors.push("Export cells must carry their resolved conditional style")
}
if (!/f\("export",\s*\{\s*columns:\s*M\(s\)/.test(sourceCode)) {
  errors.push("Designer export must dispatch the exact preview column snapshot")
}
if (!/yt\(null,\s*e\s*&&\s*e\.detail\s*&&\s*e\.detail\.columns\)/.test(sourceCode)) {
  errors.push("Designer export snapshot must be passed to the export pipeline")
}
if (!/const\s+exportResult\s*=\s*await\s+Bt\(/.test(sourceCode)) {
  errors.push("Export result must not shadow component data state")
}
if (!/t\s*&&\s*t\.length\s*\?\s*M\(t\)\s*:\s*et\.length\s*\?\s*M\(et\)/.test(sourceCode)) {
  errors.push("Export must always use the open Designer snapshot without an override flag")
}
if (/\beval\s*\(|new Function\s*\(/.test(code)) {
  errors.push("Unsafe arbitrary JavaScript execution is forbidden")
}
if (/localStorage|storageTableId|\.fetchRow\(|\.saveRow\(/.test(code)) {
  errors.push("Forbidden browser/server persistence code detected")
}

if (errors.length) throw new Error(errors.join("\n"))
console.log(`Verified XLSX-EXPORT v${pkg.version}`)
