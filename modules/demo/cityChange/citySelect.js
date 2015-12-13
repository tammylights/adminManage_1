function ChangeCity(options) {
      var me = this;
      me.settings = {
            cityVal: '',
            callback: function() {}
      };
      var tools = {
            makeArray:function(arrStr){
                  arrStr = arrStr.substring(1, arrStr.length - 1);
                  arrStr = arrStr.replace(/'/g, '');
                  return arrStr.split(',');
            },
            extend:function(target,source){
                  for (var p in source) {
                        if (source.hasOwnProperty(p)) {
                              target[p] = source[p];
                        }
                  }
                  return target;
            },
            domById:function(domId){
                  return document.getElementById(domId);
            }
      };


      var finalData = {
            hotCityArr: [],
            zhiXiaShiArr: [],
            cityFirstCharacterValArr: ['A', 'F', 'G', 'H', 'J', 'L', 'N', 'Q', 'S', 'T', 'X', 'Y', 'Z'],
            FirstCharacterCityArr: {}
      };

      var privateAttr = {
            init: function() {
                  var opt = {
                        hotCity: [52, 76, 77, 220, 321, 383],
                        zhiXiaShi: [52, 394, 321, 343]
                  };
                  var curData = privateAttr.makeData(opt);
                  var htmlStr = privateAttr.makeHtml(curData);
                  $('body').append(htmlStr);
                  if (me.settings.cityVal) {
                        privateAttr.select(me.settings.cityVal);
                  }
                  privateAttr.registerEvent();
            },
            makeHtml: function(cityData) {
                  var str = '';
                  str += '<div id="citypop-container" class="citypop citypop_po" style="display:none;">';
                  str += '<div class="citypop-content citypop-content2">';
                  str += '<div class="citypop-content-top citypop-content-top1">';
                  str += '<div class="citypop-search citypop-search1">';
                  str += '<input type="text" id="citypop-search-input" name="citypop-search-input" value="请输入城市名...">';
                  str += '<div id="citypop-search-result-box" class="citypop-tip-box citypop-ct">';
                  str += '<div id="citypop-search-result-no" class="ntextdicon" style="display: none;">对不起，找不到您输入的内容</div>';
                  str += '<div id="citypop-search-result-go" class="zdicon" style="display: none;">点击直达</div>';
                  str += '<ul id="citypop-search-result-list" style="display: none;"></ul>';
                  str += '</div></div><div class="citypop-hotcity">';
                  for (var i = 0; i < cityData.hotCityArr.length; i++) {
                        var item = cityData.hotCityArr[i];
                        str += privateAttr.makeCityInfo(item);
                  }
                  str += '</div>';
                  str += '<a href="javascript:void(0);" rel="nofollow" id="ckk-citypop-close" class="citypop-close citypop-close2"><font class="citypop-close2_i">X</font></a></div>';
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
                              str += '<span class="tx" data-info="[\'' + subItem.id + '\',\'' + subItem.Name + '\',\'' + subItem.Pinyin + '\']">' + subItem.Name + '：</span>';
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
            search: function(obj) {
                  var searchObj = {
                        input: document.getElementById('citypop-search-input'),
                        no: document.getElementById('citypop-search-result-no'),
                        go: document.getElementById('citypop-search-result-go'),
                        list: document.getElementById('citypop-search-result-list'),
                        box: document.getElementById('citypop-search-result-box')
                  };
                  searchObj.input.onfocus = function() {
                        if (this.value.indexOf('...') > -1) {
                              this.value = '';
                        }
                  };

                  searchObj.input.onblur = function() {
                        if ('' === this.value) {
                              this.value = '请输入城市名...';
                        }
                        setTimeout(function() {
                              searchObj.box.style.display = 'none';
                        }, 500);
                  };

                  searchObj.input.onkeyup = function(t) {
                        if (t = t || window.event, 40 !== t.keyCode && 38 !== t.keyCode && 13 !== t.keyCode) {
                              for (var i = 0, l = finalString.length, n = []; i < l; ++i) {
                                    var temp = finalString[i];
                                    var citys = temp.City;
                                    for (var j = 0, m = citys.length; j < m; ++j) {
                                          var item = citys[j];
                                          var itemPin = item.Pinyin;
                                          var itemStr = itemPin.substring(0, this.value.length);
                                          if (itemStr === this.value) {
                                                n.push(item);
                                          }
                                    }
                                    if (n.length >= 10) {
                                          break;
                                    }
                              }
                              if (n.length > 0) {
                                    searchObj.list.innerHTML = '';
                                    var pCon = document.getElementById('citypop-search-result-list');
                                    for (var g = 0, k = n.length, str = ''; g < k; ++g) {
                                          var c = n[g];
                                          var li = document.createElement('li');
                                          var a = document.createElement('a');
                                          a.setAttribute('href', 'javascript:void(0);');
                                          a.setAttribute('data-key', c.id);
                                          a.setAttribute('data-info', '[' + c.id + ',\'' + c.Name + '\'' + ',\'' + c.Pinyin + '\'');
                                          a.innerHTML = '<span>' + c.Name + '</span><b>' + c.Pinyin + '</b>';
                                          li.appendChild(a);
                                          pCon.appendChild(li);
                                    }
                                    searchObj.box.style.display = 'block';
                                    searchObj.no.style.display = 'none';
                                    searchObj.go.style.display = 'block';
                                    searchObj.list.style.display = 'block';
                                    var childs = pCon.getElementsByTagName('a');
                                    for (var d = 0; d < childs.length; ++d) {
                                          privateAttr.returnCallBack(childs[d]);
                                    }
                              }
                        }
                  };
            },
            returnCallBack: function(obj) {
                  obj.onclick = function() {
                        var m = this;
                        var dataInfo = m.getAttribute('data-info');
                        var infoArr = tools.makeArray(dataInfo);
                        document.getElementById('ckk-citypop-close').click();
                        privateAttr.select(infoArr[1]);
                        me.settings.callback(infoArr, this);
                  };
            },
            makeCityInfo: function(obj) {
                  var str = '<a href="javascript:void(0);" rel="nofollow"';
                  str += ' data-key="' + obj.id + '"';
                  str += ' data-info="[\'' + obj.id + '\',\'' + obj.Name + '\',\'' + obj.Pinyin + '\']"';
                  str += ' name="ckk-city-name">';
                  str += obj.Name + '</a>';
                  return str;
            },
            isZhiXiaShi: function(arr, cityId) {
                  var isEq = false;
                  for (var i = 0, len = arr.length; i < len; ++i) {
                        var item = arr[i];
                        if (item.id == cityId) {
                              isEq = item;
                              break;
                        }
                  }
                  return isEq;
            },
            select: function(cityName) {
                  var cityBox = document.getElementById('citypop-scity');
                  var allCity = cityBox.getElementsByTagName('a');
                  for (var i = 0, len = allCity.length; i < len; ++i) {
                        var item = allCity[i];
                        var currnetInfo = item.getAttribute('data-info');
                        var itemInfo = tools.makeArray(currnetInfo);
                        if (itemInfo[1] === cityName) {
                              item.className = 'current';
                        } else {
                              item.className = '';
                        }
                  }
            },
            makeData: function(opt) {
                  for (var i = 0, len = finalString.length; i < len; ++i) {
                        var item = finalString[i];
                        var curFirstChart = item.FirstCharacter;
                        var citys = item.City;
                        var fcc = finalData.FirstCharacterCityArr[curFirstChart];
                        var isZhi = false;
                        for (var n = 0, len3 = opt.hotCity.length; n < len3; ++n) {
                              var hot = opt.hotCity[n];
                              var isHotEq = privateAttr.isZhiXiaShi(citys, hot);
                              if (isHotEq) {
                                    finalData.hotCityArr.push(isHotEq);
                              }
                        }

                        for (var m = 0, len4 = opt.zhiXiaShi.length; m < len3; ++m) {
                              var zhi = opt.zhiXiaShi[m];
                              var isZhiEq = privateAttr.isZhiXiaShi(citys, zhi);
                              if (isZhiEq) {
                                    finalData.zhiXiaShiArr.push(isZhiEq);
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
                        firstChartObj: document.getElementsByName('ckk-city-firstChart'),
                        closeObj: document.getElementById('ckk-citypop-close')
                  };
                  for (var i = 0, len = obj.firstChartObj.length; i < len; ++i) {
                        privateAttr.firstChartFunc(obj.firstChartObj[i]);
                  }

                  for (var f = 0, b = document.getElementById('citypop-container'), a = document.getElementsByName('ckk-city-name'); f < a.length; ++f) {
                        privateAttr.returnCallBack(a[f]);
                  }
                  obj.closeObj.onclick = function() {
                        document.getElementById('citypop-container').style.display = 'none';
                  };

                  privateAttr.search(obj);

            },
            firstChartFunc: function(obj) {
                  obj.onclick = function(e) {
                        e = e || window.event;
                        var t = e.srcElement || e.target,
                              a = !(!window.attachEvent || window.opera);
                        var val = this.innerHTML;
                        var targCon = document.getElementById('che001-firstChart-' + val).parentNode.parentNode;
                        var offsetTop = targCon.offsetTop;
                        document.getElementById('citypop-scity').scrollTop = offsetTop - 110;
                  };
            },
            show: function() {
                  tools.domById('citypop-container').style.display = 'block';
                  return this;
            },
            close: function() {
                  tools.domById('ckk-citypop-close').click();
            },
            ChangeCity: function(cityVal) {
                  me.settings.cityVal = cityVal;
                  privateAttr.select(cityVal);
                  return this;
            },
            reset:function(){
                   me.settings.cityVal = '';
                  privateAttr.select(me.settings.cityVal);
                  return this;
            }
      };
      me.settings = tools.extend(me.settings, options);
      privateAttr.init();
      return {
            init: privateAttr.init,
            show: privateAttr.show,
            close: privateAttr.close,
            changeCity: privateAttr.ChangeCity,
            reset:privateAttr.reset
      };
}

function log(arg) {
      console.log(arg);
}

var test = new ChangeCity({
      cityVal: '北京',
      callback: function(arr, obj) {
            log(arr);
      }
});
test.show();