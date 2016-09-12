'use strict'

const server = require('index')
const should = require('should')
const userModel = require('src/components/user/user-model')

describe('User GET methods', function () {
    describe('[SUCCESS] GET /user', function () {
        const request = {
            method: 'GET',
            url: 'http://localhost:8080/user',
        }

        it('should return statusCode 200', function (done) {
            server.inject(request, function (res) {
                res.statusCode.should.be.eql(200)
                done()
            })
        })
    })
})