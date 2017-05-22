var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
var isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器
var navHeight = $(".navList").height() / 2 * (-1);
var btnLeft = $(".navList").width();
$(document).ready(function() {
    //根据浏览器窗口高度调整页面
    resizeMain();

    //左边在线会员栏滚动条调整,初始化时需要调整css刷新一下
    if ($(".memberList ul").height() > $(".memberList").height()) {
        $(".memberList ul li").css('margin-right', '29px');
    }
    $(".memberList").perfectScrollbar();

    //navList高度无法确定，必须通过js计算来确定margin-top
    if (!($(".listBtn").css('display') == 'none')) {
        $(".navList").css('margin-top', navHeight);
        $(".listBtn").css('left', '0');
        $(".navList").hide();
    } else {
        $(".navList").css('margin-top', '-40px');
        $(".navList").show();
    }

    //在线会员按钮
    $(".listBtn").click(function() {
        if ($(".navList").css('display') == 'none') {
            scrollbar();
            $(".listBtn").css('left', btnLeft);
            $(".navList").show();

        } else {
            $(".listBtn").css('left', '0')
            $(".navList").hide();

        }

    })

    //在线会员和客服列表切换\
    var lis = $(".listTab li"),
        uls = $(".memberList ul");
    lis.each(function(i) {
        $(this).click(function() {

            if ('active'.indexOf($(this).className) >= 0) {
                return;
            } else {
                lis.removeClass('active');
                $(this).addClass('active');
                uls.hide();
                uls.eq(i).show();
            }
            $('.memberList').perfectScrollbar('update');
        })
    })



    //中奖达人滚动效果
    jQuery(".lists").slide({
        mainCell: ".prizelists ul",
        autoPlay: true,
        effect: "topMarquee",
        vis: 5,
        interTime: 50
    });


})
$(window).resize(function() {

    resizeMain();
    if (!($(".listBtn").css('display') == 'none')) {
        $(".navList").css('margin-top', navHeight);
        $(".listBtn").css('left', '0');
        $(".navList").hide();
    } else {
        $(".navList").css('margin-top', '-40px');
        $(".navList").show();

    }
});

/**
 * 自适应页面高度，以926为最小高度(360浏览器有状态栏情况下显示高度，其他浏览器默认高度高于此高度)
 * 大于等于926时不出滚动条，小于926时出滚动条
 */
function resizeMain() {
    var winHeight = window.getHeight();
    if (winHeight >= 926) {
        var top = 10 + (winHeight - 926) / 2;
        $(".main").css('height', '100%');
        $(".main").css('overflow', 'hidden');
        $(".drawExplain").css('margin-top', top);
        $(".drawList").css('margin-top', top);
        $(".commentArea").css('margin-top', top);
    } else {
        $(".footer").css({ 'position': 'relative' });
        $(".main").css('height', '');
        $(".main").css('overflow', 'auto');
    }
}

//window.innerHeight 兼容IE8
window.getHeight = function() {
    if (window.innerHeight != undefined) {
        return window.innerHeight;
    } else {
        var B = document.body,
            D = document.documentElement;
        return Math.min(D.clientHeight, B.clientHeight);
    }
}


var luck = {
    index: -1, //当前转动到哪个位置，起点位置
    count: 0, //总共有多少个位置
    timer: 0, //setTimeout的ID，用clearTimeout清除
    speed: 20, //初始转动速度
    times: 0, //转动次数
    cycle: 60, //转动基本次数：即至少需要转动多少次再进入抽奖环节
    prize: -1, //中奖位置
    init: function(id) {
        if ($("." + id).find(".prize").length > 0) {
            $luck = $("." + id);
            $units = $luck.find(".prize");
            this.obj = $luck;
            this.count = $units.length;
            $luck.find(".prize-" + this.index).addClass("active");
        };
    },


    roll: function() {
        var index = this.index;
        var count = this.count;
        var luck = this.obj;
        $(luck).find(".prize-" + index).removeClass("active");
        index += 1;
        if (index > count - 1) {
            index = 0;
        };
        $(luck).find(".prize-" + index).addClass("active");
        this.index = index;
        return false;
    },
    stop: function(index) {
        this.prize = index;
        return false;
    }
};


function roll() {
    luck.times += 1;
    luck.roll();
    if (luck.times > luck.cycle + 10 && luck.prize == luck.index) {
        clearTimeout(luck.timer);
        rollFallback(luck.prize);
        luck.prize = -1;
        luck.times = 0;
    } else {
        if (luck.times < luck.cycle) {
            luck.speed -= 10;
        } else if (luck.times == luck.cycle) {
            var index = Math.random() * (luck.count) | 0;
            luck.prize = index;
        } else {
            if (luck.times > luck.cycle + 10 && ((luck.prize == 0 && luck.index == 7) || luck.prize == luck.index + 1)) {
                luck.speed += 110;
            } else {
                luck.speed += 20;
            }
        }
        if (luck.speed < 40) {
            luck.speed = 40;
        };

        luck.timer = setTimeout(roll, luck.speed);
    }

    return false;
}


window.onload = function() {
    luck.init('draw');
    $("#prizeBtn a").click(function() {
        luck.speed = 100;
        roll();
        return false;
    });
};

function rollFallback(index) {
    var prizeName = $(".draw .prize-" + index + " span").html();
    alert("恭喜你抽中:" + prizeName);
}

function scrollbar() {
    if ($(".memberList ul").height() > $(".memberList").height()) {
        $(".memberList ul li").css('margin-right', '25px');
    }
}