/**
 * report
 * @authors tammy (http://tammylights.com)
 * @date    2015-11-20 11:12:19
 * @version 1.0
 */
define(function(require, exports, module) {
	function DataReport() {
		this.init = function(targetId) {
			var myChart = echarts.init(document.getElementById(targetId), 'macarons');
			var option = {
				title: {
					text: '一号车网订单趋势',
					subtext: '一号车网',
					x:'center'
				},
				tooltip: {
					trigger: 'item'
				},
				legend: {
					data: ['订单数量'],
					x:'center',
					y:'bottom'
				},
				toolbox: {
					show: true,
					feature: {
						restore: {
							show: true
						}
					}
				},
				xAxis: [{
					type: 'category',
					boundaryGap: false,
					data: ['一月', '二月', '三月', '四月', '五月', '六月']
				}],
				yAxis: [{
					type: 'value'
				}],
				series: [{
					name: '订单数量',
					type: 'line',
					data: [10000, 20000, 20005, 30000, 50000, 55000]
				}]
			};
			myChart.setOption(option);
		};
	}
	module.exports = DataReport;
});