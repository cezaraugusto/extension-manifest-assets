[npm-image]: https://img.shields.io/npm/v/extension-manifest-assets.svg
[npm-url]: https://npmjs.org/package/extension-manifest-assets

# extension-manifest-assets [![npm][npm-image]][npm-url]

> Output file paths from fields declared in a browser extension manifest file.

Get all your HTML, JS and CSS assets from your manifest, including scripts and CSS declared in HTML files.

## Installation

```
npm i --save-dev extension-manifest-assets
```
## Usage

```js
const extensionManifestAssets = require('extension-manifest-assets')

// Sample manifest with workable fields
const manifestSample = {
  "author": "Cezar Augusto",
  "background": {
  "persistent": false,
    "page": "background/background.html" // Declares background.js via <script>
  },
  "browser_action": {
    "default_popup": "popup/popup.html", // Declares popup.js via <script> and popup.css via <link>
    "default_title": "Test"
  },
  "chrome_url_overrides": {
    "newtab": "overrides/newtab/newtab.html" // Declares newtab.js via <script> and newtab.css via <link>
  },
  "content_scripts": [
  {
    "css": [
      "content/content.css",
      "content/content2.css"
    ],
    "js": [
      "content/content.js",
      "content/content2.js"
    ]
  }
  ],
    "devtools_page": "devtools/devtools.html", // Declares devtools.js via <script> and devtools.css via <link>
    "options_ui": {
    "chrome_style": true,
    "page": "options/options.html" // Declares options.js via <script> and options.css via <link>
  }
}

console.log(manifestAssets)
```

Returns:

```js
  {
    js: [
      '<absolute-path-to-your-extension>/content/content.js',
      '<absolute-path-to-your-extension>/background/background.js',
      '<absolute-path-to-your-extension>/devtools/devtools.js',
      '<absolute-path-to-your-extension>/overrides/newtab/newtab.js',
      '<absolute-path-to-your-extension>/options/options.js',
      '<absolute-path-to-your-extension>/popup/popup.js'
    ],
    html: [
      '<absolute-path-to-your-extension>/background/background.html',
      '<absolute-path-to-your-extension>/devtools/devtools.html',
      '<absolute-path-to-your-extension>/overrides/newtab/newtab.html',
      '<absolute-path-to-your-extension>/options/options.html',
      '<absolute-path-to-your-extension>/popup/popup.html'
    ],
    css: [
      '<absolute-path-to-your-extension>/content/content.css',
      '<absolute-path-to-your-extension>/content/content2.css',
      '<absolute-path-to-your-extension>/devtools/devtools.css',
      '<absolute-path-to-your-extension>/overrides/newtab/newtab.css',
      '<absolute-path-to-your-extension>/options/options.css',
      '<absolute-path-to-your-extension>/popup/popup.css'
    ],
    all: [
      '<absolute-path-to-your-extension>/content/content.js',
      '<absolute-path-to-your-extension>/background/background.js',
      '<absolute-path-to-your-extension>/devtools/devtools.js',
      '<absolute-path-to-your-extension>/overrides/newtab/newtab.js',
      '<absolute-path-to-your-extension>/options/options.js',
      '<absolute-path-to-your-extension>/popup/popup.js',
      '<absolute-path-to-your-extension>/background/background.html',
      '<absolute-path-to-your-extension>/devtools/devtools.html',
      '<absolute-path-to-your-extension>/overrides/newtab/newtab.html',
      '<absolute-path-to-your-extension>/options/options.html',
      '<absolute-path-to-your-extension>/popup/popup.html',
      '<absolute-path-to-your-extension>/content/content.css',
      '<absolute-path-to-your-extension>/content/content2.css',
      '<absolute-path-to-your-extension>/devtools/devtools.css',
      '<absolute-path-to-your-extension>/overrides/newtab/newtab.css',
      '<absolute-path-to-your-extension>/options/options.css',
      '<absolute-path-to-your-extension>/popup/popup.css'
    ],
    features: {
      background: {
      scripts: [],
      page: {
        html: '<absolute-path-to-your-extension>/background/background.html',
        js: ['<absolute-path-to-your-extension>/background/background.js']
      }
    },
    content: {
      css: [
        '<absolute-path-to-your-extension>/content/content.css',
        '<absolute-path-to-your-extension>/content/content2.css',
      ],
      scripts: [
        '<absolute-path-to-your-extension>/content/content.js'
        '<absolute-path-to-your-extension>/content/content2.js'
      ]
    },
    bookmarks: {
      html: '',
      css: [],
      js: []
    },
    devtools: {
      html: '<absolute-path-to-your-extension>/devtools/devtools.html',
      css: ['<absolute-path-to-your-extension>/devtools/devtools.css'],
      js: ['<absolute-path-to-your-extension>/devtools/devtools.js']
    },
    history: {
      html: '',
      css: [],
      js: []
    },
    newtab: {
      html: '<absolute-path-to-your-extension>/newtab/newtab.html',
      css: ['<absolute-path-to-your-extension>/newtab/newtab.css'],
      js: ['<absolute-path-to-your-extension>/newtab/newtab.js']
    },
    options: {
      html: '<absolute-path-to-your-extension>/options/options.html',
      css: ['<absolute-path-to-your-extension>/options/options.css'],
      js: ['<absolute-path-to-your-extension>/options/options.js']
    },
    popup: {
      html: '',
      css: [],
      js: []
    }
  }
```
## API

### extensionManifestAssets(manifestFilePath)

#### manifestFilePath

Type: `string`

## Returns

#### const {js} = extensionManifestAssets(manifestFilePath)

Type: `array`

Returns only JavaScript entries.

#### const {html} = extensionManifestAssets(manifestFilePath)

Type: `array`

Returns only HTML entries.

#### const {css} = extensionManifestAssets(manifestFilePath)

Type: `array`

Returns only CSS entries.

#### const {all} = extensionManifestAssets(manifestFilePath)

Type: `array`

Returns all entries.

#### const {features} = extensionManifestAssets(manifestFilePath)

Type: `object`

Returns all entries split by feature.

## License

MIT (c) Cezar Augusto.
