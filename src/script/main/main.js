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
			this.initMenu();
			this.registerEvent();

			/*加载时默认触发一次变化事件进行事件加载*/
			$(window).trigger('hashchange');
			var moduleInfo = ky.utils.getURLValue();
			ky.utils.defaultPage(moduleInfo.module);
		};

		this.initPlugins = function() {
			window.$ = require('jquery'); //jQuery库0
			window.ky = require('common'); //自定义对象
			ky.utils.template = require('template'); //为自定义函数
			ky.ui.select2 = require('select2');
			delete $.fn.select2; //删除jQuery对象下该插件方法，以防随意调用
		};

		this.initMenu = function() {
			var menuData = require('finalJSON/leftMenu');
			var menuHtml = ky.utils.template('main_leftMenu_template', menuData);
			$('#leftMenu-box').html(menuHtml);
		};

		this.registerEvent = function() {
			var InitRegisterEvent = require('main/initRegisterEvent');
			var register = new InitRegisterEvent();
			register.init();
		};
	}
	module.exports = Main;
});