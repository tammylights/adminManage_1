/**
 * main.js
 * @authors tammy (http://tammylights.com)
 * @date    2015-10-28 14:54:10
 * @version 1.0
 */
define(function(require, exports, module) {
	"use strict";

	function Main() {
		var _this = this;

		this.init = function() {
			this.initPlugins();
		};

		this.initPlugins = function() {
			window.$ = require('jquery');
			var template = require('template');
			var select2 = require('select2');
			var as = new select2($('select'),{});
			console.log(as);
		};

		this.registerEvent = function() {
			
		};
	}
	module.exports = Main;
});