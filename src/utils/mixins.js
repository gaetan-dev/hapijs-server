'use strict'

const _ = require('underscore')

exports.capitalize = function (string) {
	const capitalized = string.replace(/^./g, function(char, pos) { return char.toUpperCase() })
	return capitalized.replace(/\-(.)/g, function(_,char){ return char.toUpperCase() } )
}

exports.snakecase = function (string) {
	return string.replace(/\.?([A-Z])/g, function (x,y){return "_" + y.toLowerCase()}).replace(/^_/, "")
}