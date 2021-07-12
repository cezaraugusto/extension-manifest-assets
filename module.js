const scriptFromManifest = require('./generate/scriptFromManifest')
const htmlFromManifest = require('./generate/htmlFromManifest')
const scriptFromHtml = require('./generate/scriptFromHtml')
const cssFromHtml = require('./generate/cssFromHtml')

function getJavaScriptObjects (manifestPath) {
  return Object.assign({},
    // Get JavaScript entries from manifest file.
    // Includes background and content scripts.
    scriptFromManifest(manifestPath),
    // Get relevant HTML entries from manifest file.
    // Includes all manifest fields that accept HTML values.
    await scriptFromHtml(manifestPath)
  )
}

function getAllObjects (manifestPath) {
  return Object.assign({},
    await scriptFromHtml(manifestPath),
    scriptFromManifest(manifestPath),
    await cssFromHtml(manifestPath),
    htmlFromManifest(manifestPath)
  )
}

async function extensionManifestAssets (manifestPath) {
  const allObjects = getAllObjects(manifestPath)
  const allValues = Object.values(allObjects)
  const all = [].concat(...allValues)

  return {
    // Get all JavaScript entries from both HTML files
    // and manifest combined.
    js: getJavaScriptObjects(manifestPath),
    // Get relevant script entries by scrapping HTML pages
    // defined in the manifest file. Includes all scripts
    // defined in every HTML page declared in the manifest file.
    html: htmlFromManifest(manifestPath),
    // Get relevant CSS entries by scrapping HTML pages
    // defined in the manifest file. Includes all CSS
    // defined in every HTML page declared in the manifest file.
    css: await cssFromHtml(manifestPath),
    // Combine all but empty entries
    all: all.filter(data => data !== '')
  }

  // fazerr i parrse pro webpack recebe no depenndencies.add (run-chrome)
  // funfa? volta pro ext-cre e atualiza o dyamicjs e dynamic html
  // depois atualizza esse modulo
  // depois atualiza o chrome-ext
  // atualiza o htmlwebp
  // funfa? atualiza o polyfill
  // tu cai ter q parse o manifest file. tu ja fez  modiulo p isso? p poder alcancar o path correto
}

module.exports = extensionManifestAssets
