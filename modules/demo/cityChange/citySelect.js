function ChangeCity(options) {
      var me = this;
      me.settings = {
            cityVal: '北京',
            callback: function() {}
      };
      $.extend(me.settings, options);

      var finalData = {
            hotCityArr: [],
            zhiXiaShiArr: [],
            cityFirstCharacterValArr: ['A', 'F', 'G', 'H', 'J', 'L', 'N', 'Q', 'S', 'T', 'X', 'Y', 'Z'],
            FirstCharacterCityArr: {}
      };

      var privateAttr = {
            init: function() {
                  var opt = {
                        hotCity: ['北京', '广州', '深圳', '南京', '上海', '杭州'],
                        zhiXiaShi: ['北京', '重庆', '上海', '天津']
                  };
                  var curData = privateAttr.makeData(opt);
                  var htmlStr = privateAttr.makeHtml(curData);
                  $('body').append(htmlStr);
                  // privateAttr.select();
                  privateAttr.registerEvent();
            },
            makeHtml: function(cityData) {
                  var str = '';
                  str += '<div id="cityPopup-container" class="citypop citypop_po" style="display:block;">';
                  str += '<div class="citypop-content citypop-content2">';
                  str += '<div class="citypop-content-top citypop-content-top1">';
                  str += '<div class="citypop-search citypop-search1">';
                  str += '<input type="text" id="citypop-search-input" name="citypop-search-input" placeholder="请输入城市名..."></div>';
                  str += '<div class="citypop-hotcity">';
                  for (var i = 0; i < cityData.hotCityArr.length; i++) {
                        var item = cityData.hotCityArr[i];
                        str += privateAttr.makeCityInfo(item);
                  }
                  str += '</div>';
                  str += '<a href="javascript:void(0);" rel="nofollow" class="citypop-close citypop-close2"><font class="citypop-close2_i">X</font></a></div>';
                  str += '<div class="citypop-content-info">';
                  str += '<div class="citypop-nb citypop-nb2">';
                  for (var j = 0; j < cityData.cityFirstCharacterValArr.length; j++) {
                        var chartUpper = cityData.cityFirstCharacterValArr[j];
                        str += '<a href="javascript:void(0);" name="ckk-city-firstChart" data-key="' + chartUpper + '">' + chartUpper + '</a>';
                  }
                  str += '</div>';
                  str += '<div class="citypop-scity" id="citypop-scity">';
                  str += '<dl class="dlbg dlbg-top">';
                  str += '<dt><span class="tx">直辖市：</span></dt>';
                  str += '<dd>';
                  for (var n = 0; n < cityData.zhiXiaShiArr.length; n++) {
                        var zhi = cityData.zhiXiaShiArr[n];
                        str += privateAttr.makeCityInfo(zhi);
                  }
                  str += '</dd></dl>';
                  for (var prov in cityData.FirstCharacterCityArr) {
                        var provItem = cityData.FirstCharacterCityArr[prov];
                        var isFirst = 0;
                        str += '<dl>';
                        for (var k = 0; k < provItem.length; k++) {
                              var subItem = provItem[k];
                              str += '<dt>';
                              if (isFirst === 0) {
                                    isFirst = 1;
                                    str += '<span class="nu" id="che001-firstChart-' + subItem.FirstCharacter + '">' + subItem.FirstCharacter + '</span>';
                              }
                              str += '<span class="tx">' + subItem.Name + '：</span>';
                              str += '</dt><dd>';
                              var subCity = subItem.City;
                              for (var l = 0; l < subCity.length; ++l) {
                                    var temps = subCity[l];
                                    str += privateAttr.makeCityInfo(temps);
                              }
                              str += '</dd>';
                        }
                        str += '</dl>';
                  }
                  str += '</div></div></div></div>';
                  return str;
            },
            makeCityInfo: function(obj) {
                  var str = '<a href="javascript:void(0);" rel="nofollow"';
                  str += ' data-key="' + obj.id + '"';
                  str += ' data-info="[\'' + obj.id + '\',\'' + obj.Name + '\',\'' + obj.Pinyin + '\']"';
                  str += ' name="ckk-city-name">';
                  str += obj.Name + '</a>';
                  return str;
            },
            isZhiXiaShi: function(arr, cityName) {
                  var isEq = false;
                  for (var i = 0, len = arr.length; i < len; ++i) {
                        var item = arr[i];
                        if (item.Name === cityName) {
                              isEq = item;
                              break;
                        }
                  }
                  return isEq;
            },
            search: function() {

            },
            select: function(cityVal) {
                  var arr = document.getElementsByName('ckk-city-name');
                  for (var i = 0, len = arr.length; i < len; ++i) {
                        var item = arr[i];
                        if (item.innerHTML === cityVal) {

                        }
                  }
            },
            goTo: function() {

            },
            makeData: function(opt) {
                  for (var i = 0, len = finalString.length; i < len; ++i) {
                        var item = finalString[i];
                        var curFirstChart = item.FirstCharacter;
                        var citys = item.City;
                        var fcc = finalData.FirstCharacterCityArr[curFirstChart];
                        var isZhi = false;
                        //首字母城市列表
                        for (var n = 0, len3 = opt.hotCity.length; n < len3; ++n) {
                              var hot = opt.hotCity[n];
                              var isHotEq = privateAttr.isZhiXiaShi(citys, hot);
                              if (isHotEq) {
                                    finalData.hotCityArr.push(isHotEq);
                              }
                        }
                        for (var m = 0, len4 = opt.zhiXiaShi.length; m < len3; ++m) {
                              var zhi = opt.zhiXiaShi[m];
                              if (zhi === item.Name) {
                                    finalData.zhiXiaShiArr.push(item);
                                    isZhi = true;
                              }
                        }
                        if (isZhi) {
                              continue;
                        }
                        if (typeof fcc === 'undefined') {
                              finalData.FirstCharacterCityArr[curFirstChart] = [];
                              finalData.FirstCharacterCityArr[curFirstChart].push(item);
                        } else {
                              fcc.push(item);
                        }
                  }
                  return finalData;
            },
            registerEvent: function() {
                  var obj = {
                        cityListCon: document.getElementById('citypop-scity'),
                        firstChartObj: document.getElementsByName('ckk-city-firstChart')
                  };
                  log(obj.firstChartObj);
                  for (var i = 0, len = obj.firstChartObj.length; i < len; ++i) {
                        var item = obj.firstChartObj[i];
                        item.onclick = function(e) {
                              e = e || window.event;
                              var t = e.srcElement || e.target,
                                    a = !(!window.attachEvent || window.opera);
                              var val = this.innerHTML;
                              var targCon = document.getElementById('che001-firstChart-' + val).parentNode.parentNode;
                              log(targCon.offsetTop);
                              var offsetTop = targCon.offsetTop;
                              obj.cityListCon.scrollTop = offsetTop - 110;
                        };
                  }

            }
      };

      return {
            init: privateAttr.init
      };
}

function log(arg) {
      console.log(arg);
}
var test = new ChangeCity();
test.init();