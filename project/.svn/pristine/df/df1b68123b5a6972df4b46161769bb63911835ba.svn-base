// var one=document.getElementById('temp').className="factorChose"
// var two=document.getElementById('warm').className="factorChose"
// getBaseEchartsData()
// //默认选择事件
// setTimeout(() => {
//     for (let i = 0; i < saveTabName.length; i++) {
//         saveTabName[i] = 0;
//     }
//     saveTabName[0] = 1;
//     saveTabName[1] = 1;
//     saveTabName[2] = 1;
//     saveTabName[3] = 1;
//     document.getElementsByClassName('city_')[0].innerText = "陝西省"; //修改tab头部省份数据
//     document.getElementsByClassName('city_')[1].innerText = "商洛市"; //修改tab头部省份数据
//     document.getElementsByClassName('city_')[2].innerText = "商州区"; //修改tab头部省份数据
//     document.getElementsByClassName('city_')[3].innerText = "商州"; //修改tab头部省份数据
//     // 
//     var cityDom = document.getElementsByClassName("city_");
//     var containDom = document.getElementsByClassName("hide_contain");

//     for (let i = 0; i < cityDom.length; i++) {
//         cityDom[i].className = 'city_';
//         containDom[i].className = 'hide_contain';
//     }
//     console.log(11)
//     containDom[3].className = 'hide_contain show_contain staion_';
//     cityDom[3].className = 'city_ choseCity';

//     //getCity('3', "商州区");

//     var sendData = {
//         flag: 3,
//         areaName: "商州区"
//     };

//     Ajax('get', 'http://192.168.1.80:801/feature/getProvinceList', sendData, function (res) {
//         var resData = JSON.parse(res);
//         var div2
//         var citydom_ = document.getElementsByClassName("province")[0];
//         var citydom_1 = document.getElementsByClassName("cityTab")[0];
//         var citydom_2 = document.getElementsByClassName("countown")[0];
//         var citydom_3 = document.getElementsByClassName("staion_")[0];

        
//         for (let i = 0; i < resData.data.length; i++) {
            
            
//             var span1 = document.createElement('span');
//             span1.className = 'statin_Name'
//             span1.innerText = resData.data[i].Station_Name;
//             span1.setAttribute('ids', resData.data[i].Station_ID_C)
//             span1.setAttribute('lon',resData.data[i].Lon)
//             span1.setAttribute('lat',resData.data[i].Lat)
//             if (i % 5 == 0) {
//                 div2 = document.createElement("div");
//             }
//             div2.appendChild(span1);
//             if (i % 5 == 0) {
//                 citydom_3.appendChild(div2)
//             }
//         }
//         // console.log(div1)
//         // downTownListen()
//         stationListen()
//         doubleListen()
        
//         var spans = $('.station_').find('span');

//     }, function (error) {
//         console.log(error);
//     });
    
 
    
//     // span.ids='57143'

   
// }, 5000);