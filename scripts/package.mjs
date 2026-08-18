import { copyFile, mkdir, readFile, rm } from "node:fs/promises"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import * as tar from "tar"

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const pkg = JSON.parse(await readFile(resolve(root, "package.json"), "utf8"))
const stage = resolve(root, ".package")
const release = resolve(root, "release")
const archive = resolve(release, `${pkg.name}-${pkg.version}.tar.gz`)

await rm(stage, { recursive: true, force: true })
await mkdir(stage, { recursive: true })
await mkdir(release, { recursive: true })
await copyFile(resolve(root, "dist/plugin.min.js"), resolve(stage, "plugin.min.js"))
await copyFile(resolve(root, "schema.json"), resolve(stage, "schema.json"))
await copyFile(resolve(root, "package.json"), resolve(stage, "package.json"))
await tar.c({ gzip: true, cwd: stage, file: archive }, [
  "package.json",
  "plugin.min.js",
  "schema.json"
])
await rm(stage, { recursive: true, force: true })

console.log(`Created ${archive}`)
