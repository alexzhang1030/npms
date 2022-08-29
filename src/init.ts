export function readScripts() {
  throw new Error('cannot find package.json', {
    cause: new Error('cannot find package.json'),
  })
}
