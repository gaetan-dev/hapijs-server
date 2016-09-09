'use strict'

const Hapi = require('hapi')
const Boom = require('boom')
const _ = require('underscore')
const li = require('li')
const paginationLinks = require('src/utils/pagination-links')
const constants = require('src/config/constants')

function ReplyHelper(request, reply) {
	this.request = request
	this.reply = reply
	this.url = request.headers.host ? 'http://' + request.headers.host : constants.server.defaultHost
}

/*
 * SUCCESS
 */
ReplyHelper.prototype.replyFindOne = function (err, entity) {
	if (err) 
        return this.replyBadImplementation(err)

	if (!_.isEmpty(entity))
        this.reply(entity).type('application/json')
	else 
        this.replyNotFound()
}

ReplyHelper.prototype.replyFind = function (err, entities) {
	if (err)
        return this.replyBadImplementation(err)

    const options = {
		url : this.url + this.request.path,
		page : Number(this.request.query.page),
		perPage : Number(this.request.query.perPage || this.request.query.per_page),
		totalCount : entities.length
	}

	const linksHeader = paginationLinks.create(options)

    let pag = entities
    if (!_.isEmpty(linksHeader)) {
        const start = options.perPage * (options.page - 1) 
        const end = start + options.perPage
        pag = entities.slice(start, end)
    }

	const response = this.reply(pag).hold()

	if (!_.isEmpty(linksHeader))
		response.header('Link', li.stringify(linksHeader))

	response.type('application/json')
		.header('Total-Count', entities.length)
		.send()
}

ReplyHelper.prototype.replyInsert = function (err, entity) {
    if (err)
        if (err.errno === 1062) // Duplicate entry for key
            return this.replyBadRequest(err)
        else
            return this.replyBadImplementation(err)

    const location = this.url + this.request.path + '/' + entity.Id

    this.reply(entity)
        .type('application/json')
        .code(201)
        .header('Location', location)
}

ReplyHelper.prototype.replyUpdate = function (err, entity) {
    if (err)
        if (err.errno === 1048) // Column cannot be null
            return this.replyBadRequest(err)
        else
            return this.replyBadImplementation(err)
        

	if (!_.isEmpty(entity))
        this.reply(entity).type('application/json')
    else
        this.replyNotFound()
}

ReplyHelper.prototype.replyDelete = function (err) {
	if (err) 
        return this.replyBadImplementation(err)

	this.reply().code(204)
}

/*
 * ERROR
 */
ReplyHelper.prototype.replyBadRequest = function (err) {
    this.reply(Boom.badRequest(err))
}

ReplyHelper.prototype.replyBadImplementation = function (err) {
    this.reply(Boom.badImplementation(err))
}

ReplyHelper.prototype.replyNotFound = function () {
    this.reply(Boom.notFound())
}

module.exports = ReplyHelper