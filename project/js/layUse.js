var layer
var form
layui.use('layer', function () { //独立版的layer无需执行这一句
    layer = layui.layer; //独立版的layer无需执行这一句
});
layui.use('form', function () {
    form = layui.form;
    // form.on('checkbox(filter)', function(data){
    //     console.log(data.elem.title); //得到checkbox原始DOM对象
    //     console.log(data.elem.checked); //是否被选中，true或者false
    //     console.log(data.value); //复选框value值，也可以通过data.elem.value得到
    //     console.log(data.othis); //得到美化后的DOM对象
    //     console.log(viewer.entities)
    //     // for (let j = 0; j < viewer.entities.values.length; j++) {
    //     //     viewer.entities.values[j].show = false
    //     // }
    //   });    
})