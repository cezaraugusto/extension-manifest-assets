const bookmarksOverrideCssEntry = require('./bookmarks')
const contentCssEntry = require('./content')
const devtoolsCssEntry = require('./devtools')
const historyOverrideCssEntry = require('./history')
const newtabOverrideCssEntry = require('./newtab')
const optionsCssEntry = require('./options')
const popupCssEntry = require('./popup')

module.exports = async function (manifestPath) {
  return {
    bookmarks: await bookmarksOverrideCssEntry(manifestPath),
    content: await contentCssEntry(manifestPath),
    devtools: await devtoolsCssEntry(manifestPath),
    history: await historyOverrideCssEntry(manifestPath),
    newtab: await newtabOverrideCssEntry(manifestPath),
    options: await optionsCssEntry(manifestPath),
    popup: await popupCssEntry(manifestPath)
  }
}
