'use strict'

const server = require('index')
const should = require('should')
const userModel = require('src/components/user/user-model')

describe('User GET methods', function () {
    describe('[SUCCESS] GET /user/{id}', function () {
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

        it('should return { id: 1, email: "aaa@mail.com", password:"123456" }', function (done) {
            server.inject(request, function (res) {
                res.payload.should.be.eql(JSON.stringify({ 
                    id: '1', 
                    email: 'aaa@mail.com',
                    password: '123456'
                }))
                done()
            })
        })
    })

    describe('[ERROR] GET /user/{id}', function () {
        const request = {
            method: 'GET',
            url: 'http://localhost:8080/user/1024',
        }

        it('should return statusCode 404', function (done) {
            server.inject(request, function (res) {
                res.statusCode.should.be.eql(404)
                done()
            })
        })

        it('should return 404 error object', function (done) {
            server.inject(request, function (res) {
                res.payload.should.be.eql(JSON.stringify({
                    statusCode: 404,
                    error: "Not Found"
                }))
                done()
            })
        })
    })
})