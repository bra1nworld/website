// 非window的dom resize方法
(function($, window, undefined) {
    var elems = $([]),
        jq_resize = $.resize = $.extend($.resize, {}),
        timeout_id,
        str_setTimeout = 'setTimeout',
        str_resize = 'resize',
        str_data = str_resize + '-special-event',
        str_delay = 'delay',
        str_throttle = 'throttleWindow';
    jq_resize[str_delay] = 250;
    jq_resize[str_throttle] = true;
    $.event.special[str_resize] = {
        setup: function() {
            if (!jq_resize[str_throttle] && this[str_setTimeout]) {
                return false;
            }
            var elem = $(this);
            elems = elems.add(elem);
            $.data(this, str_data, {
                w: elem.width(),
                h: elem.height()
            });
            if (elems.length === 1) {
                loopy();
            }
        },
        teardown: function() {
            if (!jq_resize[str_throttle] && this[str_setTimeout]) {
                return false;
            }
            var elem = $(this);
            elems = elems.not(elem);
            elem.removeData(str_data);
            if (!elems.length) {
                clearTimeout(timeout_id);
            }
        },
        add: function(handleObj) {
            if (!jq_resize[str_throttle] && this[str_setTimeout]) {
                return false;
            }
            var old_handler;

            function new_handler(e, w, h) {
                var elem = $(this),
                    data = $.data(this, str_data);
                data.w = w !== undefined ? w : elem.width();
                data.h = h !== undefined ? h : elem.height();
                old_handler.apply(this, arguments);
            }
            if ($.isFunction(handleObj)) {
                old_handler = handleObj;
                return new_handler;
            } else {
                old_handler = handleObj.handler;
                handleObj.handler = new_handler;
            }
        }
    };

    function loopy() {
        timeout_id = window[str_setTimeout](function() {
            elems.each(function() {
                var elem = $(this),
                    width = elem.width(),
                    height = elem.height(),
                    data = $.data(this, str_data);
                if (width !== data.w || height !== data.h) {
                    elem.trigger(str_resize, [data.w = width, data.h = height]);
                }
            });
            loopy();
        }, jq_resize[str_delay]);
    }
})(jQuery, this);




footerResize();
//判断footer是否在底部
function footerResize() {
    $(".footer").css("position", "");
    var winHeight = $(window).height();
    //加上border为1
    var footHeight = $(".footer").height() + 1;
    var footerTop = $(".footer").offset().top;
    if (winHeight - footHeight > footerTop) {
        $(".footer").css("position", "fixed");
        $(".footer").css("bottom", "0");
    }
}
//窗口调整时底部和有浮动按钮调整
$(window).resize(function() {
    setTimeout(function() {
        footerResize();
    }, 100)
})


/**
 * tab也点击切换时footer位置重置
 * 
 * @param {any} liId           点击tab>li  id
 * @param {any} otherDomId     除content外其他能撑起container高度的domId
 * @param {any} containerId    container Id
 * @param {any} content_otherH tab-content切换时，content中有独有的dom高度
 */
function resizeFooter(liId, containerId, otherDomId, content_otherH) {
    //对于footer的调整只能有click事件实时调整，
    //footerResize()函数只能在刚开始加载的时候使用，或者页面刷新window.resize()的时候使用
    $(liId).each(function() {
        var _this = this;
        $(_this).click(function() {

            //点击的时候当前处于actvie状态时的div
            var preDomId = $(liId + '.active').children("a").attr('href');
            var offsetTop = $(preDomId).offset().top;

            //处于actvie状态时的div底部距离浏览器顶部距离
            var preDomDis = getBottomDis(preDomId);

            //除tab对应的content的高度能撑起container高度外，其他高度最高的能撑起container的高度的dom
            //当content为0时，该dom撑起container高度
            var otherDomDis = getBottomDis(otherDomId) || 0;
            var otherFinallyDis = otherDomDis + getBottomHei(containerId);

            //当前main-container底部距离浏览器顶部距离
            var containerDis = getBottomDis(containerId);

            //tab页对应的content内容部分底部距离container的底部距离
            //content_otherH 指当content中底部有其他固定dom时的高度，且该高度otherdom没有
            var content_otherH = content_otherH || 0;
            var contentLessH = otherDomDis > preDomDis ? containerDis - otherDomDis + content_otherH : containerDis - preDomDis;

            //点击的目标div,由于处于display:none只能获得height
            var curDomId = $(_this).children("a").attr('href');
            var height = turnNumber($(curDomId).css('height'));
            var curDomBotH = getBottomHei(curDomId);
            var curDomTopH = getTopHei(curDomId);

            //当前dom底部距离浏览器顶部距离
            //由于offset是predom的offset，其中包括margin-top,所以要减去。
            var curDomDis = offsetTop - turnNumber($(preDomId).css('margin-top')) + height + curDomBotH + curDomTopH;

            //当前dom点击之后对应的content的最终高度
            var curFinallyH = curDomDis + contentLessH;

            //窗口高度
            var winHeight = $(window).height();
            //底部高度加上border为1
            var footHeight = $(".footer").height() + 1;

            //最终高度，取最大值
            var finallyHeight = curFinallyH >= otherFinallyDis ? curFinallyH : otherFinallyDis;

            if (footHeight + finallyHeight >= winHeight) {
                $(".footer").css("position", "");
            } else {
                $(".footer").css("position", "fixed");
                $(".footer").css("bottom", "0");
            }
        })
    })
}

function turnNumber(str) {
    var num = str.substring(0, str.length - 2) * 1;
    return num
};
//获取dom底部距离浏览器顶部的距离
function getBottomDis(domId) {
    if (domId) {
        var domH = $(domId).outerHeight(true),
            offsetT = $(domId).offset().top,
            //offsetTop包含了margin-top
            mar_topH = turnNumber($(domId).css('margin-top'));
        return domH + offsetT - mar_topH;
    } else {
        return 0;
    }

}
//获取dom底部高度（包括border，margin，padding）
function getBottomHei(domId) {
    var borderH = turnNumber($(domId).css('border-bottom-width')),
        mar_bottomH = turnNumber($(domId).css('margin-bottom')),
        pad_bottomH = turnNumber($(domId).css('padding-bottom'));
    return borderH + mar_bottomH + pad_bottomH;
}

//获取dom顶部高度（包括border，margin，padding）
function getTopHei(domId) {
    var borderTopH = turnNumber($(domId).css('border-top-width')),
        pad_topmH = turnNumber($(domId).css('padding-top'));
    mar_topmH = turnNumber($(domId).css('padding-top'));
    return borderTopH + pad_topmH + mar_topmH;
}