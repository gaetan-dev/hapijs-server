'use strict'

const path = require('path')
const fs = require('fs')
const _ = require('underscore')
const walk = require('walkdir')

walk.sync(path.normalize(__dirname + '/../components'), function (file) {
  // If it is not a route file
  if (!file.includes('-route.js')) return 

  // Prepare empty object to store module
  const modules = {}

  var entity = path.basename(file).split('-')[0]

  // Store module with its name (from filename) */
  modules[path.basename(entity, '.js')] = require(path.join(file))

  //Extend module.exports (in this case - underscore.js, can be any other)
  _.extend(module.exports, modules)
})