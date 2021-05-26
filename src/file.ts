import { readFileSync, readdirSync } from 'fs'
import { outputFile } from 'fs-extra'
import { execSync } from 'child_process'

export function readFile(file: string): string {
  const text: string = readFileSync(file).toString()
  return text 
}

export function writeFile(file: string, text: string) {
  outputFile(file, text)
}

export function extractFileName(fullName: string): string {
  return fullName.replace(/^.*[\\\/]/, '')
}

export function scanDirectory(dir: string) {
  return readdirSync(dir, { withFileTypes: true })
  .flatMap((dirrent) => {
    return dirrent.isFile()
      ? [`${dir}/${dirrent.name}`]
      : scanDirectory(`${dir}/${dirrent.name}`)
  })
}

export function removeDir(dir: string) {
  execSync(`rm -rf ${dir}`)
}
