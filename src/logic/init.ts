import fg from 'fast-glob'
import fetch from 'node-fetch'
import { ref } from 'vue'
import localPkgJson from '../../package.json'
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

export function checkVersion() {
  const localVersion = localPkgJson.version
  const shouldUpdate = ref(false)
  const remoteVersion = ref('')
  const name = localPkgJson.name

  fetch(`https://registry.npmjs.org/-/package/${name}/dist-tags`).then(res => res.json()).then((res) => {
    remoteVersion.value = (res as { latest: string }).latest
    if (remoteVersion.value !== localVersion) shouldUpdate.value = true
  })

  return {
    shouldUpdate,
    localVersion,
    remoteVersion,
    name,
  }
}
