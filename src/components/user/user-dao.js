'use strict'

const db = require('src/middlewares/db')
const mixins = require('src/utils/mixins')

function UserDAO () {}

UserDAO.prototype = (function () {
	return {
		findById: function (params, callback) {
			var values = [params.id]

			var sql = `call PS_ReadUserById(?)`

			db.query({
				sql : sql, 
				values: values,
				callback : callback
			})
		},
		findAll: function (params, callback) {
			var values = []

			var sql = `call PS_ReadAllUsers()`

			db.query({
				sql : sql, 
				values: values,
				callback : callback
			})
		},
		insert: function (params, callback) {

			var values = [
				params.id,
				params.email,
				params.password
			]

			var sql = `call PS_CreateUser(?, ?, ?)`

			db.query({
				sql : sql, 
				values: values,
				callback : callback
			})
		},
		update: function (params, callback) {
			var values = [
				params.id, 
				params.email,
				params.password
			]

			var sql = `call PS_UpdateUser(?, ?, ?)`

			db.query({
				sql : sql, 
				values: values,
				callback : callback
			}) 
		},
		delete: function (params, callback) {
			var values = [params.id]

			var sql = `call PS_DeleteUser(?)` 

			db.query({
				sql : sql, 
				values: values,
				callback : callback
			})
		}
	}
})()

module.exports = new UserDAO ()