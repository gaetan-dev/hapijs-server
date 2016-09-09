'use strict'

const Hapi = require('hapi')
const _ = require('underscore')
const ReplyHelper = require('src/components/reply-helper')
const userDao = require('src/components/user/user-dao')
const models = require('src/models')

function UserController() {}

UserController.prototype = (function () {
    return {
        findById: function (request, reply) {
            // Every controller module will use a helper module called ReplyHelper (src/controllers/reply-helper.js).
            const helper = new ReplyHelper(request, reply)
            // Plugins provide an extensibility platform for both general purpose utilities such as batch requests and for application business logic.
            const params = request.plugins.createControllerParams(request.params)

            userDao.findById(params, function (err, data) {
                const user = models.map(err, data)[0]
                helper.replyFindOne(err, user)
            })
        },
        findAll: function (request, reply) {
            const helper = new ReplyHelper(request, reply)
            const params = request.plugins.createControllerParams(request.params)

            userDao.findAll(params, function (err, data) {
                const users = models.map(err, data)
                helper.replyFind(err, users)
            })
        },
        insert: function (request, reply) {
            const helper = new ReplyHelper(request, reply)
			const params = request.plugins.createControllerParams(request.payload)
			
			userDao.insert(params, function (err, data) {
                const user = models.map(err, data)[0]
                helper.replyInsert(err, user)
            })
        },
        update: function (request, reply) {
			const helper = new ReplyHelper(request, reply)
			const payload = request.plugins.createControllerParams(request.payload)
			const params = request.plugins.createControllerParams(request.params)

			_.extend(params, payload)
			
			userDao.update(params, function (err, data) {
                const user = models.map(err, data)[0]
                helper.replyUpdate(err, user)
            })
		},
        delete: function (request, reply){
			var helper = new ReplyHelper(request, reply)
			var params = request.plugins.createControllerParams(request.params)

			userDao.delete(params, function (err) {
				helper.replyDelete(err)
			})
		}
    }
})()

module.exports = new UserController()