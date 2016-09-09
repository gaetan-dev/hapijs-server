'use strict'

const path = require('path')
const fs = require('fs')
const _ = require('underscore')
const walk = require('walkdir')
const mixins = require('src/utils/mixins')

walk.sync(path.normalize(__dirname + '/../components'), function (file) {
    // If it is not a route file
    if (!file.includes('-model.js')) return 

    // Prepare empty object to store module
    const modules = {}

    var entity = path.basename(file).split('-')[0]

    const capitalized = mixins.capitalize(entity)

    // Store module with its name (from filename)
    modules[path.basename(capitalized, '.js')] = require(path.join(file))

    // Extend module.exports (in this case - underscore.js, can be any other)
    _.extend(module.exports, modules)
})

exports.map = function (err, data) {
    const entities = []

    if (err)
        return entities

    data[0].forEach(function (element) {
        const entity = {}
        for (let prop in element) {
            entity[mixins.snakecase(prop)] = element[prop]
        }

        entities.push(entity)
    })

    return entities
}