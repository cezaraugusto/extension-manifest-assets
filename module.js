const scriptFromManifest = require('./generate/scriptFromManifest')
const scriptFromHtml = require('./generate/scriptFromHtml')
const htmlFromManifest = require('./generate/htmlFromManifest')
const cssFromHtml = require('./generate/cssFromHtml')

async function extensionManifestAssets (manifestPath) {
  const dependencies = [
    // Get JavaScript entries from manifest file.
    // Includes background and content scripts.
    ...scriptFromManifest(manifestPath),
    // Get relevant HTML entries from manifest file.
    // Includes all manifest fields that accept HTML values.
    ...htmlFromManifest(manifestPath),
    // Get relevant script entries by scrapping HTML pages
    // defined in the manifest file. Includes all scripts
    // defined in every HTML page declared in the manifest file.
    ...await scriptFromHtml(manifestPath),
    // Get relevant CSS entries by scrapping HTML pages
    // defined in the manifest file. Includes all CSS
    // defined in every HTML page declared in the manifest file.
    ...await cssFromHtml(manifestPath)
  ]

  let js = []
  let css = []
  let html = []

  for (const dependency of dependencies) {
    if (dependency.endsWith('.js')) js.push(dependency)
    if (dependency.endsWith('.css')) css.push(dependency)
    if (dependency.endsWith('.html')) html.push(dependency)
  }

  return {
    js,
    css,
    html,
    all: [...html, ...css, ...js]
  }
}

module.exports = extensionManifestAssets
