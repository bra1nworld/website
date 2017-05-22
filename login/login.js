$(document).ready(function() {
    //浮动按钮调整
    reFloatRight();

    //点击tab切换时底部位置调整
    resizeFooter("#mainTab>li", ".main-container")

    $('#mainTab>li').each(function() {
        var _this = this;
        $(_this).click(function() {
            //注册tab页面显示二维码
            if ($(_this).attr('class').indexOf('register') > -1) {
                $(".two-bar-code").show();
            } else {
                $(".two-bar-code").hide();
            };
            //浮动按钮调整
            reFloatRight();
        })
    })

    //鼠标移入移出微信公号
    $('.floatRight .wechat').mouseover(function() {
        $('.floatRight .wechat>img').show();
    })
    $('.floatRight .wechat').mouseout(function() {
        $('.floatRight .wechat>img').hide();
    })
})

//窗口调整时底部和有浮动按钮调整
$(window).resize(function() {
    setTimeout(function() {
        footerResize();
        reFloatRight();
    }, 100)
})

//浮动按钮调整
function reFloatRight() {
    if ($(".footer").css("position") == 'fixed') {
        $(".floatRight").css("margin-right", 0);
    } else {
        $(".floatRight").css("margin-right", "20px");
    }
}