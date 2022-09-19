import { pkgName } from './constant'
import { isExisting, readFile, withCwd } from './util'

export function readScripts() {
  if (!isExisting(withCwd(pkgName)))
    throw new Error('cannot find package.json')
  else
    return readFile(withCwd(pkgName), 'json').scripts
}
