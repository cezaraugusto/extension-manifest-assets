const backgroundPageScriptEntry = require('./backgroundPage')
const bookmarksOverrideScriptEntry = require('./bookmarks')
const devtoolsScriptEntry = require('./devtools')
const historyOverrideScriptEntry = require('./history')
const newtabOverrideScriptEntry = require('./newtab')
const optionsScriptEntry = require('./options')
const popupScriptEntry = require('./popup')

module.exports = async function (manifestPath) {
  return {
    backgroundPage: await backgroundPageScriptEntry(manifestPath),
    bookmarks: await bookmarksOverrideScriptEntry(manifestPath),
    devtools: await devtoolsScriptEntry(manifestPath),
    history: await historyOverrideScriptEntry(manifestPath),
    newtab: await newtabOverrideScriptEntry(manifestPath),
    options: await optionsScriptEntry(manifestPath),
    popup: await popupScriptEntry(manifestPath)
  }
}
