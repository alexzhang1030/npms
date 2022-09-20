import fg from 'fast-glob'
import { ignorePath, pkgName } from './constant'
import { parseScripts, readFile } from './util'

const ignorePattern = ignorePath.map(path => `!${path}`)

export function readScripts(): [string[], ReturnType<typeof parseScripts>[]] {
  const pkgFilePaths = fg.sync([pkgName, `**/**/${pkgName}`, ...ignorePattern], { dot: true })
  const names: string[] = []
  const scripts: ReturnType<typeof parseScripts>[] = []
  pkgFilePaths.forEach((pkgFilePath) => {
    const pkg = readFile(pkgFilePath, 'json')
    if (pkg.scripts) {
      names.push(pkg.name || pkgFilePath)
      scripts.push(parseScripts(pkg.scripts))
    }
  })
  return [names, scripts]
}
