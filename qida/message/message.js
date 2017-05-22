$(document).ready(function() {
    //热度板块分页
    $("#mes-pagination").pagination({
        pageCount: 50,
        jump: true,
        coping: true,
        isHide: true,
        keepShowPN: true,
        callback: function(api) {
            console.log(api.getCurrent())
        }
    });

    //点击关注的人按钮
    $(".mes-list .care-member>a").click(function() {
        var src = $(this).find(".mem-pic").attr('src');
        var name = $(this).find(".mem-name").html();
        $(".send-mes").find('.con-right>img').attr('src', src);
        $(".send-mes").find('.con-right .care-name').html(name);
        $(".mes-list").hide();

        $(".send-mes").show();
        footerResize();
    });

    //消息列表中点击消息内容回复消息
    $(".mes-list .con-right .message-con").click(function() {
        var single_li = $(this).parent().parent().parent();
        single_li.find(".operate").remove();
        $(".single-mes .con-right>ul").empty().append(single_li);
        $(".mes-list").hide();
        $(".single-mes").show();
        footerResize();
    });

    //回复消息页面中点击返回消息列表
    $(".single-mes .con-left>button").click(function() {
        $(".single-mes").hide();
        $(".mes-list").show();
        footerResize();
    })

    //在发送消息页面返回消息列表
    $(".send-mes .con-left>button").click(function() {
        $(".send-mes").hide();
        $(".mes-list").show();
        footerResize();
    })

})