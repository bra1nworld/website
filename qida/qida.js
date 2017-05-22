$(document).ready(function() {
        var messTipShow = false,
            meTipShow = false;
        //消息移入移出事件
        $(".messages").mouseover(function() {
            messTipShow = true;
            $(".messTip").show();
        });

        $(".messages").mouseout(function() {
            $(".messTip").hide();
            if (messTipShow) {
                $(".messTip").mouseover(function() {
                    $(".messTip").show();
                })
                $(".messTip").mouseout(function() {
                    $(".messTip").hide();
                    messTipShow = false;
                })
            } else {
                $(".messTip").hide();
            }
        })

        //头像移入移出事件
        $(".head-pic").mouseover(function() {
            meTipShow = true;
            $(".meTip").show();
        });

        $(".head-pic").mouseout(function() {
            $(".meTip").hide();
            if (meTipShow) {
                $(".meTip").mouseover(function() {
                    $(".meTip").show();
                })
                $(".meTip").mouseout(function() {
                    $(".meTip").hide();
                    messTipShow = false;
                })
            } else {
                $(".meTip").hide();
            }
        });
    })
    //头像鼠标移入移出事件
function reMouseover() {
    var detailShow = false;
    $(' .member-pic img').mouseover(function() {
        detailShow = true;
        $(this).parent().parent().find('.memberDetial').show();
    })
    $('.member-pic img').mouseout(function() {
        var detialDiv = $(this).parent().parent().find('.memberDetial');
        detialDiv.hide();
        if (detailShow) {
            detialDiv.mouseover(function() {
                detialDiv.show();
            })
            detialDiv.mouseout(function() {
                detialDiv.hide();
                memberDetial = false;
            })
        } else {
            detialDiv.hide();
        }
    })
}