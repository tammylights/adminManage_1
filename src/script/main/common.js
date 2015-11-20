/**
 * common.js
 * @authors tammy (http://tammylights.com)
 * @date    2015-11-10 11:19:31
 * @version 1.0
 */
define(function(require, exports, module) {
	"use strict";
	var tammy = tammy || {};
	tammy.utils = tammy.utils || {};
	tammy.ui = tammy.ui || {};

	var FINAL_OPTIONS = {
		pageSize: 10,
		page401: '/login.html'
	};

	(function() {
		function isType(type) {
			return function(obj) {
				return {}.toString.call(obj) == "[object " + type + "]";
			};
		}

		function objIsNull(obj) {
			for (var i in obj) {
				return false;
			}
			return true;
		}
		tammy.utils.isObject = isType("Object");
		tammy.utils.isString = isType("String");
		tammy.utils.isArray = Array.isArray || isType("Array");
		tammy.utils.isFunction = isType("Function");
		tammy.utils.isNumber = isType("Number");
		tammy.utils.objIsNull = objIsNull;
	})();

	function log(msg) {
		if (window.console) {
			window.console.log(msg);
		}
	}

	(function() {
		var cookie = {};
		cookie.set = function(key, value, expires) {
			var date = new Date(),
				s = '',
				day = /^[1-9]([0-9]+)?d$/.test(expires),
				hour = /^[1-9]([0-9]+)?h$/.test(expires),
				minute = /^[1-9]([0-9]+)?m$/.test(expires),
				second = /^[1-9]([0-9]+)?s$/.test(expires);
			if (!expires || !(day || hour || second || minute)) {
				if (expires < 0) {
					date.setDate(date.getDate() + expires);
					expires = "; expires=" + date.toGMTString();
				} else {
					expires = '';
				}
			} else {
				expires = parseInt(expires.substr(0, expires.length - 1), 10);
				if (day) {
					date.setDate(date.getDate() + expires);
				} else if (hour) {
					date.setHours(date.getHours() + expires);
				} else if (minute) {
					date.setMinutes(date.getMinutes() + expires);
				} else if (second) {
					date.setSeconds(date.getSeconds() + expires);
				}
				expires = "; expires=" + date.toGMTString();
			}
			return (document.cookie = key + "=" + (!value ? "" : value.toString()) + expires + "; path=/", "; domain=." + document.domain + s);
		};
		cookie.get = function(key) {
			var value;
			return (value = new RegExp("(?:^|; )" + key + "=([^;]*)").exec(document.cookie)) ? value[1] : null;
		};
		cookie.deleteCookie = function(key) {
			if (!key) {
				return false;
			}
			var val = cookie.get(key);
			if (val !== null) cookie.set(key, val, -1);
		};
		tammy.utils.cookie = cookie;
	})();

	(function() {
		function imgLoad(obj) {
			var winWidth = $(window).width(),
				winHeight = $(window).height(),
				left, top, objWidth, objHeight;
			var wRatio = (winWidth * 0.7) / obj.width;
			var hRatio = (winHeight * 0.7) / obj.height;
			if (obj.height > winHeight * 0.7 || obj.width > winWidth * 0.7) {
				var Ratio = wRatio <= hRatio ? wRatio : hRatio;
				objWidth = obj.width * Ratio;
				objHeight = obj.height * Ratio;
				obj.setAttribute('width', objWidth);
				obj.setAttribute('height', objHeight);
			} else {
				objWidth = obj.width;
				objHeight = obj.height;
			}

			left = (winWidth - objWidth) / 2;
			top = (winHeight - objHeight - 50) / 2;
			return {
				left: left,
				top: top,
				width: objWidth,
				height: objHeight
			};
		}
		tammy.utils.imgLoad = imgLoad;
	})();

	/**
	 * 字符串操作
	 */
	(function() {
		function _String() {}
		/**
		 * 去掉两边空格
		 * @param s
		 * @return Boolean
		 */
		_String.trim = function(s) {
			return s.replace(/(^\s*)|(\s*$)/g, '');
		};
		/**
		 * 去掉中间空格
		 * @param s
		 * @return Boolean
		 */
		_String.trimmoddle = function(s) {
			return s.replace(/\s/g, "");
		};
		/**
		 * 去掉左边空格
		 * @param s
		 * @return Boolean
		 */
		_String.trimLeft = function(s) {
			return s.replace(/^\s*/, "");
		};
		/**
		 * 去掉右边空格
		 * @param s
		 * @return Boolean
		 */
		_String.trimRight = function(s) {
			return s.replace(/\s*$/, "");
		};
		/**
		 * 格式化金额
		 * @param string, separator
		 * @return string
		 */
		_String.formateMoney = function(string, separator) {
			if (!separator) separator = ',';
			if (typeof string === 'number') {
				string += '';
			}
			return string.replace(/\b\d+\b/, function(str) {
				var len = str.length,
					miu = Math.floor((len % 3 === 0 ? (len - 1) : len) / 3);
				if (len < 4) {
					return str;
				}
				str = str.split('');
				for (var i = 1, j = 0; i <= miu; i++, j++) {
					str.splice(len - i * 3 - j, 0, separator);
					len++;
				}
				return str.join('');
			});
		};
		/**
		 * 反格式化金额
		 * @param string, separator
		 * @return string
		 */
		_String.unformateMoney = function(string, separator) {
			if (!separator) separator = ',';
			return string.split(separator).join('');
		};
		/**
		 * 忽略大小写检测字符串是不是相等
		 * @param s1
		 * @param s2
		 * @return Boolean
		 */
		_String.equalsIgnoreCase = function(s1, s2) {
			return s1.toUpperCase() == s2.toUpperCase();
		};
		/**
		 * 检测是否全为中文
		 * @param s
		 * @return Boolean
		 */
		_String.isChinese = function(s) {
			return /^[\u4E00-\uFA29]*$/.test(s) && (!/^[\uE7C7-\uE7F3]*$/.test(s.replace(/(^\s*)|(\s*$)/g, '')));
		};
		/**
		 * 检测是否为Email
		 * @param s
		 * @return Boolean
		 */
		_String.isEmail = function(s) {
			return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/i.exec(s) !== null;
		};
		/**
		 * 是否为邮编
		 * @param s
		 * @return Boolean
		 */
		_String.isPost = function(s) {
			return /^\d{6}$/.test(s);
		};
		/**
		 * 检测扩展名是否为图片
		 * @param s
		 * @return Boolean
		 */
		_String.isImg = function(s) {
			return new RegExp("[.]+(jpg|jpeg|png|bmp|gif)$", "gi").test(s);
		};
		/**
		 * 是否为手机号
		 * @param mobile
		 * @return Boolean
		 */
		_String.isMobile = function(mobile) {
			return /^1(3\d|4(7)|5(0|1|2|3|5|6|7|8|9)|7(0|6|7|8)|8\d)\d{8}$/.test(mobile);
		};
		/**
		 * 数字是否大于0
		 * @param number
		 * @return Boolean
		 */
		_String.isgtzero = function(num) {
			return /^(([1-9]\d*(.\d{1,2})?)|(0.[1-9]\d?)|(0.0[1-9]))$/.test(num);
		};
		/**
		 * 数字是否正整数
		 * @param number
		 * @return Boolean
		 */
		_String.isPositiveInteger = function(num) {
			return /^[1-9]\d*$/.test(num);
		};
		/**
		 * 数字是否为身份证号
		 * @param number
		 * @return Boolean
		 */
		_String.isIdCard = function(num) {
			return /^[1-9]((\d{14})|(\d{16}(\d|X|x)))$/.test(num);
		};
		/**
		 * 判断字符串不含特殊字符
		 * @param string
		 * @return Boolean
		 */
		_String.hasNoSpecial = function(str) {
			return /^[a-zA-Z0-9\u4E00-\u9FA5]+$/.test(str);
		};
		/**
		 * 时间格式转时间戳
		 * @param time,seperator
		 * @return number
		 */
		_String.timeFormate2Number = function(time, seperator) {
			var str, arr, newTime;
			if (!seperator) seperator = '-';
			str = time.replace(/:/g, seperator);
			str = str.replace(/ /g, seperator);
			arr = str.split(seperator);
			newTime = new Date(Date.UTC(arr[0], arr[1] - 1, arr[2], arr[3] - 8, arr[4], arr[5]));
			return newTime.getTime();
		};
		/**
		 * 时间戳转时间格式
		 * @param time,seperator
		 * @return string
		 */
		_String.timeNumber2Formate = function(time, seperator) {
			var str, first, second, arr;
			if (!seperator) seperator = '-';
			if (typeof time === 'string') {
				time = parseInt(time, 10);
			}
			str = new Date(time);
			first = str.toLocaleDateString().replace(/\//g, seperator);
			second = str.toLocaleTimeString();
			if (second.indexOf('上午') >= 0) {
				arr = second.replace('上午', '').split(':');
				if (parseInt(arr[0], 10) < 10) {
					arr[0] = '0' + arr[0];
				}
				second = arr.join(':');
			}
			if (second.indexOf('下午') >= 0) {
				arr = second.replace('下午', '').split(':');
				arr[0] = parseInt(arr[0], 10) + 12;
				arr[0] += '';
				second = arr.join(':');
			}
			return first + ' ' + second;
		};

		/**
		 * 隐藏手机号中间四位
		 * @param string
		 * @return string
		 */
		_String.dealMobile = function(str) {
			if (typeof str === 'number') {
				str += '';
			}
			return str.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
		};

		/**
		 * 隐藏身份证号中间几位
		 * @param string
		 * @return string
		 */
		_String.dealIDCard = function(str) {
			if (typeof str === 'number') {
				str += '';
			}
			var s;
			s = str.length === 18 ? str.replace(/(\d{3})\d{12}([\d{3}]|[\d{2}]X)/, '$1************$2') : str.replace(/(\d{3})\d{9}(\d{3})/, '$1*********$2');
			return s;
		};

		/**
		 * 判断数字的奇偶性
		 * @param number
		 * @return boolean
		 * 奇数返回true，偶数返回false，非数字报错
		 */

		_String.isOdd = function(number) {
			if (typeof number !== 'number') {
				throw new Error('parameter must be number type');
			} else {
				return number % 2 === 1;
			}
		};
		tammy.utils.string = tammy.utils.string || _String;
	})();

	/**
	 * ajax
	 */
	(function() {
		var ajax = {};
		ajax.settings = {
			url: '',
			type: 'GET',
			dataType: 'json',
			data: {},
			async: true,
			success: function() {},
			error: function() {},
			complete: function() {},
			ajaxSetHeader: function() {}
		};
		ajax.init = function() {
			var s = ajax.settings;
			s.type = 'GET';
			s.dataType = 'json';
			s.data = {};
			s.async = true;
		};
		ajax.send = function(opt) {
			var settings, options = opt || {},
				contentType, data;
			$.extend(ajax.settings, options);
			settings = ajax.settings;
			/*发送服务器编码*/
			if (typeof settings.data !== 'string' && !tammy.utils.objIsNull(settings.data)) {
				contentType = 'application/x-www-form-urlencoded; charset=UTF-8';
				if (settings.type.toUpperCase() === 'GET') {
					data = settings.data;
				} else {
					data = settings.data;
				}
			} else {
				contentType = 'application/x-www-form-urlencoded; charset=UTF-8';
				data = settings.data;
			}
			$.ajax({
				url: settings.url,
				type: settings.type,
				dataType: settings.dataType,
				contentType: contentType,
				data: data,
				cache: false,
				async: settings.async,
				beforeSend: function(xhr) {
					settings.ajaxSetHeader.call(null, xhr);
				},
				success: function(responseText, statusText, xhr) {
					if (responseText && responseText.errcode === 402002) {
						//错误时提示信息
						return false;
					} else if (responseText && responseText.errcode === 418000) {
						//错误时提示信息
						return false;
					}
					settings.success.call(null, responseText, statusText, xhr);
				},
				complete: function(response, text) {
					settings.complete.call(null, response, text);
				},
				error: function(response, status, errorThrown) {
					settings.error.call(null, response);
				}
			});
		};
		tammy.utils.ajax = ajax;
	})();

	$.ajaxSetup({
		cache: false,
		beforeSend:function(){
			(new tammy.ui.shadow()).init();
		},
		complete:function(){
			(new tammy.ui.shadow()).close();
		}
	});

	/**
	 * 修改菜单区域高度
	 */
	(function() {
		var updateMenuBoxHeight = function() {
			var winHeight = $(window).height();
			var docHeight = $(document).height();
			var menuEle = $('.left-side');
			var final_height = winHeight >= docHeight ? winHeight : docHeight;
			menuEle.height(final_height - 50);
		};
		tammy.utils.updateMenuBoxHeight = updateMenuBoxHeight;
	})();

	/**
	 * 请求页面
	 */
	(function() {
		var showHTML = function(targetURL) {
			$('#content-container').load(targetURL, function(response, status, xhr) {
				if (xhr.status === 404) {
					log('没有该页面');
				} else {
					tammy.utils.updateMenuBoxHeight();
					var breadCrumb = $('.breadCrumb');
					if(!breadCrumb.is(':visible')){
						breadCrumb.show();
					}
					var chooseItem = $('#leftMenu-box').children('li.active');
					var moduleEle = chooseItem.children('a');
					$('#moduleTitle').text(moduleEle.children('span').text());
					var subHtmlName = chooseItem.find('.active');
					breadCrumb.children('.active').text(subHtmlName.find('span').eq(1).text());
				}
			});
		};
		tammy.utils.showHTML = showHTML;
	})();

	/**
	 * 加载页面
	 */
	(function() {
		var kyload = function(targetURL, data) {

			var dataStr = '';
			for (var temp in data) {
				var item = data[temp];
				dataStr += ',' + temp + '=' + item;
			}
			dataStr = dataStr.substring(1);
			window.location.href = tammy.utils.BASICURL + '#routeModule=' + targetURL + '#routeData=' + dataStr;
		};
		tammy.utils.load = kyload;
	})();

	/**
	 * 获取URL中模块信息及参数
	 */
	(function(win) {
		var getURLValue = function() {
			var hrefs = win.href;
			var hashs = win.hash;
			var returnData = {
				module: '',
				args: {}
			};
			hashs = hashs.replace(/#/ig, '');
			var datas = hashs.substring(hashs.indexOf('routeData=') + 10);
			var moduleStr = hashs.substring(hashs.indexOf('routeModule=') + 12, hashs.indexOf('routeData='));
			returnData.module = moduleStr.indexOf('.html') === -1 ? moduleStr + '.html' : moduleStr;

			var dataArr = datas.split(',');
			for (var i = 0; i < dataArr.length; ++i) {
				var temp = dataArr[i].split('=');
				var name = temp[0],
					val = temp[1];
				returnData.args[name] = val;
			}
			return returnData;
		};
		tammy.utils.getURLValue = getURLValue;
	})(window.location);

	/**
	 * 获取当前文档地址
	 */
	(function() {
		var dispathHost = function() {
			var baseUrl = window.location;
			var protocol = baseUrl.protocol; //协议
			var host = baseUrl.host; //域名端口
			var pathName = baseUrl.pathname; //当前页面的路径和文件名
			var finalUrl = protocol + '//' + host + pathName; //完整目录
			return finalUrl;
		};
		tammy.utils.BASICURL = dispathHost();
	})();

	/**
	 * 加载默认页面
	 *感觉可以再模板处直接判断。之后测试一下
	 */
	(function() {
		var defaultContent = function(targetURL, fn) {
			var currURL = window.location;
			if (currURL.hash) {
				var args = targetURL ? targetURL : (tammy.utils.getURLValue()).module;
				var allMenu = $('#leftMenu-box').children('li');
				for (var i = 0, len = allMenu.length; i < len; ++i) {
					var item = allMenu.eq(i);
					var itemModule = item.children('a').data('url');
					var subMenu = item.find('li a');
					for (var j = 0, jLen = subMenu.length; j < jLen; ++j) {
						var subItem = subMenu.eq(j);
						var subMenuName = subItem.data('url');
						var resultUrl = itemModule + subMenuName;
						if (args === resultUrl + '.html') {
							if (typeof fn === 'function') {
								fn(item, subItem);
							} else {
								allMenu.removeClass('active').find('li').removeClass('active');
								subItem.parent().addClass('active').parent().removeClass('hide').parent().addClass('active');
							}
						}
					}
				}
			}
		};
		tammy.utils.defaultPage = defaultContent;
	})();

	(function() {
		function Shadow(option) {
			var m = this;
			m.option = {};
			$.extend(m.option, option);
		}
		Shadow.prototype.addShadow = function() {
			var m = this;
			if ($('#kyPoupshadow').length > 0) {
				$('#kyPoupshadow').remove();
			}
			var shadowstr = '<div id="kyPoupshadow" class="loading"><div class="loading-img"><div/></div>';
			$('body').append(shadowstr).end().find("#kyPoupshadow").css("height", $(document).height());
		};
		Shadow.prototype.close = function() {
			$('#kyPoupshadow').fadeOut(600);
		};
		Shadow.prototype.init = function() {
			var m = this;
			m.addShadow();
		};
		tammy.ui.shadow = Shadow;
	})();

	(function() {
		function Page(options) {
			var m = this;
			m.settings = {
				url: '',
				type: 'GET',
				show_page_number: 5,
				jumpToPage: false,
				loading: false,
				loading_url: '',
				noData: '',
				data: {},
				loading_container: $('.loading_container'),
				data_container: $('.data_container'),
				page_container: $('.page_container'),
				autoScroll: false,
				scrollObj: $('html, body'),
				scrollDestObj: $('.scrollDestObj'),
				speed: 500,
				firstText: '首页',
				preText: '上一页',
				nextText: '下一页',
				lastText: '尾页',
				scroll: function(obj) {
					obj.animate({
						scrollTop: m.settings.scrollDestObj.offset().top
					}, m.settings.speed);
				},
				callBack: function() {},
				btnClickCallBack: function() {},
				pageSetHeader: function() {},
				beforRender: function() {}
			};
			$.extend(m.settings, options);
		}
		Page.prototype.init = function(o) {
			var m = this;
			o && typeof o === 'object' && $.extend(m.settings, o);
			m.render(1);
			m.regEvent();
		};
		Page.prototype.loading = function() {
			var m = this,
				s = m.settings;
			if (!s.loading) {
				return false;
			}
			s.loading_container.css('position', 'relative').append('<div id="loading"><span style="background: url(' + s.loading_url + ') no-repeat"></span></div>');
			$('#loading').css({
				'height': s.loading_container.height(),
				'width': s.loading_container.width(),
				'opacity': 0.2,
				'filter': 'Alpha(opacity=50)',
				'background': '#000',
				'position': 'absolute',
				'top': 0,
				'left': 0
			}).children('span').css({
				'width': 32,
				'height': 32,
				'position': 'absolute',
				'top': '50%',
				'left': '50%',
				'margin': '-16px 0 0 -16px'
			});
		};
		Page.prototype.create = function(num) {
			var m = this,
				arr = [],
				len, s = m.settings,
				ky_page = s.page_container.find('.ky_page');
			typeof num === 'number' ? num = num : (parseInt(num, 10) ? num = parseInt(num, 10) : num = 1);
			m.makepage(num);
		};
		Page.prototype.makepage = function(num) {
			var m = this,
				arr = [],
				s = m.settings,
				half;
			if (m.page_total <= s.show_page_number + 2) {
				for (var i = 1; i <= m.page_total; i++) {
					i !== num ? arr.push('<a href="#page-' + i + '">' + i + '</a>') : arr.push('<span class="ky_current_page">' + i + '</span>');
				}
			} else {
				half = tammy.utils.string.isOdd(s.show_page_number) ? Math.ceil(s.show_page_number / 2) : s.show_page_number / 2;
				if (num <= half) {
					for (var i = 1; i <= s.show_page_number; i++) {
						i !== num ? arr.push('<a href="#page-' + i + '">' + i + '</a>') : arr.push('<span class="ky_current_page">' + i + '</span>');
					}
					arr.push('<span class="ellipsis">...</span><a href="#page-' + m.page_last_second + '">' + m.page_last_second + '</a><a href="#page-' + m.page_total + '">' + m.page_total + '</a>');
				} else {
					var j = Math.floor(s.show_page_number / 2);
					if (num >= 3 + half) {
						arr.push('<a href="#page-1">1</a><a href="#page-2">2</a><span class="ellipsis">...</span>');
						var start = m.page_total - s.show_page_number - 3;
						if (num > start) {
							if (start < 4) {
								start = 4;
							}
							for (var i = start; i <= m.page_total; i++) {
								i !== num ? arr.push('<a href="#page-' + i + '">' + i + '</a>') : arr.push('<span class="ky_current_page">' + i + '</span>');
							}
						} else {
							half = tammy.utils.string.isOdd(s.show_page_number) ? j : (j - 1);
							for (var i = num - half; i <= num + j; i++) {
								i !== num ? arr.push('<a href="#page-' + i + '">' + i + '</a>') : arr.push('<span class="ky_current_page">' + i + '</span>')
							}
							arr.push('<span class="ellipsis">...</span><a href="#page-' + m.page_last_second + '">' + m.page_last_second + '</a><a href="#page-' + m.page_total + '">' + m.page_total + '</a>');
						}
					} else {
						var i, tmp = num + j;
						for (i = 1; i <= tmp; i++) {
							if (i >= m.page_last_second) continue;
							i !== num ? arr.push('<a href="#page-' + i + '">' + i + '</a>') : arr.push('<span class="ky_current_page">' + i + '</span>')
						}
						if (m.page_total - tmp > 2) {
							arr.push('<span class="ellipsis">...</span>');
						}
						arr.push('<a href="#page-' + m.page_last_second + '">' + m.page_last_second + '</a><a href="#page-' + m.page_total + '">' + m.page_total + '</a>');
					}
				}
			}
			s.page_container.find('.ky_page').html(arr.join(''));
			if (s.jumpToPage) s.page_container.find('.ky_jump_text').val(num);
		};
		Page.prototype.makeHtml = function() {
			var m = this,
				s = m.settings,
				arr = '<div class="ky_pages mr30"><div class="ky_page_pre"><span class="ky_page_four ky_first_page"><i class="previous"></i>' + s.firstText + '</span><span class="ky_page_four ky_pre_page"><i class="previous"></i>' + s.preText + '</span></div><div class="ky_page"></div><div class="ky_page_next"><a class="ky_page_four ky_next_page" href="#page-' + m.page_total + '"><i class="next"></i>' + s.nextText + '</a><a class="ky_page_four ky_last_page" href="#page-' + m.page_total + '"><i class="next"></i>' + s.lastText + '</a></div></div>';
			if (s.jumpToPage) {
				arr += '<div class="ky_jump_to"><form><span>跳转到</span><input type="text" value="1" class="ky_jump_text" /><span>页</span><input type="submit" value="确定" class="ky_jump_button" /></form></div>';
			}
			return arr;
		};
		Page.prototype.render = function(pageNum) {
			var m = this,
				s = m.settings;
			m.loading();
			if (!s.url) {
				if (!s.pagesCount) {
					s.page_container.html('');
				} else {
					m.page_total = s.pagesCount;
					m.page_last_second = m.page_total - 1;
					if (m.page_total > 1) {
						s.page_container.children('.ky_pages').length === 0 && s.page_container.html(m.makeHtml());
						m.create(pageNum);
						if (pageNum === 1) {
							s.page_container.find('.ky_page_pre').html('<span class="ky_page_four ky_first_page"><i class="previous"></i>' + s.firstText + '</span><span class="ky_page_four ky_pre_page"><i class="previous"></i>' + s.preText + '</span>');
							s.page_container.find('.ky_page_next').html('<a class="ky_page_four ky_next_page" href="#page-' + m.page_total + '"><i class="next"></i>' + s.nextText + '</a><a class="ky_page_four ky_last_page" href="#page-' + m.page_total + '"><i class="next"></i>' + s.lastText + '</a>');
						} else if (pageNum === m.page_total) {
							s.page_container.find('.ky_page_pre').html('<a href="#page-1" class="ky_page_four ky_first_page"><i class="previous"></i>' + s.firstText + '</a><a class="ky_page_four ky_pre_page" href="#page-1"><i class="previous"></i>' + s.preText + '</a>');
							s.page_container.find('.ky_page_next').html('<span class="ky_page_four ky_next_page"><i class="previous"></i>' + s.nextText + '</span><span class="ky_page_four ky_last_page"><i class="previous"></i>' + s.lastText + '</span>');
						} else {
							s.page_container.find('.ky_page_pre').html('<a href="#page-1" class="ky_page_four ky_first_page"><i class="previous"></i>' + s.firstText + '</a><a class="ky_page_four ky_pre_page" href="#page-1"><i class="previous"></i>' + s.preText + '</a>');
							s.page_container.find('.ky_page_next').html('<a class="ky_page_four ky_next_page" href="#page-' + m.page_total + '"><i class="next"></i>' + s.nextText + '</a><a class="ky_page_four ky_last_page" href="#page-' + m.page_total + '"><i class="next"></i>' + s.lastText + '</a>');
						}
						s.callBack(pageNum);
					} else {
						s.page_container.empty();
					}
				}
				$('#loading').remove();
				s.autoScroll && s.scroll(s.scrollObj);
			} else {
				s.data.pageNo = pageNum;
				tammy.utils.ajax.send({
					url: s.url,
					type: s.type,
					data: s.data,
					success: function(returnData) {
						returnData = {
							"errcode": 0,
							"errstr": "",
							"data": {
								"total": "193",
								"waybillAllInfo": [{
									"id": "199",
									"orderSN": "W151116149DA",
									"payerId": 20,
									"receiverId": 247,
									"payerPhone": "16811114002",
									"receiverPhone": "16869681673",
									"sourceType": null,
									"sourceId": null,
									"deleterType": null,
									"amount": "1.23",
									"deliveryPlace": "\u5b89\u5fbd-\u868c\u57e0",
									"deliveryPid": 3,
									"deliveryCid": 37,
									"receiptPlace": "\u5317\u4eac-\u5317\u4eac",
									"receiptPid": 2,
									"receiptCid": 52,
									"goodsInfo": "\u5efa\u6750",
									"goodsCount": 22,
									"goodsUnit": "\u5428",
									"transactionDesc": null,
									"status": "0",
									"createdTime": "2015-11-16 14:19:42",
									"updatedTime": "2015-11-16 14:19:42",
									"receiverName": "\u9ec4\u74dc\u4e09",
									"payerName": "\u5409\u62c9\u5fb7\u7ecf",
									"terminalType": 1,
									"mDataObjectExistingStatus": 3,
									"mFactory": null
								}, {
									"id": "198",
									"orderSN": "W15111614U6H",
									"payerId": 246,
									"receiverId": 20,
									"payerPhone": "16800000000",
									"receiverPhone": "16811114002",
									"sourceType": null,
									"sourceId": null,
									"deleterType": null,
									"amount": "22.00",
									"deliveryPlace": "\u798f\u5efa-\u5357\u5e73",
									"deliveryPid": 4,
									"deliveryCid": 55,
									"receiptPlace": "\u798f\u5efa-\u5b81\u5fb7",
									"receiptPid": 4,
									"receiptCid": 56,
									"goodsInfo": "\u852c\u83dc",
									"goodsCount": 11,
									"goodsUnit": "\u5428",
									"transactionDesc": null,
									"status": "1",
									"createdTime": "2015-11-16 14:01:57",
									"updatedTime": "2015-11-16 14:01:57",
									"receiverName": "\u5409\u62c9\u5fb7\u7ecf",
									"payerName": "\u5f20\u4ef2\u793c",
									"terminalType": 1,
									"mDataObjectExistingStatus": 3,
									"mFactory": null
								}, {
									"id": "197",
									"orderSN": "W15111613HOB",
									"payerId": 246,
									"receiverId": 20,
									"payerPhone": "16800000000",
									"receiverPhone": "16811114002",
									"sourceType": null,
									"sourceId": null,
									"deleterType": null,
									"amount": "1.00",
									"deliveryPlace": "\u6fb3\u95e8-\u6fb3\u95e8",
									"deliveryPid": 34,
									"deliveryCid": 396,
									"receiptPlace": "\u5317\u4eac-\u5317\u4eac",
									"receiptPid": 2,
									"receiptCid": 52,
									"goodsInfo": "\u98df\u54c1",
									"goodsCount": 322,
									"goodsUnit": "\u5428",
									"transactionDesc": null,
									"status": "1",
									"createdTime": "2015-11-16 13:55:52",
									"updatedTime": "2015-11-16 13:55:52",
									"receiverName": "\u5409\u62c9\u5fb7\u7ecf",
									"payerName": "\u5f20\u4ef2\u793c",
									"terminalType": 1,
									"mDataObjectExistingStatus": 3,
									"mFactory": null
								}, {
									"id": "196",
									"orderSN": "W15111611BO1",
									"payerId": 20,
									"receiverId": 245,
									"payerPhone": "16811114002",
									"receiverPhone": "16822220005",
									"sourceType": null,
									"sourceId": null,
									"deleterType": null,
									"amount": "1.00",
									"deliveryPlace": "\u6fb3\u95e8-\u6fb3\u95e8",
									"deliveryPid": 34,
									"deliveryCid": 396,
									"receiptPlace": "\u5317\u4eac-\u5317\u4eac",
									"receiptPid": 2,
									"receiptCid": 52,
									"goodsInfo": "\u77ff\u4ea7",
									"goodsCount": 1,
									"goodsUnit": "\u5428",
									"transactionDesc": "\u533a",
									"status": "1",
									"createdTime": "2015-11-16 11:47:38",
									"updatedTime": "2015-11-16 11:47:38",
									"receiverName": "\u5927\u7c73\u4f01\u4e1a\u4e00",
									"payerName": "\u5409\u62c9\u5fb7\u7ecf",
									"terminalType": 1,
									"mDataObjectExistingStatus": 3,
									"mFactory": null
								}, {
									"id": "194",
									"orderSN": "W15111311J5S",
									"payerId": 47,
									"receiverId": 20,
									"payerPhone": "16811114009",
									"receiverPhone": "16811114002",
									"sourceType": null,
									"sourceId": null,
									"deleterType": null,
									"amount": "11.00",
									"deliveryPlace": "\u5b89\u5fbd-\u868c\u57e0",
									"deliveryPid": 3,
									"deliveryCid": 37,
									"receiptPlace": "\u6fb3\u95e8-\u6fb3\u95e8",
									"receiptPid": 34,
									"receiptCid": 396,
									"goodsInfo": "\u77ff\u4ea7",
									"goodsCount": 1,
									"goodsUnit": "\u5428",
									"transactionDesc": null,
									"status": "3",
									"createdTime": "2015-11-13 11:32:03",
									"updatedTime": "2015-11-14 11:33:02",
									"receiverName": "\u5409\u62c9\u5fb7\u7ecf",
									"payerName": "\u54c8\u54c8\u54c8\u4f01\u4e1a",
									"terminalType": 1,
									"mDataObjectExistingStatus": 3,
									"mFactory": null
								}, {
									"id": "193",
									"orderSN": "W15111311QCX",
									"payerId": 47,
									"receiverId": 20,
									"payerPhone": "16811114009",
									"receiverPhone": "16811114002",
									"sourceType": null,
									"sourceId": null,
									"deleterType": null,
									"amount": "11142.00",
									"deliveryPlace": "\u5b89\u5fbd-\u5b89\u5e86",
									"deliveryPid": 3,
									"deliveryCid": 36,
									"receiptPlace": "\u6fb3\u95e8-\u6fb3\u95e8",
									"receiptPid": 34,
									"receiptCid": 396,
									"goodsInfo": "\u77ff\u4ea7",
									"goodsCount": 1,
									"goodsUnit": "\u7bb1",
									"transactionDesc": "11111111111111111111111111111111111111111111111111111111111111sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss\u597d\u597d\u53f7",
									"status": "3",
									"createdTime": "2015-11-13 11:26:10",
									"updatedTime": "2015-11-14 11:27:01",
									"receiverName": "\u5409\u62c9\u5fb7\u7ecf",
									"payerName": "\u54c8\u54c8\u54c8\u4f01\u4e1a",
									"terminalType": 1,
									"mDataObjectExistingStatus": 3,
									"mFactory": null
								}, {
									"id": "192",
									"orderSN": "W151113114HJ",
									"payerId": 47,
									"receiverId": 20,
									"payerPhone": "16811114009",
									"receiverPhone": "16811114002",
									"sourceType": null,
									"sourceId": null,
									"deleterType": null,
									"amount": "1111111.00",
									"deliveryPlace": "\u5b89\u5fbd-\u5b89\u5e86",
									"deliveryPid": 3,
									"deliveryCid": 36,
									"receiptPlace": "\u5317\u4eac-\u5317\u4eac",
									"receiptPid": 2,
									"receiptCid": 52,
									"goodsInfo": "\u65e5\u7528\u54c1",
									"goodsCount": 6.26,
									"goodsUnit": "\u5428",
									"transactionDesc": null,
									"status": "3",
									"createdTime": "2015-11-13 11:18:20",
									"updatedTime": "2015-11-14 11:19:01",
									"receiverName": "\u5409\u62c9\u5fb7\u7ecf",
									"payerName": "\u54c8\u54c8\u54c8\u4f01\u4e1a",
									"terminalType": 1,
									"mDataObjectExistingStatus": 3,
									"mFactory": null
								}, {
									"id": "195",
									"orderSN": "W15111317HEI",
									"payerId": 128,
									"receiverId": 20,
									"payerPhone": "16801010101",
									"receiverPhone": "16811114002",
									"sourceType": null,
									"sourceId": null,
									"deleterType": null,
									"amount": "44.00",
									"deliveryPlace": "\u6fb3\u95e8-\u6fb3\u95e8",
									"deliveryPid": 34,
									"deliveryCid": 396,
									"receiptPlace": "\u798f\u5efa-\u5357\u5e73",
									"receiptPid": 4,
									"receiptCid": 55,
									"goodsInfo": "\u5efa\u6750",
									"goodsCount": 2232,
									"goodsUnit": "\u5428",
									"transactionDesc": null,
									"status": "1",
									"createdTime": "2015-11-13 17:27:27",
									"updatedTime": "2015-11-13 17:27:27",
									"receiverName": "\u5409\u62c9\u5fb7\u7ecf",
									"payerName": "\u4e0a\u7ebf",
									"terminalType": 1,
									"mDataObjectExistingStatus": 3,
									"mFactory": null
								}, {
									"id": "188",
									"orderSN": "W15111215DOQ",
									"payerId": 20,
									"receiverId": 47,
									"payerPhone": "16811114002",
									"receiverPhone": "16811114009",
									"sourceType": null,
									"sourceId": null,
									"deleterType": null,
									"amount": "1.00",
									"deliveryPlace": "\u5b89\u5fbd-\u5b89\u5e86",
									"deliveryPid": 3,
									"deliveryCid": 36,
									"receiptPlace": "\u5b89\u5fbd-\u5b89\u5e86",
									"receiptPid": 3,
									"receiptCid": 36,
									"goodsInfo": "\u8bbe\u5907",
									"goodsCount": 1,
									"goodsUnit": "\u5428",
									"transactionDesc": null,
									"status": "3",
									"createdTime": "2015-11-12 15:54:07",
									"updatedTime": "2015-11-13 15:55:01",
									"receiverName": "\u54c8\u54c8\u54c8\u4f01\u4e1a",
									"payerName": "\u5409\u62c9\u5fb7\u7ecf",
									"terminalType": 1,
									"mDataObjectExistingStatus": 3,
									"mFactory": null
								}, {
									"id": "186",
									"orderSN": "W15111215A8A",
									"payerId": 20,
									"receiverId": 47,
									"payerPhone": "16811114002",
									"receiverPhone": "16811114009",
									"sourceType": null,
									"sourceId": null,
									"deleterType": null,
									"amount": "1.00",
									"deliveryPlace": "\u5b89\u5fbd-\u868c\u57e0",
									"deliveryPid": 3,
									"deliveryCid": 37,
									"receiptPlace": "\u6fb3\u95e8-\u6fb3\u95e8",
									"receiptPid": 34,
									"receiptCid": 396,
									"goodsInfo": "\u77ff\u4ea7",
									"goodsCount": 1,
									"goodsUnit": "\u5428",
									"transactionDesc": "\u4f60\u597d\u554a\u4f60\u597d\u554a\u4f60\u597d\u554a\u4f60\u597d\u554a\u4f60\u597d\u554a\u4f60\u597d\u554a\u4f60\u597d\u554a\u4f60\u597d\u554a\u4f60\u597d\u554a\u4f60\u597d\u554a\u4f60\u597d\u554a\u4f60\u597d\u554a\u4f60\u597d\u554a\u4f60\u597d\u554a\u4f60\u597d\u554a\u4f60\u597d\u554a\u4f60\u597d\u554a\u4f60\u597d\u554a\u4f60\u597d\u554a\u4f60\u597d\u554a\u4f60\u597d\u554a\u4f60\u597d\u554a\u4f60\u597d\u554a\u4f60\u597d\u554a\u4f60\u597d\u554a\u4f60\u597d\u554a\u4f60\u597d\u554a\u4f60\u597d\u554a\u4f60\u597d\u554a\u4f60\u597d\u554a\u4f60\u597d\u554a\u4f60\u597d\u554a\u4f60\u597d\u554a\u4f60\u597d\u554a\u4f60\u597d\u554a\u4f60\u597d\u554a\u4f60\u597d\u554a\u4f60\u597d\u554a\u4f60\u597d\u554a\u4f60\u597d\u554a\u4f60\u597d\u554a\u4f60\u597d\u554a\u4f60\u597d\u554a\u4f60\u597d\u554a\u4f60\u597d\u554a\u4f60\u597d\u554a\u4f60\u597d\u554a\u4f60\u597d\u554a\u4f60\u597d\u554a\u4f60\u597d\u53f7",
									"status": "3",
									"createdTime": "2015-11-12 15:53:08",
									"updatedTime": "2015-11-13 15:54:01",
									"receiverName": "\u54c8\u54c8\u54c8\u4f01\u4e1a",
									"payerName": "\u5409\u62c9\u5fb7\u7ecf",
									"terminalType": 1,
									"mDataObjectExistingStatus": 3,
									"mFactory": null
								}],
								"payerName": [],
								"receiverName": {
									"16869681673": "\u9ec4\u74dc\u4e09",
									"16811114002": "\u5409\u62c9\u5fb7\u7ecf",
									"16822220005": "\u5927\u7c73\u4f01\u4e1a\u4e00",
									"16811114009": "\u54c8\u54c8\u54c8\u4f01\u4e1a",
									"16800000000": "\u5f20\u4ef2\u793c",
									"16801010101": "\u4e0a\u7ebf"
								}
							}
						};
						var data = returnData.data;
						if (returnData.errcode !== 0) {
							s.callBack.call(null, returnData);
							return false;
						}
						if (data === null || typeof data.total === 'undefined' || data.total == 0) {
							s.data_container.html(s.noData);
							s.page_container.html('');
						} else {
							m.page_total = Math.ceil(data.total / FINAL_OPTIONS.pageSize);
							m.page_last_second = m.page_total - 1;
							s.callBack.call(null, returnData);
							if (m.page_total > 1) {

								s.page_container.children('.ky_pages').length === 0 && s.page_container.html(m.makeHtml());
								m.create(pageNum);
								if (pageNum === 1) {
									s.page_container.find('.ky_page_pre').html('<span class="ky_page_four ky_first_page"><i class="previous"></i>' + s.firstText + '</span><span class="ky_page_four ky_pre_page"><i class="previous"></i>' + s.preText + '</span>');
									s.page_container.find('.ky_page_next').html('<a class="ky_page_four ky_next_page" href="#page-' + m.page_total + '"><i class="next"></i>' + s.nextText + '</a><a class="ky_page_four ky_last_page" href="#page-' + m.page_total + '"><i class="next"></i>' + s.lastText + '</a>');
								} else if (pageNum === m.page_total) {
									s.page_container.find('.ky_page_pre').html('<a href="#page-1" class="ky_page_four ky_first_page"><i class="previous"></i>' + s.firstText + '</a><a class="ky_page_four ky_pre_page" href="#page-1"><i class="previous"></i>' + s.preText + '</a>');
									s.page_container.find('.ky_page_next').html('<span class="ky_page_four ky_next_page"><i class="previous"></i>' + s.nextText + '</span><span class="ky_page_four ky_last_page"><i class="previous"></i>' + s.lastText + '</span>');
								} else {
									s.page_container.find('.ky_page_pre').html('<a href="#page-1" class="ky_page_four ky_first_page"><i class="previous"></i>' + s.firstText + '</a><a class="ky_page_four ky_pre_page" href="#page-1"><i class="previous"></i>' + s.preText + '</a>');
									s.page_container.find('.ky_page_next').html('<a class="ky_page_four ky_next_page" href="#page-' + m.page_total + '"><i class="next"></i>' + s.nextText + '</a><a class="ky_page_four ky_last_page" href="#page-' + m.page_total + '"><i class="next"></i>' + s.lastText + '</a>');
								}
							} else {
								s.page_container.empty();
							}
						}
						$('#loading').remove();
						s.autoScroll && s.scroll(s.scrollObj);
					}
				});
			}
		};
		Page.prototype.current = function() {
			var m = this;
			return parseInt(m.settings.page_container.find('.ky_page .ky_current_page').html(), 10);
		};
		Page.prototype.regEvent = function() {
			var m = this,
				s = m.settings;
			s.page_container.off('click', '.ky_first_page').on('click', '.ky_first_page', function(event) {
				event.preventDefault();
				if (m.current() === 1) return;
				s.beforRender(1);
				m.render(1);
				m.loading();
				s.btnClickCallBack();
			});
			s.page_container.off('click', '.ky_pre_page').on('click', '.ky_pre_page', function(event) {
				event.preventDefault();
				var cur = m.current();
				if (cur === 1) {
					return false;
				}
				s.beforRender(cur - 1);
				m.render(cur - 1);
				m.loading();
				s.btnClickCallBack(cur - 1);
			});
			s.page_container.off('click', '.ky_page a').on('click', '.ky_page a', function(event) {
				event.preventDefault();
				var me = $(this),
					val = me.text();
				if (me.hasClass('ky_current_page')) return;
				val = parseInt(val, 10);
				s.beforRender(val);
				m.render(val);
				m.loading();
				s.btnClickCallBack();
			});
			s.page_container.off('click', '.ky_next_page').on('click', '.ky_next_page', function(event) {
				event.preventDefault();
				var cur = m.current();
				if (cur === m.page_total) {
					return;
				}
				s.beforRender(cur + 1);
				m.render(cur + 1);
				m.loading();
				s.btnClickCallBack(cur + 1);
			});
			s.page_container.off('click', '.ky_last_page').on('click', '.ky_last_page', function(event) {
				event.preventDefault();
				if (m.current() === m.page_total) return;
				s.beforRender(m.page_total);
				m.render(m.page_total);
				m.loading();
				s.btnClickCallBack();
			});
			if (s.jumpToPage) {
				s.page_container.off('click', '.ky_jump_to .ky_jump_button').on('click', '.ky_jump_to .ky_jump_button', function(event) {
					event.preventDefault();
					var me = $(this).siblings('.ky_jump_text'),
						val = me.val();
					if (val.match(/^\+?[1-9][0-9]*$/)) {
						val = parseInt(val, 10);
						val > m.page_total ? val = m.page_total : val = val;
						m.render(val);
						m.loading();
					} else {
						me.css('border-color', '#f00');
					}
				});
				s.page_container.off('blur', '.ky_jump_to .ky_jump_text').on('blur', '.ky_jump_to .ky_jump_text', function() {
					var me = $(this),
						val = me.val();
					if (val.match(/^\+?[1-9][0-9]*$/)) {
						val = parseInt(val, 10);
						val > m.page_total ? val = m.page_total : val = val;
						me.val(val);
						me.removeAttr('style');
					} else {
						me.css('border-color', 'red');
					}
				});
			}
		};
		tammy.ui.page = Page;
	})();

	window.log = log;
	module.exports = tammy;
});