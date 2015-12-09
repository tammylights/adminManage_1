/**
 * 
 * @authors tammy (http://tammylights.com)
 * @date    2015-12-09 19:11:19
 * @version 1.0
 */
define(function(require, exports, module) {
	function MyAlert() {
		var _this = this;
		var settings = {
				title: '系统消息', //默认标题/
				shadowBg: '#000', //遮罩的背景色
				fadeIn: false, //默认不启用淡入淡出
				fadeInTimes: 300, //默认淡入淡出的时间，只有fadeIn为true时才有效
				okValue: '确定', //确定按钮文字
				cancelValue: '取消', //取消按钮文字
				opacity: 0.6, //遮罩层透明度
				type: 1, //图标类型
				area: [], //自定义宽高
				cancleButton: false, //取消按钮默认隐藏
				content: '', //自定义弹窗html
				callback: '' //自定义弹窗的回调函数
			},
			defaults = {
				containerID: 'tammy_myAlert', //最外层容器ID
				shadowID: 'tammy_myAlert_Shadow', //默认遮罩层ID
				myAlert: null,
				myShadow: null
			};
		var myAlert = {
			init: function() {
				var shadowStr = myAlert.createShadow();
				var myShadow = $('#' + defaults.shadowID);
				if (myShadow.length) {
					myShadow.remove();
				} else {
					$('body').append(shadowStr);
				}
				var myAlertStr = myAlert.createPopup();
				var myAlertObj = $('#' + defaults.containerID);
				if (myAlertObj.length) {
					myAlertObj.remove();
				} else {
					$('body').append(myAlertStr);
				}
				var tempObj = $('#' + defaults.containerID);
				var position = myAlert.calcPosition(tempObj);
				tempObj.css({
					left: position.left,
					top: position.top,
					width: position.objWidth,
					height: position.objHeight
				}).show();
				myAlert.registerEvent();
			},
			createShadow: function() {
				var str = '<div id="tammy_myAlert_Shadow"></div>';
				return str;
			},
			createPopup: function() {
				var str = '';
				str += '<div id="' + defaults.containerID + '" style="display:none;">'; //外层容器
				str += '<div class="myAlert_title">'; //标题容器-开始
				str += '<span>' + settings.title + '</span>'; //标题内容
				str += '<a class="myAlert_close">';
				str += '<i class="icons icon_close_black"></i>'; //关闭图标
				str += '</a></div>'; //标题结束
				str += '<div class="myAlert_content">' + settings.content + '</div>'; //弹窗内容
				if (settings.cancleButton) {
					str += '<div class="myAlert_button">'; //按钮功能区
					str += '<input type="button" class="button button_orange myAlert_save" value="' + settings.okValue + '"/>';
					str += '<a class="myAlert_cancel" href="javascript:void(0);">' + settings.cancelValue + '</a>';
					str += '</div>';
				}
				str += '</div>';
				return str;
			},
			calcPosition: function(targetObj) {
				var winWidth = $(window).width(),
					winHeight = $(window).height(),
					mWidth = targetObj ? targetObj.width() : $(window).width(),
					mHeight = targetObj ? targetObj.height() : $(window).height(),
					win7Width = winWidth * 0.7,
					win7Height = winHeight * 0.7,
					wRatio = win7Width / mWidth,
					hRatio = win7Height / mHeight,
					calcWidth = mWidth,
					calcHeight = mHeight,
					left, top, Ratio;
				Ratio = wRatio <= hRatio ? wRatio : hRatio;
				if (mWidth > win7Width || mHeight > win7Height) {
					calcWidth = mWidth * Ratio;
					calcHeight = mHeight * Ratio;
				}
				left = (winWidth - calcWidth) / 2;
				top = (winHeight - calcHeight) / 2;

				return {
					winWidth: winWidth,
					winHeight: winHeight,
					ratio: Ratio,
					left: left,
					top: top,
					objWidth: calcWidth,
					objHeight: calcHeight
				};
			},
			registerEvent: function() {
				var myAlertObj = $('#' + defaults.containerID);
				var myShadow = $('#' + defaults.shadowID);
				myAlertObj.on('click', '.myAlert_close,.myAlert_cancel', function() {
					myAlertObj.remove();
					myShadow.remove();
				});

				myAlertObj.on('click', '.myAlert_save', function() {
					if (settings.callback()) {
						myAlertObj.remove();
						myShadow.remove();
					}
				});
			},
			returnFunc: {
				alert: function(options) {
					settings = $.extend(settings, options || {});
					myAlert.init();
				},
				confirm: function(options) {
					settings = $.extend(settings, options || {});
					myAlert.init();
				},
				show: function() {},
				close: function() {
					$('#' + defaults.containerID).find('.myAlert_close').trigger('click');
				}
			}
		};

		return myAlert.returnFunc;
	}

	module.exports = MyAlert;
});