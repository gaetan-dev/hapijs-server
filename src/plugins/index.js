const path = require('path')
const fs = require('fs')
const _ = require('underscore')

module.exports = (function () {
  const plugins = []

  fs.readdirSync(__dirname).forEach(function (file) {
    /* If its the current file ignore it */
    if (file === 'index.js') return

    plugins.push(require(path.join(__dirname, file)))
  })

  return plugins
})()
