// function InitChart(val, value) {
// 基于准备好的dom，初始化echarts图表   

var myChart1 = echarts.init(document.getElementById('rain_echart'));
var option1 = {

    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    legend: {
        data: ['雨量','气压','温度','风向','风速','相对湿度','能见度'],
        type: 'scroll',
      
        right: 10,
        top: 20,
        bottom: 20,
        textStyle: {
            color: 'white'
        },
        x:'left'
    },
    

    grid: {
        left: '3%',
        right: '12%',
        bottom: '3%',
        top: '6%',
        containLabel: true
    },
    xAxis: [{
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        axisLabel: {
            textStyle: {
                color: '#ccc', //坐标值得具体的颜色

            }
        },

    }],
    yAxis: [{
        type: 'value',
        nameTextStyle: {
            color: '#ccc',
        },
        
        axisLabel: {
            textStyle: {
                color: '#ccc', //坐标值得具体的颜色

            }
        },
        axisLine: {
            lineStyle: {
                color: '#162037'
            }
        },
        splitLine: {
            lineStyle: {
                color: '#162037'
            }
        }
    },{
        type: 'value',
        nameTextStyle: {
            color: 'orange',
        },
        
        axisLabel: {
            textStyle: {
                color: '#ff3040', //坐标值得具体的颜色

            }
        },
        axisLine: {
            lineStyle: {
                color: '#162037'
            }
        },
        splitLine: {
            lineStyle: {
                color: '#162037'
            }
        }
    }],
        // {
        //     data: [10, 0, 50, 100, 70, 0, 20],
            
        //     type: 'line',
        //     axisLabel: {
        //         textStyle: {
        //             color: '#ccc', //坐标值得具体的颜色
    
        //         }
        //     },
        // },

        // {
        //     data: [100, 1000, 500, 1000, 700, 0, 200],
        //     yAxisIndex: 1,
        //     type: 'line',
        //     axisLabel: {
        //         textStyle: {
        //             color: '#ff3040', //坐标值得具体的颜色
    
        //         }
        //     },
        // }
     
    
};
myChart1.setOption(option1);

var myChart2 = echarts.init(document.getElementById('oxygenEcharts'));
var option2 = {
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '8%',
        containLabel: true
    },
    color: ['#3398DB'],
    tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    xAxis: [{
        type: 'category',
        data: ['温度',  '气压', '风向','风速','相对湿度','PM2.5','PM10','负氧离子','二氧化碳'],
        axisLabel: {
            textStyle: {
                color: '#ccc', //坐标值得具体的颜色

            }
        },
        axisLine: {
            lineStyle: {
                color: '#0A4679'
            }
        },
        axisTick: {
            alignWithLabel: true
        }
    }],
    yAxis: [{
        type: 'value',
        axisLabel: {
            textStyle: {
                color: '#ccc', //坐标值得具体的颜色

            }
        },
        axisLine: {
            lineStyle: {
                color: '#0A4679'
            }
        },
        splitLine: {
            lineStyle: {
                color: '#162037'
            }
        }
    }],
    series: [{
        name: '数值',
        type: 'bar',
        barWidth: '60%',
        data: [10, 52, 200, 334, 390, 330, 220,110,110]
    }]
};

myChart2.setOption(option2);




window.onresize = function () {
    myChart1.resize();
    myChart2.resize();

}
// }

// InitChart()