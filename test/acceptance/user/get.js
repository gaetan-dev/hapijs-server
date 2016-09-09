'use strict'

const server = require('index')
const should = require('should')
const userModel = require('src/components/user/user-model')

describe('User GET methods', function () {
    describe('GET /user/{id}', function () {
        const request = {
            method: 'GET',
            url: 'http://localhost:8080/user/1',
        }

        it('should return statusCode 200', function (done) {
            server.inject(request, function (res) {
                res.statusCode.should.be.eql(200)
                done()
            })
        })
    })

    describe('GET /user/{id}', function () {
        const request = {
            method: 'GET',
            url: 'http://localhost:8080/user/1',
        }

        it('should return { id: 1, email: "aaa@mail.com" }', function (done) {
            server.inject(request, function (res) {
                res.payload.should.be.eql({ id: 1, email: 'aaa@mail.com' })
                done()
            })
        })
    })
})