'use strict'

const UserController = require('src/components/user/user-controller')
const UserValidate = require('src/components/user/user-validate')

module.exports = function () {
    return [
        {
            method: 'GET',
            path: '/user/{id}',
            config: {
                handler: UserController.findById,
                validate: UserValidate.findById
            }
        },
        {
            method: 'GET',
            path: '/user',
            config: {
                handler: UserController.findAll,
            }
        },
        {
            method: 'POST',
            path: '/user',
            config: {
                handler: UserController.insert,
                validate: UserValidate.insert
            }
        },
        {
            method: 'PUT',
            path: '/user/{id}',
            config: {
                handler: UserController.update,
                validate: UserValidate.update
            }
        },
        {
            method: 'DELETE',
            path: '/user/{id}',
            config: {
                handler: UserController.delete,
                validate: UserValidate.delete
            }
        }
    ]
}()