const backgroundScriptEntry = require('./background')
const contentScriptEntry = require('./content')

module.exports = function (manifestPath) {
  return {
    background: backgroundScriptEntry(manifestPath),
    content: contentScriptEntry(manifestPath)
  }
}
