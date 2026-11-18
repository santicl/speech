const fs = require('node:fs')
const path = require('node:path')
const root = path.dirname(require.resolve('pdfjs-dist/package.json'))
const { version } = require(path.join(root, 'package.json'))
const destination = path.resolve(__dirname, '../public/pdfjs')
fs.mkdirSync(destination, { recursive: true })
// Preserve the standalone module: passing it through CRA corrupts its imports.
fs.copyFileSync(path.join(root, 'legacy/build/pdf.worker.min.mjs'), path.join(destination, 'pdf.worker-' + version + '.min.mjs'))
