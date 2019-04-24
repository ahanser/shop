// 右键默认事件
var rightClick = document.getElementsByClassName('rightClick')[0];
var dataTypeInfo = document.getElementsByClassName('dataTypeInfo')[0];
var li = document.querySelectorAll('.rightClick li');
var evActiveObject;
var totalNum;
var pageCount;
var postDTA = { flag: 'max' };
var temFlag = 'Max';
var evItem;
//右击清除
document.onclick = function (ev) {
    ev = ev || window.event;
    ev.preventDefault ? ev.preventDefault() : ev.returnValue = false;
    rightClick.style.display = 'none';
    dataTypeInfo.style.display = 'none';
}

//循环添加右击事件
let staion_Array = ['.province', '.cityTab', '.countown', '.staion_']
for (let i = 0; i <= staion_Array.length; i++) {
    $(staion_Array[i]).on('contextmenu', 'span', function (ev) {
        ev = ev || window.event;
        //			阻止默认行为，三目，ture是高级版本浏览器，false是ie9以下的浏览器
        ev.preventDefault ? ev.preventDefault() : ev.returnValue = false;
        rightClick.style.display = 'block';

        //			clientWidth可视宽度
        //			offsetWidth从最顶部到目前点击的位置的宽度（到父级的）			
        var gapX = document.documentElement.clientWidth - rightClick.offsetWidth;
        var Left = (ev.clientX > gapX) ? gapX : ev.clientX;

        //			scrollTop代表滚动条隐藏的高度
        //			clientHeight可视高度
        //			offsetHeight从最顶部到目前点击的位置的高度
        var gapY = (document.documentElement.scrollTop + document.documentElement.clientHeight - rightClick.offsetHeight);
        var Top = ev.offsetY > gapY ? gapY : ev.offsetY;

        //			调试值
        //			console.log('clientY '+ev.offsetY)
        //			console.log(document.documentElement.scrollTop)
        //			console.log(Left)
        //			console.log(Top)
        var x = ev.pageX
        var Y = ev.pageY
        console.log(ev.target.innerText);
        evActiveObject = ev
        rightClick.style.left = x + 'px';

        rightClick.style.top = Y + 'px';
    })
}

//右键显示事件
function show() {
    // getget(1,'咸阳市')
    var areaname = evActiveObject.target.innerText;
    var type = $(evActiveObject.target).attr('data-type')
    var ids = $(evActiveObject.target).attr('ids')
    if (type == 3) {
        areaname = ids
    }
    // console.log(evActiveObject)
    currentPage = 1

    postDTA.areaType = type;
    postDTA.area = areaname;
    getget()

}
var pageNum = 1;


//气温统计数据
function getget(type, areaname, flag) {
    // var sendData = {
    //     areaType: type,
    //     area: areaname,
    //     flag:flag
    // };

    Ajax('get', s + 'feature/searchCntyStationTem', postDTA, function (res) {
        var resData = JSON.parse(res);
        if (resData.returnCode == '200') {
            console.log('---------------------');
            console.log(resData.data)

            var temDom = document.getElementsByClassName('tem_contain')[0];
            temDom.innerHTML = '';
            var Div1 = document.createElement('div');
            Div1.className = 'tem_dom';
            Div1.innerHTML = '<span>站点</span><span>温度</span>';
            temDom.appendChild(Div1)

            var pageCount = resData.data.length;
            var pageSize = 8;
            if (pageCount <= pageSize) {
                totalNum = 1
            } else {
                totalNum = parseInt(pageCount / pageSize)
            }
            for (let i = 0; i < pageSize; i++) {
                // console.log(i)
                if (resData.data.length < 8) {
                    pageSize = resData.data.length
                }
                var Div = document.createElement('div');
                Div.className = 'tem_dom';
                Div.innerHTML = '<span>' + resData.data[(currentPage - 1) * pageSize + i].Station_Name + '</span><span>' + resData.data[(currentPage - 1) * pageSize + i].TEM + '°C</span>';
                temDom.appendChild(Div)
            }

            $("#page22").paging({
                pageNum: currentPage, // 当前页面
                totalNum: totalNum, // 总页码
                totalList: pageCount, // 记录总数量
                callback: function (num) { //回调函数
                }
            });
        }
    }, function (error) {
        console.log(error);
    });


}

var tem_top = document.getElementsByClassName('tem_top')[0]
var tem_low = document.getElementsByClassName('tem_low')[0]


$('.tem_top').on('click', function () {
    $(this).addClass('factorChose').siblings().removeClass('factorChose')
    postDTA.flag = "max";
    getget()
})
$('.tem_low').on('click', function () {
    $(this).addClass('factorChose').siblings().removeClass('factorChose')
    postDTA.flag = "min";
    getget()
})


// 要素选择右键
$('.featureSelec_2').on('contextmenu', 'li', function (ev) {
    ev = ev || window.event;
    //			阻止默认行为，三目，ture是高级版本浏览器，false是ie9以下的浏览器
    ev.preventDefault ? ev.preventDefault() : ev.returnValue = false;
    dataTypeInfo.style.display = 'block';

    var x = ev.pageX
    var Y = ev.pageY
    console.log(ev.target.innerText);
    evItem = ev
    dataTypeInfo.style.left = x + 'px';
    dataTypeInfo.style.top = Y + 'px';
    item = evItem.target.innerText;
})
//要素右键菜单事件


function dataShow() {
    getStaionLat()
}
function getStaionLat() {
    // http://192.168.1.80:801/feature/getStationList?types=负氧离子
    var feature;
        switch (item) {
            case '温度':
                feature = 'TEM';
                break;
            case '雨量':
                feature = 'PRE_1h';
                break;
            case '气压':
                feature = 'PRS';
                break;
            case '风向':
                feature = 'WIN_D_Avg_10mi';
                break;
            case '风速':
                feature = 'WIN_S_Avg_10mi';
                break;
            case '相对湿度':
                feature = 'RHU';
                break;
            case '能见度':
                feature = 'VIS_HOR_10MI';
                break;
            case '土壤相对湿度(多层)':
                feature = 'SRHU';
                break;
            case '光照时长':
                feature = 'SSH';
                break;
            case '二氧化碳':
                feature = 'CO2';
                break;
            case '负氧离子':
                feature = 'NOI';
                break;
            case 'PM2.5浓度':
                feature = 'pm2_5';
                break;
            case 'PM10浓度':
                feature = 'PM10';
                break;              
            default:
                break;
        }
    var sendData = {
        feature: feature
    }
    Ajax('get', s+'feature/getStationList', sendData, function (res) {
        dataSourcesMap.forEach(function (value, key, map) {
            value.entities.removeAll();
         })
        viewer.entities.removeAll();
        saveStationMap.clear();
        idArr=[];
        res = JSON.parse(res)
        if (res.returnCode == 200) {
            // console.log(res.data)
            saveStation = res.data
            console.log(saveStation);
            
            for (let i = 0; i < res.data.length; i++) {
                addPoint(res.data[i])
                if (saveStationMap.has(saveStation[i].TYPE)) {
                    var temp = saveStationMap.get(saveStation[i].TYPE);
                    temp.push(res.data[i]);
                }
                else {
                    var arry = [];
                    arry.push(res.data[i]);
                    saveStationMap.set(saveStation[i].TYPE, arry);
                }
            }
            // console.log(viewer.entities)
        }
        $.getJSON("./json/zhuantitu.json", function (data) {
            for (var val of data) {
                addPoint(val)
                if (saveStationMap.has(val.TYPE)) {
                    var temp = saveStationMap.get(val.TYPE);
                    temp.push(val);
                }
                else {
                    var arry = [];
                    arry.push(val);
                    saveStationMap.set(val.TYPE, arry);
                }
            }
        })
    }, function (error) {
        console.log(error);
    })
   
}




