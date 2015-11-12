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
					(new tammy.ui.shadow()).init();
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
					(new tammy.ui.shadow()).close();
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
		cache: false
	});

	/**
	 * 请求页面
	 */
	(function() {
		var showHTML = function(targetURL) {
			console.log($('#content-container').length);

			$('#content-container').load(targetURL, function(response, status, xhr) {
				if (xhr.status === 404) {
					log('没有该页面');
				} else {

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

	(function() {
		function Shadow(option) {
			var m = this;
			m.option = {};
			$.extend(m.option, option);
		}

		Shadow.prototype.init = function() {
			var m = this;
			m.addShadow();
		};
		Shadow.prototype.addShadow = function() {
			var m = this;
			if ($('#kyPoupshadow').length > 0) {
				$('#kyPoupshadow').remove();
			}
			var shadowstr = '<div id="kyPoupshadow" class="loading"><div class="loading-img"><div/></div>';
			$('body').append(shadowstr).end().find("#kyPoupshadow").css("height", $(document).height());
		};
		Shadow.prototype.close = function() {
			$('#kyPoupshadow').remove();
		};
		tammy.ui.shadow = Shadow;
	})();

	window.log = log;
	module.exports = tammy;
});