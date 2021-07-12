const backgroundPageHTMLEntry = require('./backgroundPage')
const bookmarksOverridePageHTMLEntry = require('./bookmarks')
const devtoolsPageHTMLEntry = require('./devtools')
const historyOverridePageHTMLEntry = require('./history')
const newtabOverridePageHTMLEntry = require('./newtab')
const optionsPageHTMLEntry = require('./options')
const popupPageHTMLEntry = require('./popup')

module.exports = function (extensionPath) {
  return {
    backgroundPage: backgroundPageHTMLEntry(extensionPath),
    bookmkarks: bookmarksOverridePageHTMLEntry(extensionPath),
    devtools: devtoolsPageHTMLEntry(extensionPath),
    history: historyOverridePageHTMLEntry(extensionPath),
    newtab: newtabOverridePageHTMLEntry(extensionPath),
    options: optionsPageHTMLEntry(extensionPath),
    popup: popupPageHTMLEntry(extensionPath)
  }
}
