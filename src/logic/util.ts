import { accessSync, constants, readFileSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { detect } from 'detect-package-manager'

export const isExisting = (filePath: string) => {
  try {
    accessSync(filePath, constants.R_OK)
    return true
  }
  catch (error) {
    return false
  }
}

const parseJson = (jsonFile: string, cbMessage: string) => {
  try {
    return JSON.parse(jsonFile)
  }
  catch (error) {
    throw new Error(cbMessage)
  }
}

export const readFile = (filePath: string, type: 'regular' | 'json' = 'regular') => {
  try {
    const file = readFileSync(filePath, 'utf-8')
    return type === 'json' ? parseJson(file, `cannot parse ${filePath}`) : file
  }
  catch (error) {
    throw new Error((error as Error).message, {
      cause: error,
    })
  }
}

export const parseScripts = (scripts: Record<string, string>) => {
  return Object.keys(scripts).map(scriptName => ({
    label: scriptName,
    value: scripts[scriptName],
  }))
}

export const executeScript = (script: string) => {
  detect().then((pm) => {
    spawnSync(pm, script.split(' '), { stdio: 'inherit' })
  })
}
