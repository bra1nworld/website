$(function() {
    $(".askTit-input").focus();
    var projects = $ { items };
    $("#stockCode").autocomplete({
            minLength: 0,
            source: projects,
            focus: function(event, ui) {
                $("#stockCode").val(ui.item.category);
                return false;
            },
            select: function(event, ui) {
                var $stockObj = $(".hiddren_t");
                var $falg = true;
                var i = 0;
                $stockObj.each(function() {
                    if (ui.item.id == $(this).val()) {
                        $falg = false;
                        return false;
                    }
                    i++;
                });
                if (i >= 5) {
                    globalTip("最多只能添加5支股票");
                    return false;
                }
                if ($falg) {
                    var html = "<li>" +
                        ui.item.category + "<span class='redClor' onclick='clos($(this));'>x</span>" +
                        "<input type='hidden' class='hiddren_t' value='" + ui.item.id + "'>" +
                        "</li>";
                    $("#addStc").append(html);
                } else {
                    globalTip("不能加入重复的股票");
                }
                return false;
            }
        })
        .data("ui-autocomplete")._renderItem = function(ul, item) {
            return $("<li>")
                .append("<a>" + "<span>" + item.category + "</span>" + "<span class='fgt'>" + item.code + "</span>" + "</a>")
                .appendTo(ul);
        };
});

function delTag(ths) {
    var $flag = ths.data("flag");
    var $id = ths.data("id");
    ths.parent().remove();
    if ($flag == 1) { // 新创建
        $.post("${ctx}/web/qida/delete.html", { id: $id }, function(data) {
            if (data.success == 0) {
                globalTip(data.message);
            }
        }, "json");
    }
}

function clos(ths) {
    ths.parent().remove();
}

function addTag(tag) {
    var $tags = $("#addTag li");
    var i = 0;
    $tags.each(function() {
        if ($id == $(this).data("id")) {
            globalTip("不能加入重复的标签");
            return false;
        }
        i++;
    });
    if (i >= 5) {
        globalTip("最多可以添加5个标签");
        return false;
    }
    var $tagName = tag.data("name");
    var $id = tag.data("id");
    var $flag = tag.data("flag");
    var html = "<li data-id='" + $id + "' data-name='" + $tagName + "' data-flag='" + $flag + "'>" + $tagName + "<span class='redClor' onclick='delTag($(this));' >x</span></li>";
    $("#addTag").append(html);
    $("input[name='tags'").val("");
    tag.remove();
}

/*点击金币出现弹框*/
$(".checkbox-txtTwo").click(function() {
    var monAct = $(this).find("span").attr("class");
    if (monAct != "payTip actv") {
        $(this).find("span").attr("class", "payTip actv");
        $(this).find("span").show();
    } else {
        $(this).find("span").attr("class", "payTip");
        $(this).find("span").hide();
    }
});

/*创建标签*/
$("#createTags").click(function() {
    var $tag = $("input[name='tags'").val();
    if (!$tag) {
        globalTip("请输入标签名称", $("input[name='tags'"));
        return false;
    } else if ($tag.length > 6 || $tag.length < 2) {
        globalTip("标签的长度是2-6个字", $("input[name='tags'"));
        return false;
    } else {
        $.post("${ctx}/web/ai/saveTag.html", { tagName: $tag }, function(data) {
            if (data.success == 1) {
                var html = "<li data-id='" + data.id + "' data-flag='" + data.flag + "'>" + $tag + "<span class='redClor' onclick='delTag($(this))'>x</span></li>";
                $("#addTag").append(html);
                $("input[name='tags'").val("");
            } else {
                globalTip(data.message);
            }
        }, "json");
    }
});

//实例化编辑器
//建议使用工厂方法getEditor创建和引用编辑器实例，如果在某个闭包下引用该编辑器，直接调用UE.getEditor('editor')就能拿到相关的实例
var ue = UE.getEditor('editor', {
    toolbars: [
        ['italic', 'underline', 'bold', 'undo']
    ],
    autoHeightEnabled: true,
    autoFloatEnabled: true,
    elementPathEnabled: false
});

$("#submitQue").click(function() {
    var $title = $(".askTit-input").val();
    var $stockObj = $(".hiddren_t");
    var $stockIds = "";
    $stockObj.each(function() {
        $stockIds += $(this).val() + ",";
    });
    var $editor = ue.getContent();
    var $imgSrc = $("#picValue1").val();
    var $isMsg = 1;
    /* var $rewardValue = 0;
    if ($("#blankCheckbox2").is(":checked")) {
    } else {
    	$rewardValue = 0;
    } */
    var $rewardValue = $(".form-control option:selected").val();
    var $tags = $("#addTag li");
    var $tagIds = "";
    $tags.each(function() {
        $tagIds += $(this).data("id") + ",";
    });
    if (isCheck($title, $tags)) {
        $.ajax({
            type: 'POST',
            url: "${ctx}/web/ai/saveQuestion.html",
            data: { 'title': $title, 'stockIds': $stockIds, 'content': $editor, 'imgSrc': $imgSrc, 'isMsg': $isMsg, 'rewardValue': $rewardValue, 'tagIds': $tagIds },
            success: function(data) {
                layer.closeAll();
                if (data.success == 0) {
                    globalTip(data.message);
                } else {
                    globalTip("已提交问题，信息审核中，请稍等！");
                    location.href = "${ctx}/web/qida/index.html";
                }
            },
            beforeSend: function() {
                layer.open({ type: 2, content: '正在保存信息，请稍等' });
            },
            dataType: "json"
        });
    }
});

function isCheck(title) {
    if (null == title || "" == title || undefined == title) {
        globalTip("请输入标题", $(".askTit-input"));
        return false;
    }
    if (title.length > 45 || title.length < 3) {
        globalTip("标题长度3-45个字", $(".askTit-input"));
        return false;
    }
    $rewardValue = $(".form-control option:selected").val();
    if ($rewardValue == 0) {
        globalTip("请选择悬赏积分", $(".form-control"));
        return false;
    }
    /*验证收到短信积分*/
    /* if($("#blankCheckbox1").is(":checked")) { // 选中
    	$.post("${ctx}/web/ai/checkMsg.html", null, function(data){
    		if (data.success == 0) { // 积分不足, 不能发送短信通知
    			$("#blankCheckbox1").removeAttr("checked");
    			globalTip("积分不足, 不能发送短信通知");
    			return false;
    		} else {
    			$("#blankCheckbox1").val(1);
    		}
    	}, "json");
    } */


    /*验证答题悬赏 */
    var $rewardValue = $(".form-control option:selected").val();
    if ($rewardValue == 0) {
        globalTip("请选择悬赏积分");
        return false;
    }
    $.post("${ctx}/web/ai/checkReward.html", { isMsg: 1, rewardValue: $rewardValue }, function(data) {
        if (data.success == 0) { // 积分不足, 不能发送短信通知
            globalTip("积分不足, 不能发送问题");
            return false;
        }
    }, "json");

    return true;
}

jQuery("#uploadImg1").uploadify({
    'uploader': '${ctx}/web/js_qiDa/uploadify-v2.1.4/uploadify.swf?random=' + (new Date()).getTime(),
    'script': '${ctx}/web/upload/img.html',
    'cancelImg': '${ctx}/web/js_qiDa/uploadify-v2.1.4/cancel.png',
    'fileDataName': 'imgFile', //相当于  file 控件的 name
    'auto': true,
    'multi': false,
    'buttonImg': '${ctx}/web/images_qiDa/xzwj_03.gif',
    'height': '28',
    'width': '82',
    'fileDesc': '能上传的图片类型:jpg,gif,bmp,jpeg,png', //出现在上传对话框中的文件类型描述
    'fileExt': '*.jpg;*.bmp;*.jpeg;*.png', //控制可上传文件的扩展名，启用本项时需同时声明fileDesc
    'sizeLimit': 1024 * 512,
    onComplete: function(event, queueID, fileObj, response, data) {
        var jsondata = eval("(" + response + ")");
        if (jsondata.error == 1) {
            Dialog.alert(jsondata.message);
            return false;
        }
        $("#picShow1").attr("src", jsondata.saveDir);
        $("#picValue1").val(jsondata.saveDir);
        $("#div1").show();
        $("#span1").html("已上传文件：" + jsondata.fileName);
    },
    'onSelect': function(event, queueID, fileObj) {
        if (fileObj.size > 5 * 1024 * 1024) {
            Dialog.alert("图片" + fileObj.name + " 应小于5M");
            jQuery("#uploadImg1").uploadifyClearQueue();
        }
    }
});

/* 验证标题*/
$(".askTit-input").keyup(function() {
    var $contentSize = $(".askTit-input").val().length;
    if ($contentSize > 45) {
        globalTip("标题长度3-45个字", $(".askTit-input"));
        return false;
    }
});

/*验证股票代码*/
$("#addStock").click(function() {
    var $stockInfo = $("input[name='stockInfo']").val();
    if ($stockInfo) {
        $.post("${ctx}/web/qida/checkStockInfo.html", { code: $stockInfo }, function(data) {
            if (data.success == 0) { // 不存在
                $("input[name='stockInfo']").val("");
                globalTip("提示您添加的股票不存在", $("input[name='stockInfo']"));
            }
        }, "json");
    }
});