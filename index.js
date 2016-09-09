'use strict'

const Hapi = require('hapi')
const _ = require('underscore')
const constants = require('src/config/constants')
const routes = require('src/routes')

// Creates server instance.
const options = { debug: { request: [ 'info', 'error' ] } }
const server = new Hapi.Server(options)
// Configure server.
const connection = { host: constants.application['host'], port: constants.application['port'] }
server.connection(connection)

// Dynamically adds all the routes (end-points) to the server instance. The routes are stored in the src/routes folder.
for (var route in routes) {
	server.route(routes[route])
}

// Plugins provide an extensibility platform for both general purpose utilities such as batch requests and for application business logic.
server.ext('onRequest', (request, reply) => {
    request.plugins.createControllerParams = (requestParams) => {
        var params = _.clone(requestParams)
        // params.userId = request.auth.credentials.userId
        return params
    }

    reply.continue()
})

// Starts the hapi.js server.
if (constants.env !== 'test') {
	server.start((err) => {
        if (err)
            throw err
    })

	console.log(`Server running at: ${server.info.uri}`)
}

module.exports = server