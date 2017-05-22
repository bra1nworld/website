$(document).ready(function() {
    //点击外层li
    $('.aboutUs-father').click(function() {
        $('.aboutUs-child').toggle();
    })

    //点击tab切换时底部位置调整
    resizeFooter(".leftUl .finally", ".main-container", ".leftUl>ul")

    //切换帮助中心中的li时底部位置调整,闪动不是很明显，暂时不做处理
    $("#help").resize(function() {
        footerResize();
    })

    //帮助中心点击切换
    $("#help .panel-heading .panel-title").each(function() {
        var _this = this;
        $(_this).click(function() {
            var span = $(_this).children().find('.glyphicon');
            if ($(_this).parent().parent().find('.panel-collapse.in').length > 0) {
                span.removeClass().addClass('glyphicon glyphicon-menu-down')
            } else {
                $("#help .panel-heading .glyphicon").removeClass().addClass('glyphicon glyphicon-menu-down');
                span.removeClass().addClass('glyphicon glyphicon-menu-up')
            }
        })
    });
});