/**
 * FINAL_MENU_DATA
 * @authors tammy (http://tammylights.com)
 * @date    2015-11-11 14:31:57
 * @version 1.0
 */
define(function(require, exports, module) {
	"use strict";
	var FINAL_MENU_DATA_JSON = {
		menus: [{
			name: '简介内容',
			id: '100000000',
			icon: 'icon-dashboard',
			module: '/modules/introduction',
			childrens: [{
				name: '子内容1',
				id: '100000000-1',
				url: '/introduction'
			}]
		}, {
			name: '微应用',
			id: '200000000',
			icon: 'icon-widget',
			module: '/modules/widget',
			childrens: [{
				name: '应用1',
				id: '200000000-1',
				url: '/widget'
			}]
		}, {
			name: '图标示例',
			id: '300000000',
			icon: 'icon-charts',
			module: '/modules/icon',
			childrens: [{
				name: '图标列表',
				id: '300000000-1',
				url: '/icon'
			}]
		}, {
			name: '元素示例',
			id: '400000000',
			icon: 'icon-computer',
			module: '/modules/elements',
			childrens: [{
				name: '子元素1',
				id: '400000000-1',
				url: '/elements'
			}]
		}, {
			name: '编辑示例',
			id: '500000000',
			icon: 'icon-edit',
			module: '/modules/edit',
			childrens: [{
				name: '店铺审核',
				id: '500000000-1',
				url: '/edit'
			}]
		}, {
			name: '表格',
			id: '600000000',
			icon: 'icon-table',
			module: '/modules/tables',
			childrens: [{
				name: '店铺审核',
				id: '600000000-1',
				url: '/tables'
			}]
		}, {
			name: '消息示例',
			id: '700000000',
			icon: 'icon-message',
			module: '/modules/message',
			childrens: [{
				name: '子消息1',
				id: '700000000-1',
				url: '/message'
			}]
		}]
	};
	module.exports = FINAL_MENU_DATA_JSON;
});