// Groups based on technology
const scriptFromManifest = require('./generate/scriptFromManifest')
const htmlFromManifest = require('./generate/htmlFromManifest')
const scriptFromHtml = require('./generate/scriptFromHtml')
const cssFromHtml = require('./generate/cssFromHtml')

// CSS sources coming from HTML pages defined in manifest.json
const bookmarksCssEntry = require('./generate/cssFromHtml/bookmarks')
const contentCssEntry = require('./generate/cssFromHtml/content')
const devtoolsCssEntry = require('./generate/cssFromHtml/devtools')
const historyCssEntry = require('./generate/cssFromHtml/history')
const newtabCssEntry = require('./generate/cssFromHtml/newtab')
const optionsCssEntry = require('./generate/cssFromHtml/options')
const popupCssEntry = require('./generate/cssFromHtml/popup')

// HTML pages defined in manifest.json
const backgroundEntry = require('./generate/htmlFromManifest/backgroundPage')
const bookmarksEntry = require('./generate/htmlFromManifest/bookmarks')
const devtoolsEntry = require('./generate/htmlFromManifest/devtools')
const historyEntry = require('./generate/htmlFromManifest/history')
const newtabEntry = require('./generate/htmlFromManifest/newtab')
const optionsEntry = require('./generate/htmlFromManifest/options')
const popupEntry = require('./generate/htmlFromManifest/popup')

// Script sources coming from HTML pages defined in manifest.json
const bgPageScriptEntry = require('./generate/scriptFromHtml/backgroundPage')
const bookmarksScriptEntry = require('./generate/scriptFromHtml/bookmarks')
const devtoolsScriptEntry = require('./generate/scriptFromHtml/devtools')
const historyScriptEntry = require('./generate/scriptFromHtml/history')
const newtabScriptEntry = require('./generate/scriptFromHtml/newtab')
const optionsScriptEntry = require('./generate/scriptFromHtml/options')
const popupScriptEntry = require('./generate/scriptFromHtml/popup')

// Script sources defined in manifest.json
const bgScriptEntry = require('./generate/scriptFromManifest/background')
const contentScriptEntry = require('./generate/scriptFromManifest/content')

async function getAllJavaScriptValues (manifestPath) {
  const htmlScript = await scriptFromHtml(manifestPath)
  const manifestScript = scriptFromManifest(manifestPath)

  const htmlScriptValues = Object.values(htmlScript).flat()
  const manifestScriptValues = Object.values(manifestScript).flat()

  const scriptValues = [
    // Get relevant HTML entries from manifest file.
    // Includes all manifest fields that accept HTML values.
    ...htmlScriptValues,
    // Get JavaScript entries from manifest file.
    // Includes background and content scripts.
    ...manifestScriptValues
  ]

  return [...new Set(scriptValues)]
}

function getAllHtmlValues (manifestPath) {
  const html = htmlFromManifest(manifestPath)
  const htmlValues = Object.values(html).flat()

  return [...new Set(htmlValues)]
}

async function getAllCssValues (manifestPath) {
  const css = await cssFromHtml(manifestPath)
  const cssValues = Object.values(css).flat()

  return [...new Set(cssValues)]
}

async function getAllValues (manifestPath) {
  const cssValues = await getAllCssValues(manifestPath)
  const jsValues = await getAllJavaScriptValues(manifestPath)
  const htmlValues = getAllHtmlValues(manifestPath)
  const allValues = [...cssValues, ...jsValues, ...htmlValues]

  // Remove empty strings
  const values = allValues.filter(v => v != '')
  return values
}

async function extensionManifestAssets (manifestPath) {
  const jsValues = await getAllJavaScriptValues(manifestPath)
  const htmlValues = getAllHtmlValues(manifestPath)
  const cssValues = await getAllCssValues(manifestPath)
  const allValues = await getAllValues(manifestPath)

  return {
    // Get all JavaScript entries from both HTML files
    // and manifest combined.
    js: jsValues,
    // Get relevant script entries by scrapping HTML pages
    // defined in the manifest file. Includes all scripts
    // defined in every HTML page declared in the manifest file.
    html: htmlValues,
    // Get relevant CSS entries by scrapping HTML pages
    // defined in the manifest file. Includes all CSS
    // defined in every HTML page declared in the manifest file.
    css: cssValues,
    // Combine all entries
    all: allValues,
    // Split by feature.
    features: {
      background: {
        scripts: bgScriptEntry(manifestPath),
        page: {
          html: backgroundEntry(manifestPath),
          js: await bgPageScriptEntry(manifestPath)
        }
      },
      content: {
        css: contentCssEntry(manifestPath),
        scripts: contentScriptEntry(manifestPath)
      },
      bookmarks: {
        html: bookmarksEntry(manifestPath),
        css: await bookmarksCssEntry(manifestPath),
        js: await bookmarksScriptEntry(manifestPath)
      },
      devtools: {
        html: devtoolsEntry(manifestPath),
        css: await devtoolsCssEntry(manifestPath),
        js: await devtoolsScriptEntry(manifestPath)
      },
      history: {
        html: historyEntry(manifestPath),
        css: await historyCssEntry(manifestPath),
        js: await historyScriptEntry(manifestPath)
      },
      newtab: {
        html: newtabEntry(manifestPath),
        css: await newtabCssEntry(manifestPath),
        js: await newtabScriptEntry(manifestPath)
      },
      options: {
        html: optionsEntry(manifestPath),
        css: await optionsCssEntry(manifestPath),
        js: await optionsScriptEntry(manifestPath)
      },
      popup: {
        html: popupEntry(manifestPath),
        css: await popupCssEntry(manifestPath),
        js: await popupScriptEntry(manifestPath)
      }
    }
  }
}

// const path = require('path')
// extensionManifestAssets(path.resolve(__dirname, './fixtures/manifest.json'))
module.exports = extensionManifestAssets
