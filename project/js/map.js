var dataMock1;
var satelliteParam;
// var url = "http://192.168.5.36:8857/tile/service/v1/tile?map=2&x={x}&y={y}&z={z}";
// new Cesium.UrlTemplateImageryProvider({url:url}),
//地图背景
var viewer = new Cesium.Viewer('cesiumContainer', {
    imageryProvider: new Cesium.UrlTemplateImageryProvider({
        url: 'http://192.168.5.36:8857/tile/service/v1/tile?map=2&x={x}&y={y}&z={z}',
    }),
    //       imageryProvider:new Cesium.SingleTileImageryProvider({
    //       url:"img/world.jpg",
    //    }),
    timeline: false,
    baseLayerPicker: false,
    fullscreenButton: false,
    infoBox: false,
    homeButton: false,
    selectionIndicator: false,
    geocoder: false,
    sceneModePicker: false,
    navigationInstructionsInitiallyVisible: false,
    navigationHelpButton: false,
    animation: false,
    // skyAtmosphere:true,

});

viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(116.435314, 39.960521, 30000000.0), // 设置位置

    orientation: {
        heading: Cesium.Math.toRadians(20.0), // 方向
        pitch: Cesium.Math.toRadians(-90.0), // 倾斜角度
        roll: 0
    }
});




// var promise = Cesium.GeoJsonDataSource.load('./json/region.json');

// promise.then(function (dataSource) {
//     viewer.dataSources.add(dataSource);
//     var entities = dataSource.entities.values;
//     var colorHash = {};
//     for (var i = 0; i < entities.length; i++) {

//         var entity = entities[i];

//         var name = entity.name;
//         var color = colorHash[name];
//         if (!color) {
//             color = Cesium.Color.fromRandom({
//                 alpha: 0.3
//             });
//             colorHash[name] = color;
//         }
//         entity.polygon.material = color;
//         entity.polygon.outline = true;
//         entity.polygon.extrudedHeight = 5000.0;
//     }
// });

// viewer.flyTo(promise);

var promise = new Cesium.GeoJsonDataSource.load(
    './json/qinglin.json', {
        stroke: Cesium.Color.BLUE.withAlpha(0.3),
        strokeWidth: 2.3,
    });
viewer.dataSources.add(promise);
// viewer.flyTo(promise);

var promise2 = new Cesium.GeoJsonDataSource.load(
    './json/shanluo.json', {
        stroke: Cesium.Color.RED.withAlpha(1),
        strokeWidth: 3,
        fill: Cesium.Color.RED.withAlpha(0)
    });

viewer.dataSources.add(promise2);
ContorlLabelShow_Hide();

function RemoveDataSource(name, bshow) {
    var len = viewer.dataSources.length;
    for (var i = 0; i < len; i++) {
        var dataSource = viewer.dataSources.get(i);
        if (dataSource._name == name) {
            dataSource.show = bshow;
        }
        // if(name=='shanluo.json'){
        //     viewer.flyTo(promise);
        // }else if(name=='qinglin.json'){
        //     viewer.flyTo(promise2);
        // }


    }

}

function ContorlLabelShow_Hide() {
    var scene = viewer.scene;
    var height = null;
    // 定义当前场景的画布元素的事件处理
    var handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    handler.setInputAction(function (wheelment) {

        height = Math.ceil(viewer.camera.positionCartographic.height);
        console.log(height)
        if (400000 > height) {
            // debugger
            RemoveDataSource('shanluo.json', true);
            RemoveDataSource('qinglin.json', false);
        } else {
            RemoveDataSource('shanluo.json', false);
            RemoveDataSource('qinglin.json', true);

        }


    }, Cesium.ScreenSpaceEventType.WHEEL);

}

var arcgisNoteLayerProvider = new Cesium.ArcGisMapServerImageryProvider({
    url: 'http://192.168.1.80:801/arcgis/rest/services/layer/qinling/MapServer'
});
//----------------------------------多图层控制
var imageryLayers = viewer.imageryLayers;
var tdtNoteLayer = imageryLayers.addImageryProvider(arcgisNoteLayerProvider); //添加注记图层
imageryLayers.raiseToTop(tdtNoteLayer); //将注记图层置顶

var idArr = [];
var saveStation = [];

var saveStationMap = new Map();
var stationSelMap = new Map();
var stationLev = new Map();
stationSelMap.set('地面站', true);
stationSelMap.set('骨干站', false);
stationSelMap.set('区域站', false);
stationSelMap.set('负氧离子', false);
stationSelMap.set('专题图', false);
stationSelMap.set('群测群防点', false);

$.getJSON("./json/Level.json", function (data) {
    console.log(data);
    for (var val of data) {
        if (!stationLev.has(val.stationType)) {
            stationLev.set(val.stationType, val);
        }
    }
})

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
function getStaionLat() {
    // http://192.168.1.80:801/feature/getStationList?types=负氧离子
    var sendData = {
        types: ['地面站', '骨干站', '区域站', '负氧离子', '群测群防点']
    }
    Ajax('get', 'http://192.168.1.80:801/feature/getStationList', sendData, function (res) {
        res = JSON.parse(res)
        if (res.returnCode == 200) {
            // console.log(res.data)
            saveStation = res.data
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
    }, function (error) {
        console.log(error);
    })
}
getStaionLat()

function addPoint(data) {
    var guid = data['guid'] = Cesium.createGuid();
    // console.log(guid)
    idArr.push(guid)
    viewer.entities.add({
        id: guid,
        name: data.TYPE,
        position: Cesium.Cartesian3.fromDegrees(data.Lon, data.Lat),
        show: data.TYPE == '地面站' ? true : false,
        //点样式
        // point: {
        //     pixelSize: 5,
        //     color: Cesium.Color.RED,
        //     outlineColor: Cesium.Color.WHITE,
        //     outlineWidth: 1
        // },
        //立广告牌
        billboard: {
            image: data.TYPE == '地面站' ? 'img/地面站.png' :
                (data.TYPE == '骨干站' ?
                    'img/骨干站.png' :
                    (data.TYPE == '区域站' ?
                        'img/qy.png' :
                        (data.TYPE == '群测群防点' ?
                            'img/qcqf.png' :
                            data.TYPE == '专题图' ? 'img/专题图.png' :
                                'img/oxygen.png'))),
            show: true, // default
            width: 25, // default: undefined
            height: 25, // default: undefined
            scaleByDistance: new Cesium.NearFarScalar(1.5e2, 2.0, 1.5e7, 0.5)
        },
        //字体标签样式
        label: {
            text: data.Station_Name,

            font: '18pt',
            color: Cesium.Color.RED,
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            outlineWidth: 1,
            //垂直位置
            //verticalOrigin : Cesium.VerticalOrigin.BUTTON,
            //中心位置
            pixelOffset: new Cesium.Cartesian2(0, 20)
        }
    });
}
// 站点选择事件
function stationClick() {


    var baseDom = document.getElementsByClassName("cmissChose")[0];
    baseDom.addEventListener('click', function (e) {
        console.log(e.target)
        for (let j = 0; j < viewer.entities.values.length; j++) {
            viewer.entities.values[j].show = false
        }
        var checkDom = document.getElementsByClassName('layui-form-checked');
        for (let i = 0; i < checkDom.length; i++) {
            console.log(checkDom[i].childNodes[0].innerText + i)
            for (let j = 0; j < viewer.entities.values.length; j++) {
                if (checkDom[i].childNodes[0].innerText == viewer.entities.values[j].name) {
                    viewer.entities.values[j].show = true
                }
            }
        }

        console.log(viewer.entities)
    })

}
stationClick()



//弹窗触发显示
var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
handler.setInputAction(function (movement) {
    var pick = viewer.scene.pick(movement.position);
    for (let i = 0; i < idArr.length; i++) {
        // debugger
        if (Cesium.defined(pick) && (pick.id._id == idArr[i])) {
            console.log(saveStation[i])
            console.log(pick)
            myWindow = document.createElement('div');
            myWindow.className = 'myWindow'
            //弹窗样式设置

            myWindow.innerHTML = `
                    <div class="address_info">
                    <p>地理位置：${saveStation[i].Province + saveStation[i].City + saveStation[i].Cnty}</p>
                    <p>站点类型：${saveStation[i].TYPE}</p>
                    <p>站点ID：${saveStation[i].Station_Id_C}</p>
                    <p>经度：${saveStation[i].Lon}</p>
                    <p>纬度：${saveStation[i].Lat}</p>
                    <p>时间: ${saveStation[i].Datetime}</p>
                    <p>温度：${saveStation[i].TEM}</p>
                    <p>10分钟平均水平能见度：${saveStation[i].VIS_HOR_10MI}</p>
                    <p>过去一小时降水量：${saveStation[i].PRE_1h}</p>
                    <p>相对湿度：${saveStation[i].RHU}</p>
                    <p>气压：${(saveStation[i].PRS == null ? '暂无数据' : saveStation[i].PRS)}</p>
                    <p>10分钟平均风向：${(saveStation[i].WIN_D_Avg_10mi == null ? '暂无数据' : saveStation[i].WIN_D_Avg_10mi)}</p>
                    <p>10分钟平均风速：${(saveStation[i].WIN_S_Avg_10mi == null ? '暂无数据' : saveStation[i].WIN_S_Avg_10mi)}</p>
                    <p>负氧离子：${(saveStation[i].NOI == null ? '暂无数据' : saveStation[i].NOI)}</p>
                    <p>二氧化碳：${(saveStation[i].CO2 == null ? '暂无数据' : saveStation[i].CO2)}</p>
                    <p>PM25：${(saveStation[i].PM25 == null ? '暂无数据' : saveStation[i].PM25)}</p>
                    </div>`;
            //专题图 切换成轮播图
            if (pick.id._name == '专题图') {
                myWindow.innerHTML = ''
                var text = ''
                text += '<div class="swiper-container">'
                text += '<div class="swiper-wrapper box">'
                var obj = saveStationMap.get("专题图");
                for (var item of obj) {
                    if (item.guid == pick.id._id) {
                        for (let i = 1; i <= item.count; i++) {
                            str = item.path + i + ".jpg"
                            text += '<div class="swiper-slide swiper-lazy"> <img src="' + str + '" alt=""></div>'
                        }
                    }
                }
                text += '</div>'
                text += '<div class="swiper-button-prev swiper-button-white"></div>'
                text += '<div class="swiper-button-next swiper-button-white"></div>'
                text += '</div>'
                // myWindow.innerHTML=`<div class="swiper-container">
                //     <div class="swiper-wrapper box">
                //         <div class="swiper-slide swiper-lazy"> <img src="" alt=""></div>
                //         <div class="swiper-slide swiper-lazy">slider2</div>
                //         <div class="swiper-slide swiper-lazy">slider3</div>

                //     </div>
                //     <div class="swiper-button-prev swiper-button-white"></div>
                //     <div class="swiper-button-next swiper-button-white"></div>
                // </div>`;


                //swipe 初始化
                function getswipe() {
                    var mySwiper = new Swiper('.swiper-container', {
                        prevButton: '.swiper-button-prev',
                        nextButton: '.swiper-button-next',
                        observer: true,
                        observeParents: true,
                        loop: true,
                        autoplayDisableOnInteraction: false,

                        autoplay: 1000,//可选选项，自动滑动
                    })
                }
            }

            myWindow.style.position = 'absolute';
            myWindow.style.left = movement.position.x - 5 * 16 + 'px';
            myWindow.style.top = movement.position.y - 5 * 16 + 'px';
            document.getElementsByTagName('body')[0].appendChild(myWindow);
            $('.myWindow').html(text);
            $(".myWindow img").css("width", "100%").css("height", "100%")

            getswipe();
            // $(".myWindow").mousedown(function(e){
            //     $(document).bind("mousemove",function(e){
            //         $(".myWindow").css("left",e.pageX).css("top",e.pageY)
            //     });
            // })
            //     $(".myWindow").mouseup(function(){
            //         $(document).unbind("mousemove")
            //     })
            var dv = document.getElementsByClassName('myWindow')[0];

            var x = 0;
            var y = 0;
            var l = 0;
            var t = 0;
            var isDown = false;
            //鼠标按下事件
            dv.onmousedown = function (e) {
                //获取x坐标和y坐标
                x = e.clientX;
                y = e.clientY;
             
                
                //获取左部和顶部的偏移量
                l = dv.offsetLeft;
                t = dv.offsetTop;
                //开关打开
                isDown = true;
                //设置样式  
                dv.style.cursor = 'move';
            }
            //鼠标移动
            dv.onmousemove = function (e) {
                if (isDown == false) {
                    return;
                }
                //获取x和y
                var nx = e.clientX;
                var ny = e.clientY;
                //计算移动后的左偏移量和顶部的偏移量
                var nl = nx - (x - l);
                var nt = ny - (y - t);

                dv.style.left = nl + 'px';
                dv.style.top = nt + 'px';
            }
            //鼠标抬起事件
            dv.onmouseup = function () {
                //开关关闭
                isDown = false;
                dv.style.cursor = 'default';
            }
            break;


            // myWindow = window.open('', '', 'width=200,height=100');
            // myWindow.document.write("<p>This is 'myWindow'</p >");
            // myWindow.moveTo(movement.position.x, movement.position.y);
        } else {
            var window = document.getElementsByClassName('myWindow');
            for (let i = 0; i < window.length; i++) {
                document.getElementsByTagName('body')[0].removeChild(window[i])
            }
        }
    }




}, Cesium.ScreenSpaceEventType.LEFT_CLICK);


function ReturnBumber(height, lev) {
    if (0 < height && height <= lev.high[0]) {
        return 0
    }
    if (lev.high[0] < height && height <= lev.high[1]) {
        return 1
    }
    if (lev.high[1] < height && height <= lev.high[2]) {
        return 2
    }
    if (lev.high[2] < height && height <= lev.high[3]) {
        return 3
    }
    if (lev.high[3] < height && height <= lev.high[4]) {
        return 4
    }
    if (lev.high[4] < height && height <= lev.high[5]) {
        return 5
    }
    if (lev.high[5] < height) {
        return 5
    }
}


handler.setInputAction(function (movement) {
    // console.log(viewer.entities)
    // for(let i=0;i<viewer.entities.values.length;i++){
    //     CalDistance(viewer.entities.values[i])
    // }

    height = Math.ceil(viewer.camera.positionCartographic.height);

    for (var temp of stationSelMap) {
        if (temp[1] == true) {
            var seldata = saveStationMap.get(temp[0]);
            var lev = stationLev.get(temp[0]);
            if (lev != null && lev != undefined)
                var num = ReturnBumber(height, lev)
            // console.log(num)
            if (seldata != null && seldata != undefined) {
                seldata.forEach(function (element, index, array) {
                    if (index != undefined) {

                        CalDistance(element, index, num, lev);
                    }
                });
            }

        }
    }


}, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

function CalDistance(item, index, num, lev) {

    var result = viewer.camera.pickEllipsoid(new Cesium.Cartesian2(viewer.canvas.clientWidth / 2, viewer.canvas.clientHeight / 2));
    var curPosition = Cesium.Ellipsoid.WGS84.cartesianToCartographic(result);
    var cartesian = viewer.scene.globe.ellipsoid.cartographicToCartesian(curPosition);
    var lon = curPosition.longitude * 180 / Math.PI;
    var lat = curPosition.latitude * 180 / Math.PI;
    var ellipsoid = viewer.scene.globe.ellipsoid;
    Cesium.Cartesian3.fromDegrees(item.Lon, item.Lat, 0, ellipsoid, result);



    var cartographic = Cesium.Cartographic.fromDegrees(item.Lon, item.Lat, 0);
    var cartesian3 = ellipsoid.cartographicToCartesian(cartographic);


    height = Math.ceil(viewer.camera.positionCartographic.height);
    var dis = Cesium.Cartesian3.distance(cartesian, cartesian3);
    var obj = viewer.entities.getById(item.guid);
    var number = lev.number[num]
    if (index <= number) {
        if (dis < lev.dis[num])//(clon<5 && clat<5)
        {
            obj.show = true;
        }
        else
            obj.show = false;
    } else {
        obj.show = false;
    }


}