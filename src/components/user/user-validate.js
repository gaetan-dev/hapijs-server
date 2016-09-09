'use strict'

const _ = require('underscore')
const Joi = require('joi')
const models = require('src/models')
const routes = require('src/routes')

function UserValidate() {}

UserValidate.prototype = (function () {
    const userSchema = new models.User().schema

    return {
        findById: {
            params: (function () {
                return {
                    id: userSchema.id.required()
                }
            })()
        },
        insert: {
			payload: (function () {
				return {
					id : userSchema.id.required(),
                    email: userSchema.email.required(),
                    password: userSchema.password.required()
				}
			})()
		},
        update: {
            params: (function () {
                return {
                    id: userSchema.id.required()
                }
            })(),
            payload: (function () {
                return {
                    email: userSchema.email.required(),
                    password: userSchema.password.required()
				}
            })()
        },
        delete: {
            params: (function () {
                return {
                    id: userSchema.id.required()
                }
            })()
        }
    }
})()

module.exports = new UserValidate()
