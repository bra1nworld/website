$(document).ready(function() {
    //兼容IE8-ie9 placeholder
    placeholderIe();


    //设置安全等级
    var process = '70%';
    $("#account .secury-level .gradient").css({
        'background': ' -webkit-linear-gradient(left, #ffdd1e ' + process + ', #00ffff)',
        'background': ' -o-linear-gradient(right, #ffdd1e ' + process + ', #00ffff)',
        'background': ' -moz-linear-gradient(right, #ffdd1e ' + process + ', #00ffff)',
        'background': ' linear-gradient(to right, #ffdd1e ' + process + ', #00ffff)'
    });
    $("#account .secury-level .progress-bar-level").width(process);

    //账户总览
    $("#account-pag").pagination({
        pageCount: 50,
        jump: true,
        coping: true,
        isHide: true,
        keepShowPN: true,
        callback: function(api) {
            console.log(api.getCurrent())
        }
    });

    //银行卡管理
    $("#bank-card ul>.addCard>a").click(function() {
        $("#bank-card .card-info").show()
    })

    $("#bank-card .card-info .cancle").click(function() {
        $("#bank-card .card-info").hide()
    })

    // 奖品管理 
    $("#prize-manage-pag").pagination({
        pageCount: 50,
        jump: true,
        coping: true,
        isHide: true,
        keepShowPN: true,
        callback: function(api) {
            console.log(api.getCurrent())
        }
    });

    //积分明细
    $("#point-detail-pag").pagination({
        pageCount: 50,
        jump: true,
        coping: true,
        isHide: true,
        keepShowPN: true,
        callback: function(api) {
            console.log(api.getCurrent())
        }
    });

    //点击tab切换时底部位置调整
    resizeFooter(".leftUl .nav-tabs>li", ".main-container", ".leftUl")

})

//兼容IE8-ie9 placeholder
function placeholderIe() {
    if (navigator.appName == "Microsoft Internet Explorer") {
        if (navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE9.0" || navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE8.0") {
            jQuery('[placeholder]').focus(function() {
                var input = jQuery(this);
                if (input.val() == input.attr('placeholder')) {
                    input.val('');
                    input.removeClass('placeholder');
                }
            }).blur(function() {
                var input = jQuery(this);
                if (input.val() == '' || input.val() == input.attr('placeholder')) {
                    input.addClass('placeholder');
                    input.val(input.attr('placeholder'));
                }
            }).blur().parents('form').submit(function() {
                jQuery(this).find('[placeholder]').each(function() {
                    var input = jQuery(this);
                    if (input.val() == input.attr('placeholder')) {
                        input.val('');
                    }
                });
            });
        }
    }
}