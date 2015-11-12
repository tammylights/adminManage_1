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
			window.$ = require('jquery'); //jQuery库
			window.ky = require('common'); //自定义对象
			ky.utils.template = require('template'); //为自定义函数
			ky.ui.select2 = require('select2');
			delete $.fn.select2; //删除jQuery对象下该插件方法，以防随意调用

			var select2 = new ky.ui.select2($('select'), {}); //初始化页面下拉框
			this.registerEvent();
			$(window).trigger('hashchange');
			this.initMenu();
		};

		this.initMenu = function() {
			var menuData = require('modules/finalJSON/leftMenu');
			var menuHtml = ky.utils.template('main_leftMenu_template', menuData);
			$('#leftMenu-box').html(menuHtml);

			// /*加载时默认触发一次变化事件进行事件加载*/
			// $(window).trigger('hashchange');
		};

		this.registerEvent = function() {

			$('#menu-box').on('click', '.submenu>a,li ul li>a', function(e) {
				var m = $(this);
				if (m.siblings('ul').length > 0 || m.parent().hasClass('submenu')) {
					/**
					 * 第一层点击处理
					 */
					var subMenu = m.siblings('ul');
					var isOpen = m.parent().hasClass('open');
					m.parent().siblings().removeClass('open').children('ul').slideUp('fast');
					if (isOpen) {
						subMenu.slideUp('fast', function() {
							m.parent().removeClass('open');
						});
					} else {
						subMenu.slideDown('fast', function() {
							m.parent().addClass('open');
						});
					}
					m.parents('.menu').find('li').removeClass('active');
					if (m.children('i').hasClass('icon-home')) {
						window.location.href = ky.utils.BASICURL + '#';
					}
				} else {
					/**
					 * 第二层点击处理
					 */
					m.parents('.menu').find('li').removeClass('active').end().end().parent().addClass('active');
					var currentUrl = m.attr('data-url');
					var moduleFlag = m.parents('ul').siblings('a').attr('data-module');
					ky.utils.load(moduleFlag + currentUrl);
				}
			});

			/*地址栏变化事件*/
			$(window).on('hashchange', function(e) {
				var currentHash = window.location.hash,
					repHash = currentHash.replace(/^[#]$/ig, '');
				var moduleInfo = ky.utils.getURLValue();
				if (!currentHash || !repHash || !moduleInfo.module) {
					log('无模块及参数,不做任何操作');
					return false;
				}
				ky.utils.showHTML(moduleInfo.module);
			});

			/*为密码框绑定事件，禁止复制，剪贴，粘贴，输入空格*/
			$('body').on('keyup', 'input:password,.pwd', function() {
				this.value = this.value.replace(/\s/, '');
			});

			$('body').on('copy paste cut', 'input:password', function() {
				return false;
			});

			/*返回事件*/
			$('#content-container').on('click', '.goBack', function() {
				window.history.go(-1);
			});
		};
	}
	module.exports = Main;
});