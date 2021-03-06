/**
 * routeImg
 * @authors tammy (http://tammylights.com)
 * @date    2015-11-26 09:21:20
 * @version 1.0
 */
define(function(require, exports, module) {
	/* 
	 * www.byzuo.com 
	 * ok!: MSIE 6, 7, 8, Firefox 3.6, chrome 4, Safari 4, Opera 10 
	 * o 旋转图片ID; 
	 * p 选择旋转方向，固定值为'left'或'right'; 
	 */
	function rotate(o, p) {
		var img = document.getElementById(o);
		if (!img || !p) return false;
		var n = img.getAttribute('step');
		if (n == null) n = 0;
		if (p == 'right') {
			(n == 3) ? n = 0: n++;
		} else if (p == 'left') {
			(n == 0) ? n = 3: n--;
		}
		img.setAttribute('step', n);
		//MSIE 
		if (document.all) {
			img.style.filter = 'progid:DXImageTransform.Microsoft.BasicImage(rotation=' + n + ')';
			//HACK FOR MSIE 8 
			switch (n) {
				case 0:
					img.parentNode.style.height = img.height;
					break;
				case 1:
					img.parentNode.style.height = img.width;
					break;
				case 2:
					img.parentNode.style.height = img.height;
					break;
				case 3:
					img.parentNode.style.height = img.width;
					break;
			}
			//DOM 
		} else {
			var c = document.getElementById('canvas_' + o);
			if (c == null) {
				img.style.visibility = 'hidden';
				img.style.position = 'absolute';
				c = document.createElement('canvas');
				c.setAttribute("id", 'canvas_' + o);
				img.parentNode.appendChild(c);
			}
			var canvasContext = c.getContext('2d');
			switch (n) {
				default:
					case 0:
					c.setAttribute('width', img.width);
				c.setAttribute('height', img.height);
				canvasContext.rotate(0 * Math.PI / 180);
				canvasContext.drawImage(img, 0, 0);
				break;
				case 1:
						c.setAttribute('width', img.height);
					c.setAttribute('height', img.width);
					canvasContext.rotate(90 * Math.PI / 180);
					canvasContext.drawImage(img, 0, -img.height);
					break;
				case 2:
						c.setAttribute('width', img.width);
					c.setAttribute('height', img.height);
					canvasContext.rotate(180 * Math.PI / 180);
					canvasContext.drawImage(img, -img.width, -img.height);
					break;
				case 3:
						c.setAttribute('width', img.height);
					c.setAttribute('height', img.width);
					canvasContext.rotate(270 * Math.PI / 180);
					canvasContext.drawImage(img, -img.width, 0);
					break;
			}
		}
	}
	module.exports = rotate;
});