'use strict'

const Joi = require('joi')

function UserModel () {
    this.schema = {
        id: Joi.string(),
        email: Joi.string().max(255),
        password: Joi.string().min(6).max(255)
    }
}

module.exports = UserModel