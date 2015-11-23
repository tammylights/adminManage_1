/**
 * report
 * @authors tammy (http://tammylights.com)
 * @date    2015-11-20 11:12:19
 * @version 1.0
 */
function TammyMap() {
	var me = this;
	this.init = function() {
		var bmap = document.getElementById('selfMap');
		if(bmap === null){
			var script = document.createElement('script');
			script.type='text/javascript';
			script.id = 'selfMap';
			script.src="http://api.map.baidu.com/api?v=2.0&ak=8nSiXscCROaAl1M2zwZgkycm&callback=selfMap.initMap";
			document.body.appendChild(script);
		}
	};

	this.initMap = function(){
		log(22222);
		var map = new BMap.Map('allmap');//map实例
		var point = new BMap.Point(116.331398,39.897445);
		map.centerAndZoom(point,12);


		map.centerAndZoom('邯郸',11); 
	};

}

var selfMap = new TammyMap();
selfMap.init();