import { accessSync, constants, readFileSync } from 'node:fs'
import { resolve as pathResolve } from 'node:path'

const cwd = process.cwd()
export const withCwd = (path: string) => pathResolve(cwd, path)

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
    throw new Error(`an error happened when reading file: ${filePath}`, {
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
