import { createHash } from "node:crypto"
import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { minify } from "terser"

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const pkg = JSON.parse(await readFile(resolve(root, "package.json"), "utf8"))
const source = await readFile(resolve(root, "src/plugin.js"), "utf8")
const result = await minify(source, {
  compress: true,
  mangle: true,
  format: { comments: false }
})

if (!result.code) throw new Error("Terser did not produce plugin output")

await mkdir(resolve(root, "dist"), { recursive: true })
await writeFile(resolve(root, "dist/plugin.min.js"), result.code)

const schemaPath = resolve(root, "schema.json")
const schema = JSON.parse(await readFile(schemaPath, "utf8"))
schema.version = pkg.version
schema.hash = createHash("sha1").update(result.code).digest("hex")
await writeFile(schemaPath, `${JSON.stringify(schema, null, 2)}\n`)
await copyFile(schemaPath, resolve(root, "dist/schema.json"))
await copyFile(resolve(root, "package.json"), resolve(root, "dist/package.json"))

console.log(`Built XLSX-EXPORT v${pkg.version}`)
console.log(`SHA-1 ${schema.hash}`)
