//tab鼠标移入时效果切换(队列，防止极短时间内多次切换)
var Animation = {
    queue: [],
    gap: 1,
    timer: 0,
    _lock: false,
    _timeout: 0,
    duration: 250,
    lock: function() {
        var _this = this;
        _this._lock = true,
            setTimeout(function() {
                _this.unlock();
                _this.logic()
            }, _this.duration);
    },
    unlock: function() {
        this._lock = false;;
    },
    logic: function() {
        var _this = this;
        if (_this._lock) {
            return;
        } else if (_this.queue.length) {
            var lastDom = _this.queue.pop();
            lastDom.addClass('active').siblings().removeClass('active');
            _this.queue = [];
            _this.lock()
        }
    },
    push: function(e) {
        var _this = this;
        _this.queue.push(e);
        _this.logic()
    }
}

//显示搜索详情状态
var searchStatu = false;
$(document).ready(function() {
    //页脚
    footerResize();

    //当前页板块切换
    var mainTabs = $("#mainTab li");

    //在鼠标划入但未点击tab时，tab还原
    var activeIndex = $("#mainTab li").index($("#mainTab li.active"));

    mainTabs.each(function(i) {
        //鼠标点击
        $(this).click(function() {
            searchStatu = false;
            $("#mainTabContent").children().removeClass('active in');
            $("#mainTabContent").children().eq(i).addClass('active in');

            $("#mainTab li").removeClass('active searchTab');
            var curName = $(this).attr('class');
            $(this).addClass('active');
            var notActive = $("#mainTab li:not(." + curName + ") a");
            $(this).children().css('background', '#ffffff');
            notActive.eq(0).css('background', '#eaf1fb');
            notActive.eq(1).css('background', '#d6e7fe');

            activeIndex = $("#mainTab li").index($(this));

            if ($('#mainTabContent').css('display') == 'none') {
                //查询详情页面显示时
                $('#search-single-share').fadeOut(function() {
                    $('#mainTabContent').fadeIn()
                })
            }
        });

        //鼠标划入
        $(this).mouseenter(function() {
            Animation.push($(this));
        })

        //鼠标划出
        $("#mainTab").mouseleave(function() {
            if (searchStatu) {
                //查询详情页面显示时
                $("#mainTab li").removeClass('active');
            } else {
                //保证mouseenter执行完之后还原状态
                setTimeout(function() {
                    $("#mainTab li").eq(activeIndex).addClass('active').siblings().removeClass('active');
                }, 250)
            }
        })
    })

    //表格点击详情进入详情页面
    $(".table a").click(function() {
        var _this = this;
        //获取当前点击行股票代码
        var codeNum = $(_this).parents().find('.codeNum').html();
        detialFadeIn();
    })

    //搜索框搜索详情页面
    $('.search input').bind('keyup', function(e) {
        var theEvent = e || window.event;
        var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
        if (code == 13) {　
            var val = $('.search input').val;
            var preDomId = $('#mainTab>li.active').children("a").attr('href');
            var curDomId = "#search-single-share";
            detialFadeIn();
        }
    });

    //main-container高度改变时重置footer
    $(".main-container").resize(function() {
        footerResize();
    })

    /*
     *热度板块  start
     */
    if ($("#hot-left-self table>tbody>tr").length < 1) {
        $("#hot-left-self table").hide();
        $("#hot-left-self .tips>span").show();
    }
    if ($("#hot-left-his table>tbody>tr").length < 1) {
        $("#hot-left-his table").hide();
        $("#hot-left-his .tips>span").show();
    }
    //热度板块分页
    $("#hot-pagination").pagination({
        pageCount: 50,
        jump: true,
        coping: true,
        isHide: true,
        keepShowPN: true,
        callback: function(api) {
            console.log(api.getCurrent())
        }
    });
    /*
     *热度板块  end
     */

    /*
     *概念板块  start
     */
    //概念模板分页
    $("#allCon-pag").pagination({
        pageCount: 50,
        jump: true,
        coping: true,
        isHide: true,
        keepShowPN: true,
        callback: function(api) {
            console.log(api.getCurrent())
        }
    });

    //我关注的概念分页
    $("#myCon-pag").pagination({
        pageCount: 50,
        jump: true,
        coping: true,
        isHide: true,
        keepShowPN: true,
        callback: function(api) {
            console.log(api.getCurrent())
        }
    });

    //卡片点击进入详情页面
    $(".card").click(function() {
        var _this = this;
        $(_this).parent().parent().fadeOut(function() {
            $(_this).parent().parent().parent().find(".plate-detial").fadeIn();
        });
    })

    //概念模板详情分页
    $("#allCon-detial-pag").pagination({
        pageCount: 50,
        jump: true,
        coping: true,
        isHide: true,
        keepShowPN: true,
        callback: function(api) {
            console.log(api.getCurrent())
        }
    });

    //我关注概念详情分页
    $("#myCon-detial-pag").pagination({
        pageCount: 50,
        jump: true,
        coping: true,
        isHide: true,
        keepShowPN: true,
        callback: function(api) {
            console.log(api.getCurrent())
        }
    });

    /*
     *地域板块  start
     */


    //地域板块分页
    $("#allReg-pag").pagination({
        pageCount: 50,
        jump: true,
        coping: true,
        isHide: true,
        keepShowPN: true,
        callback: function(api) {
            console.log(api.getCurrent())
        }
    });

    //我关注的地域分页
    $("#myReg-pag").pagination({
        pageCount: 50,
        jump: true,
        coping: true,
        isHide: true,
        keepShowPN: true,
        callback: function(api) {
            console.log(api.getCurrent())
        }
    });

    //地域模板详情分页
    $("#allReg-detial-pag").pagination({
        pageCount: 50,
        jump: true,
        coping: true,
        isHide: true,
        keepShowPN: true,
        callback: function(api) {
            console.log(api.getCurrent())
        }
    });


    //我关注地域详情分页
    $("#myReg-detial-pag").pagination({
        pageCount: 50,
        jump: true,
        coping: true,
        isHide: true,
        keepShowPN: true,
        callback: function(api) {
            console.log(api.getCurrent())
        }
    });
    /*
     *地域板块  end
     */

    //点击地域左处tab栏隐藏详情页面
    $(".plate-detial").each(function() {
        var _this = this;
        var className = $(_this).parent().attr('id');
        $('.' + className).click(function() {
            if ($(_this).parent().attr('class').indexOf('active') > -1) {
                $(_this).fadeOut(function() {
                    $(_this).parent().find(".pane-con").fadeIn();
                });
            }
        })
    })

    /*
     *概念板块  end
     */


    //评论区滚动条，此判断为刷新dom，否则perfectScrollbar有bug
    //ie8不支持，放最后
    if ($(".comments-con .tab-pane.active").height() > $(".comments-con").height()) {
        $(".comments-con .comment-middle").width(301);
    }
    $(".comments-con").perfectScrollbar({ wheelSpeed: 0.5 });

});



/**
 * 当前contain隐藏，显示单只股票详情
 * 
 * @param {any} code 单支股票代码
 */
function detialFadeIn(code) {
    searchStatu = true;
    $('#mainTab li a').css('background', '');
    $('#mainTab li').removeClass('active').addClass('searchTab');
    $('#mainTabContent').fadeOut(function() {
        $('#search-single-share').fadeIn()
    })
}