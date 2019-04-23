// 地理环境tab切换
var listenDom = document.getElementsByClassName('contain_title')[0];
var saveTabName = [0, 0, 0, 0];
var saveStaionName = '';
var arrAdd = []
var homePage = document.getElementsByClassName('homePage')[0];
var menu = document.getElementsByClassName('menu')[0];
var collapseArr = [];
var s = 'http://192.168.1.80:801/'





listenDom.addEventListener('click', function (e) {
    if (e.target.className == 'city_') {
        console.log(saveTabName)
        var cityDom = document.getElementsByClassName("city_");
        var containDom = document.getElementsByClassName("hide_contain");
        for (let i = 0; i < cityDom.length; i++) {
            if (e.target.innerText == cityDom[i].innerText) {
                if (saveTabName[i] == 0) {
                    // console.log(i)
                    if (i == 1) {
                        layer.alert('当前未选择省份，请先选择省份后再进行操作！', {
                            icon: 0
                        });
                    } else if (i == 2) {
                        layer.alert('当前未选择市区，请先选择市区后再进行操作！', {
                            icon: 0
                        });
                    } else if (i == 3) {
                        layer.alert('当前未选择县，请先选择县后再进行操作！', {
                            icon: 0
                        });
                    }
                    return
                }
            }
        }

        for (let i = 0; i < cityDom.length; i++) {

            cityDom[i].className = 'city_';
            containDom[i].className = 'hide_contain';
            if (e.target.innerText == cityDom[i].innerText) {

                switch (i) {
                    case 0:
                        containDom[i].className = 'hide_contain show_contain province';
                        break;
                    case 1:
                        containDom[i].className = 'hide_contain show_contain cityTab';
                        break;
                    case 2:
                        containDom[i].className = 'hide_contain show_contain countown';
                    case 3:
                        containDom[i].className = 'hide_contain show_contain staion_';
                        break;
                    default:
                        break;
                }

            }
        }
        e.target.className = 'city_ choseCity';
        // saveTabName = e.target.innerText;
    }
})
//
menu.onmouseover = function () {
    menu.style.cursor = 'pointer';
}
menu.onmouseout = function () {
    menu.style.cursor = 'default';
}

$(".menu").click(function () {
    $('.homePage').toggleClass('none')
})

homePage.onclick = function () {
    viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(116.435314, 39.960521, 30000000.0), // 设置位置

        orientation: {
            heading: Cesium.Math.toRadians(20.0), // 方向
            pitch: Cesium.Math.toRadians(-90.0), // 倾斜角度
            roll: 0
        }
    });
}





getCity('0', '')
function getCity(type, areaname) {
    var citydom_ = document.getElementsByClassName("province")[0];
    var citydom_1 = document.getElementsByClassName("cityTab")[0];
    var citydom_2 = document.getElementsByClassName("countown")[0];
    var citydom_3 = document.getElementsByClassName("staion_")[0];
    console.log(citydom_1)
    var sendData = {
        flag: type,
        areaName: areaname
    };
    Ajax('get', s + 'feature/getProvinceList', sendData, function (res) {
        var resData = JSON.parse(res);
        if (resData.returnCode == '200') {
            console.log(resData.data)
            switch (type) {
                case '0': //如果为省份，动态添加省份dom元素
                    var div1
                    for (let i = 0; i < resData.data.length; i++) {
                        var span1 = document.createElement('span');
                        span1.className = 'provinceName'
                        span1.innerText = resData.data[i].province
                        span1.setAttribute('data-type', 0)
                        if (i % 5 == 0) {
                            div1 = document.createElement("div");
                        }
                        div1.appendChild(span1);

                        if (i % 5 == 0) {
                            citydom_.appendChild(div1)
                        }
                    }
                    // console.log(div1)
                    provinceListen()

                    break;
                case '1': //如果为市，动态添加市dom元素
                    var div2
                    citydom_1.innerHTML = '';
                    console.log(citydom_1)
                    for (let i = 0; i < resData.data.length; i++) {
                        var span1 = document.createElement('span');
                        span1.className = 'cityName'
                        span1.innerText = resData.data[i].city
                        span1.setAttribute('data-type', 1)
                        if (i % 5 == 0) {
                            div2 = document.createElement("div");
                        }
                        div2.appendChild(span1);
                        if (i % 5 == 0) {
                            citydom_1.appendChild(div2)
                        }
                    }
                    // console.log(div1)
                    cityListen()

                    break;
                case '2': //如果为区，动态添加区dom元素
                    var div2
                    console.log(citydom_2)
                    citydom_2.innerHTML = '';
                    for (let i = 0; i < resData.data.length; i++) {
                        var span1 = document.createElement('span');
                        span1.className = 'downTownName'
                        span1.innerText = resData.data[i].cnty
                        span1.setAttribute('data-type', 2)
                        if (i % 5 == 0) {
                            div2 = document.createElement("div");
                        }
                        div2.appendChild(span1);
                        if (i % 5 == 0) {
                            citydom_2.appendChild(div2)
                        }
                    }
                    // console.log(div1)
                    downTownListen()

                    break;
                case '3': //如果为站点，动态添加站点dom元素
                    var div2
                    console.log(citydom_3)

                    citydom_3.innerHTML = '';
                    for (let i = 0; i < resData.data.length; i++) {


                        var span1 = document.createElement('span');
                        span1.className = 'statin_Name'
                        span1.innerText = resData.data[i].Station_Name;
                        span1.setAttribute('ids', resData.data[i].Station_ID_C)
                        span1.setAttribute('lon', resData.data[i].Lon)
                        span1.setAttribute('lat', resData.data[i].Lat)
                        span1.setAttribute('data-type', 3)
                        if (i % 5 == 0) {
                            div2 = document.createElement("div");
                        }
                        div2.appendChild(span1);
                        if (i % 5 == 0) {
                            citydom_3.appendChild(div2)
                        }
                    }
                    // console.log(div1)
                    // downTownListen()
                    stationListen()
                    doubleListen()
                    break;

                default:
                    break;
            }
        }
    }, function (error) {
        console.log(error);
    });
}

function provinceListen() { //省份选择事件
    var province = document.getElementsByClassName("province")[0];
    province.addEventListener('click', function (e) {

        if (e.target.className == 'provinceName') {

            for (let i = 0; i < document.getElementsByClassName('provinceName').length; i++) {
                document.getElementsByClassName('provinceName')[i].className = 'provinceName'
            }
            e.target.className = 'provinceName blueChose';
            for (let i = 0; i < saveTabName.length; i++) {
                saveTabName[i] = 0;
            }
            saveTabName[0] = 1;
            saveTabName[1] = 1;
            document.getElementsByClassName('city_')[0].innerText = e.target.innerText; //修改tab头部省份数据
            // 
            var cityDom = document.getElementsByClassName("city_");
            var containDom = document.getElementsByClassName("hide_contain");

            for (let i = 0; i < cityDom.length; i++) {
                cityDom[i].className = 'city_';
                containDom[i].className = 'hide_contain';
            }
            containDom[1].className = 'hide_contain show_contain cityTab';
            cityDom[1].className = 'city_ choseCity';
            getCity('1', e.target.innerText)
        }
    })
}

function cityListen() { //市区选择事件
    var province = document.getElementsByClassName("cityTab")[0];
    province.addEventListener('click', function (e) {
        console.log(e.target)
        if (e.target.className == 'cityName') {
            for (let i = 0; i < document.getElementsByClassName('cityName').length; i++) {
                document.getElementsByClassName('cityName')[i].className = 'cityName'
            }
            e.target.className = 'cityName blueChose'
            for (let i = 0; i < saveTabName.length; i++) {
                saveTabName[i] = 0;
            }
            saveTabName[0] = 1;
            saveTabName[1] = 1;
            saveTabName[2] = 1;

            document.getElementsByClassName('city_')[1].innerText = e.target.innerText; //修改tab头部省份数据
            document.getElementsByClassName('city_')[2].innerText = "选择县"
            document.getElementsByClassName('city_')[3].innerText = '选择区'

            // 
            var cityDom = document.getElementsByClassName("city_");
            var containDom = document.getElementsByClassName("hide_contain");

            for (let i = 0; i < cityDom.length; i++) {
                cityDom[i].className = 'city_';
                containDom[i].className = 'hide_contain';
            }
            containDom[2].className = 'hide_contain show_contain countown';
            cityDom[2].className = 'city_ choseCity';
            getCity('2', e.target.innerText)
        }
    })
}

function downTownListen() { //县区选择事件
    var province = document.getElementsByClassName("countown")[0];
    province.addEventListener('click', function (e) {
        console.log(e.target)
        if (e.target.className == 'downTownName') {
            for (let i = 0; i < document.getElementsByClassName('downTownName').length; i++) {
                document.getElementsByClassName('downTownName')[i].className = 'downTownName'
            }
            e.target.className = 'downTownName blueChose'
            for (let i = 0; i < saveTabName.length; i++) {
                saveTabName[i] = 0;
            }
            saveTabName[0] = 1;
            saveTabName[1] = 1;
            saveTabName[2] = 1;
            saveTabName[3] = 1;
            document.getElementsByClassName('city_')[2].innerText = e.target.innerText; //修改tab头部省份数据
            // 
            document.getElementsByClassName('city_')[3].innerText = '选择区'
            var cityDom = document.getElementsByClassName("city_");
            var containDom = document.getElementsByClassName("hide_contain");

            for (let i = 0; i < cityDom.length; i++) {
                cityDom[i].className = 'city_';
                containDom[i].className = 'hide_contain';
            }
            console.log(11)
            containDom[3].className = 'hide_contain show_contain staion_';
            cityDom[3].className = 'city_ choseCity';
            getCity('3', e.target.innerText);
            getTempData(e.target.innerText)
        }
    })
}


function stationListen() { //站点选择事件
    var province = document.getElementsByClassName("staion_")[0];
    province.addEventListener('click', function (e) {
        console.log(e.target)
        if (e.target.className == 'statin_Name') {
            for (let i = 0; i < document.getElementsByClassName('statin_Name').length; i++) {
                document.getElementsByClassName('statin_Name')[i].className = 'statin_Name'
            }
            e.target.className = 'statin_Name blueChose'
            for (let i = 0; i < saveTabName.length; i++) {
                saveTabName[i] = 0;
            }
            saveTabName[0] = 1;
            saveTabName[1] = 1;
            saveTabName[2] = 1;
            saveTabName[3] = 1;
            document.getElementsByClassName('city_')[3].innerText = e.target.innerText; //修改tab头部省份数据
            saveStaionName = e.target.getAttribute('ids');

        }
    })
}
function doubleListen() { //站点双击事件
    var province = document.getElementsByClassName("staion_")[0];
    province.addEventListener('dblclick', function (e) {
        console.log(e.target)
        if (e.target.className.indexOf('statin_Name') >= 0) {
            for (let i = 0; i < document.getElementsByClassName('statin_Name').length; i++) {
                document.getElementsByClassName('statin_Name')[i].className = 'statin_Name'
            }
            e.target.className = 'statin_Name blueChose'
            for (let i = 0; i < saveTabName.length; i++) {
                saveTabName[i] = 0;
            }
            saveTabName[0] = 1;
            saveTabName[1] = 1;
            saveTabName[2] = 1;
            saveTabName[3] = 1;
            document.getElementsByClassName('city_')[3].innerText = e.target.innerText; //修改tab头部省份数据
            saveStaionName = e.target.getAttribute('ids');
            saveStaionlon = e.target.getAttribute('lon');
            saveStaionLat = e.target.getAttribute('lat');
            viewer.camera.flyTo({
                destination: Cesium.Cartesian3.fromDegrees(saveStaionlon, saveStaionLat, 1000000)
                // orientation : {
                //     heading: Cesium.Math.toRadians(20.0), // 方向
                //     pitch: Cesium.Math.toRadians(-90.0), // 倾斜角度
                //     roll: 0
                // }
            });
        }
    })

}


// 基本气象数据
function baseMeteData() {
    var baseDom = document.getElementsByClassName("baseMete_")[0];
    baseDom.addEventListener('click', function (e) {
        console.log(saveStaionName)

        if (e.target.nodeName.toLowerCase() == 'li') {
            if (saveTabName[3] == 0 || saveStaionName == '') {
                layer.alert('当前未选择站点，请先选择站点再进行操作！', {
                    icon: 0
                });
                return
            }
            if (e.target.className == 'factorChose') {
                e.target.className = ''
            } else {
                // getBaseEchartsData()
                // e.target.className='factorChose'
                // getBaseEchartsData()
            }
            arrayElement(e.target)

            console.log(e.target)
        }
    })
}
// 农业生态要素
function framBaseData() {
    var baseDom = document.getElementsByClassName("farm_")[0];
    baseDom.addEventListener('click', function (e) {
        console.log(saveStaionName)

        if (e.target.nodeName.toLowerCase() == 'li') {

            if (saveTabName[3] == 0 || saveStaionName == '') {
                layer.alert('当前未选择站点，请先选择站点再进行操作！', {
                    icon: 0
                });
                return
            }
            if (e.target.className == 'factorChose') {
                e.target.className = ''
            } else {
                // e.target.className='factorChose'
                // getBaseEchartsData()

            }
            arrayElement(e.target)

            console.log(e.target)
        }
    })

}
// 高亮两次限制

function arrayElement(data) {
    arrAdd.push(data);
    if (arrAdd.length > 1) {
        var prve = arrAdd.shift();
        $(prve).removeClass("factorChose");
    }
    for (let i = 0; i < arrAdd.length; i++) {
        arrAdd[i].className = 'factorChose';

    }
    getBaseEchartsData()
}

// var saveBaseEcharts = [];
//折线图数据得获取与
function getBaseEchartsData() {
    var factorChose = document.getElementsByClassName('factorChose');
    var arr = [];
    for (let i = 0; i < factorChose.length; i++) {
        switch (factorChose[i].innerText) {
            case '温度':
                arr.push('TEM')
                break;

            case '雨量':
                arr.push('PRE_1h')
                break;
            case '气压':
                arr.push('PRS')
                break;
            case '风向':
                arr.push('WIN_D_Avg_10mi')
                break;
            case '风速':
                arr.push('WIN_S_Avg_10mi')
                break;
            case '相对湿度':
                arr.push('RHU')
                break;
            case '能见度':
                arr.push('VIS_HOR_10MI')
                break;
            case '土壤相对湿度(多层)':
                arr.push('SRHU')
                break;
            case '光照时长':
                arr.push('SSH')
                break;

            default:
                break;
        }
    }

    Ajax('get', s + 'feature/getOneStationDetailByTimeRange', {
        'stationId': saveStaionName,
        'features': arr,
        'days': 7
    }, function (res) {

        res = JSON.parse(res)
        console.log(res)
        if (res.returnCode == '200') {
            option1.series = [];
            option1.xAxis[0].data = res.data.time;

            var data = [];
            var name;
            var zzz = [];
            for (const key in res.data) {

                if (key == 'TEM') {
                    if (res.data.hasOwnProperty(key)) {
                        data.push(res.data[key]);
                        name = '温度'
                        zzz.push(name)
                    }
                } else if (key == 'time') {
                    continue
                } else if (key == 'PRE_1h') {
                    if (res.data.hasOwnProperty(key)) {
                        data.push(res.data[key]);
                        name = '雨量'
                        zzz.push(name)
                    }
                } else if (key == 'PRS') {
                    if (res.data.hasOwnProperty(key)) {
                        data.push(res.data[key]);
                        name = '气压'
                        zzz.push(name)
                    }
                } else if (key == 'WIN_D_Avg_10mi') {
                    if (res.data.hasOwnProperty(key)) {
                        data.push(res.data[key]);
                        name = '风向'
                        zzz.push(name)
                    }
                } else if (key == 'WIN_S_Avg_10mi') {
                    if (res.data.hasOwnProperty(key)) {
                        data.push(res.data[key]);
                        name = '风速'
                        zzz.push(name)
                    }
                } else if (key == 'RHU') {
                    if (res.data.hasOwnProperty(key)) {
                        data.push(res.data[key]);
                        name = '相对湿度'
                        zzz.push(name)
                    }
                } else if (key == 'VIS_HOR_10MI') {
                    if (res.data.hasOwnProperty(key)) {
                        data.push(res.data[key]);
                        name = '能见度'
                        zzz.push(name)
                    }
                } else if (key == 'SRHU') {
                    if (res.data.hasOwnProperty(key)) {
                        data.push(res.data[key]);
                        name = '土壤相对湿度(多层)'
                        zzz.push(name)
                    }
                } else if (key == 'SSH') {
                    if (res.data.hasOwnProperty(key)) {
                        data.push(res.data[key]);
                        name = '光照时长'
                        zzz.push(name)
                    }
                }
                console.log('=======================');

                //折线图Y轴数据
                var obj = [
                    {
                        name: zzz[0],
                        type: 'line',
                        data: data[0],

                        itemStyle: {
                            normal: {
                                lineStyle: {
                                    color: '#ff3040'
                                }
                            }
                        },
                    },


                ]
                option1.series = obj;
            }
            myChart1.setOption(option1)
        }
    })
}


baseMeteData()
framBaseData()

//主页返回事件

// 图表收起事件
function collapse(index) {
    // document.getElementsByClassName('menuLogo')[0].style.display = 'flex';
    if (collapseArr.indexOf(index) == -1) {
        collapseArr.push(index)
    } else {
        var num = collapseArr.indexOf(index);
        collapseArr.slice(num, 1)
    }
    switch (index) {
        case 0:
            document.getElementsByClassName('temSum')[0].style.display = 'none'
            break;
        case 1:
            document.getElementsByClassName('station')[0].style.display = 'none'
            break;
        case 2:
            document.getElementsByClassName('rain')[0].style.display = 'none'
            break;

        default:
            break;
    }

}
// 图表显示
function collapseShow1() {
    console.log(collapseArr)

    if (collapseArr.indexOf(0) != -1) {
        document.getElementsByClassName('temSum')[0].style.display = 'block'
    }
    if (collapseArr.indexOf(1) != -1) {
        document.getElementsByClassName('station')[0].style.display = 'block'
    }
    if (collapseArr.indexOf(2) != -1) {
        document.getElementsByClassName('rain')[0].style.display = 'flex'
    }
    // document.getElementsByClassName('menuLogo')[0].style.display = 'none';
}



function getposition(data) {
    Ajax('get', s + 'noi/getNOIStationDetail', {
        'devId': data
    }, function (res) {
        res = JSON.parse(res);

        var data = res.data[0]
        var saveStaionlon = data.Lon
        var saveStaionLat = data.Lat
        viewer.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(saveStaionlon, saveStaionLat, 1000000)
            // orientation : {
            //     heading: Cesium.Math.toRadians(20.0), // 方向
            //     pitch: Cesium.Math.toRadians(-90.0), // 倾斜角度
            //     roll: 0
            // }
        });

    })
}


var time = new Date();
var y = time.getFullYear();
var m = time.getMonth() + 1;
var d = time.getDate();
document.getElementById('nowTime').innerText = y + '-' + m + '-' + d
console.log(y, m, d);

//勾选框样式
