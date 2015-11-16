/**
 * order_list
 * @authors tammy (http://tammylights.com)
 * @date    2015-11-16 16:21:28
 * @version 1.0
 */
define(function(require, exports, module) {
	"use strict";

	function OrderList() {
		var _this = this;

		this.init = function() {
			this.all(1);
			this.registerEvent();
		};
		this.all = function(pageNo) {
			var page = new ky.ui.page({
				url: 'http://ltammy.com/src/script/test.txt',
				data: {
					
				},
				page_container: $('#page-box'),
				data_container: $('#order_list_container'),
				callBack: function(data) {
					var str = ky.utils.template('order_list_template', data);
					$('#order_list_container').html(str);
				}
			});
			page.init();
		};
		this.registerEvent = function() {};
	}
	module.exports = OrderList;
});