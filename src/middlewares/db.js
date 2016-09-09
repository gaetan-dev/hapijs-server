'use strict'

const mysql = require('mysql')
const _ = require('underscore')
const constants = require('src/config/constants.js')

module.exports = function () {

	var internals = {}
	var externals = {}

	var options = {
		multipleStatements: true
	}
	_.extend(options, constants.database)
	var pool  = mysql.createPool(options)
	internals.pool = pool

	internals.connect = function (connectHandler) {
		pool.getConnection(function (err, connection) {
			if (err) 
                return connectHandler(err, null)

			return connectHandler(null, connection)
		})
	}

	externals.query = function(params) {
		var sql = params.sql
		var values = params.values
		var queryHandler = params.callback
		internals.connect(function (err, connection) {
			if (err) 
                return queryHandler(err, null)

			connection.query(sql, values, function (err, rows, fields) {
				queryHandler(err, rows)
				connection.release()
			})
		})
	}

	return externals
}()