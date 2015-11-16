/**
 * init registerEvent
 * @authors tammy (http://tammylights.com)
 * @date    2015-11-16 15:55:45
 * @version 1.0
 */
define(function(require, exports, module) {
	function RegisterJQueryEvent() {
		this.init = function() {
			this.registerEvent();
		};
		this.registerEvent = function() {
			/*菜单点击事件*/
			$('#leftMenu-box').on('click', 'li>a,li>ul>li>a', function(e) {
				var m = $(this);
				if (m.siblings('ul').length > 0) {
					/**
					 * 第一层点击处理
					 */
					var subMenu = m.siblings('ul');
					var isActive = m.parent().hasClass('active');
					m.parent().siblings().removeClass('active').children('ul').slideUp('normal');
					if (isActive) {
						m.parent().removeClass('active');
						subMenu.slideUp('normal');
					} else {
						m.parent().addClass('active');
						subMenu.slideDown('normal');
					}
				} else {
					/**
					 * 第二层点击处理
					 */
					m.parents('.sidebar-menu').find('li ul li').removeClass('active');
					m.parent().addClass('active');
					var currentUrl = m.data('url');
					var moduleFlag = m.parents('ul').siblings('a').data('url');
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
					$('#content-container').empty();
					return false;
				}
				ky.utils.showHTML(moduleInfo.module);
			});

			/*只能输入数字，并且小数点只能输入一个*/
			$('#content-container').on('keyup change', '.OnlyPrice', function() {
				this.value = this.value.replace(/[^\d.]/, ''); /*禁止输入非数字和小数点以外字符*/
				this.value = this.value.replace(/^\./, ''); /*禁止开头为‘.’*/
				this.value = this.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", "."); /*不允许两个及以上小数点*/
				this.value = this.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数
			});

			/*高级查询切换*/
			$('#content-container').on('click', '.advanced_query_btn,.common_query_btn', function() {
				var m = $(this);
				if (m.parents('table').hasClass('common_query')) {
					$('.common_query').hide();
					$('.advanced_query').slideDown();
				} else {
					$('.advanced_query').hide();
					$('.common_query').show();
				}
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
	module.exports = RegisterJQueryEvent;
});