var currentPage=1
; (function ($, window, document, undefined) {
    'use strict';
    function Paging(element, options) {
        this.element = element;
        this.options = {
            pageNum: options.pageNum || 1, // 当前页码
            totalNum: options.totalNum, // 总页码
            totalList: options.totalList, // 数据总记录
            callback: options.callback // 回调函数
        };
        this.init();
    }
    Paging.prototype = {
        constructor: Paging,
        init: function () {
            this.createHtml();
            this.bindEvent();
        },
        createHtml: function () {
            var me = this;
            var content = [];
            var pageNum = me.options.pageNum;
            var totalNum = me.options.totalNum;
            var totalList = me.options.totalList;
            content.push("<button type='button' id='prePage'>上一页</button>");
            // 总页数大于6必显示省略号
            if (totalNum > 6) {
                // 1、当前页码小于5且总页码大于6 省略号显示后面+总页码
                if (pageNum < 5) {
                    // 1与6主要看要显示多少个按钮 目前都显示5个
                    for (var i = 1; i < 6; i++) {
                        if (pageNum !== i) {
                            content.push("<button type='button'>" + i + "</button>");
                        } else {
                            content.push("<button type='button' class='current'>" + i + "</button>");
                        }
                    }
                    content.push(". . .");
                    content.push("<button type='button'>" + totalNum + "</button>");
                } else {
                    // 2、当前页码接近后面 到最后页码隔3个 省略号显示后面+总页面
                    if (pageNum < totalNum - 3) {
                        for (var i = pageNum - 2; i < pageNum + 3; i++) {
                            if (pageNum !== i) {
                                content.push("<button type='button'>" + i + "</button>");
                            } else {
                                content.push("<button type='button' class='current'>" + i + "</button>");
                            }
                        }
                        content.push(". . .");
                        content.push("<button type='button'>" + totalNum + "</button>");
                    } else {
                        // 3、页码至少在5，最多在【totalNum - 3】的中间位置 第一页+省略号显示前面
                        content.push("<button type='button'>" + 1 + "</button>");
                        content.push(". . .");
                        for (var i = totalNum - 4; i < totalNum + 1; i++) {
                            if (pageNum !== i) {
                                content.push("<button type='button'>" + i + "</button>");
                            } else {
                                content.push("<button type='button' class='current'>" + i + "</button>");
                            }
                        }
                    }
                }
            } else {
                // 总页数小于6
                for (var i = 1; i < totalNum + 1; i++) {
                    if (pageNum !== i) {
                        content.push("<button type='button'>" + i + "</button>");
                    } else {
                        content.push("<button type='button' class='current'>" + i + "</button>");
                    }
                }
            }
            content.push("<button type='button' id='nextPage'>下一页</button>");
            // content.push("<span class='totalNum'> 共 " + totalNum + " 页 </span>");
            // content.push("<span class='totalList'> 共 " + totalList + " 条记录 </span>");\
            me.element.html(content.join(''));

            // DOM重新生成后每次调用是否禁用button
            setTimeout(function () {
                me.dis();
            }, 20);
        },
        bindEvent: function () {
            var me = this;
            me.element.off('click', 'button');
            // 委托新生成的dom监听事件
            me.element.on('click', 'button', function () {
                var id = $(this).attr('id');
                var num = parseInt($(this).html());
                var pageNum = me.options.pageNum;
                if (id === 'prePage') {
                    if (pageNum !== 1) {
                        me.options.pageNum -= 1;
                        currentPage=me.options.pageNum
                        console.log(currentPage);                        
                        pageChange()
                    }
                } else if (id === 'nextPage') {
                    if (pageNum !== me.options.totalNum) {
                        me.options.pageNum += 1;
                        currentPage=me.options.pageNum
                        pageChange()
                    }
                }else {
                    me.options.pageNum = num;
                    currentPage = num;
                    pageChange()
                }
                me.createHtml();
                if (me.options.callback) {
                    me.options.callback(me.options.pageNum);
                }
            });
        },
        dis: function () {
            var me = this;
            var pageNum = me.options.pageNum;
            var totalNum = me.options.totalNum;
            if (pageNum === 1) {
                me.element.children('#firstPage, #prePage').prop('disabled', true);
            } else if (pageNum === totalNum) {
                me.element.children('#lastPage, #nextPage').prop('disabled', true);
            }
        }
    };
    $.fn.paging = function (options) {
        return new Paging($(this), options);
    }
})(jQuery, window, document);


function pageChange() {
    Ajax('get', s + 'feature/searchCntyStationTem', postDTA, function (res) {
        var resData = JSON.parse(res);
        if (resData.returnCode == '200') {
            var temDom = document.getElementsByClassName('tem_contain')[0];
            temDom.innerHTML = '';
            var Div1 = document.createElement('div');
            Div1.className = 'tem_dom';
            Div1.innerHTML = '<span>站点</span><span>温度</span>';
            temDom.appendChild(Div1)
            console.log(temDom)
            var pageCount = resData.data.length;
            var pageSize = 8;
            console.log(pageCount);

            if (pageCount <= pageSize) {
                totalNum = 1
            } else {
                totalNum = parseInt(pageCount / pageSize)
            }
            console.log(totalNum);

            for (let i = 0; i < 8; i++) {
                // console.log(i)
                var Div = document.createElement('div');
                Div.className = 'tem_dom';
				console.log("TCL: pageChange -> (currentPage - 1) * pageSize + i", (currentPage - 1) * pageSize + i)
                Div.innerHTML = '<span>' + resData.data[(currentPage - 1) * pageSize + i].Station_Name + '</span><span>' + resData.data[(currentPage - 1) * pageSize + i].TEM + '°C</span>';
                temDom.appendChild(Div)
            }
        }
    }, function (error) {
        console.log(error);
    });
}
