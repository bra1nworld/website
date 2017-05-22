// result要求添加进入 userId查询出的个人信息 积分，用户级别，粉丝数，关注数，已提供答案书，收到邀请数
// 同时result应该查询1-10条，11-20条，按此条件查询数据库，
//查询数据库时，前端会提供需要查询的条数，以及从第几条开始查询
var result = {
    array: [{
        answerNickName: "佚名",
        answerUserId: 0,
        detail: "<p>平安银行的股票怎么样?</p>",
        hhDiffer: 647,
        id: 2393,
        imgUrl: "",
        mmDiffer: 38856,
        nickName: "哈哈说好的",
        pageViews: 5,
        rank: "rank",
        replyNum: 0,
        reward: 500,
        stockQuestions: [{
            stockId: 1,
            stockName: "平安银行"
        }],
        tagQuestions: [
            { tagId: 202, tagName: "短线操作" },
            { tagId: 185, tagName: "股票" },
            { tagId: 205, tagName: "卖出时机" }
        ],

        title: "股票应该能赚钱的吧?",
        updateTime: "2017/04/05 16:53:31",
        userAvatar: "http://hhr360oss.oss-cn-hangzhou.aliyuncs.com/6968482050105458529.gif",
        userId: 5055
    }, {

        answerNickName: "佚名",
        answerUserId: 0,
        detail: "<p>45.50</p><p>基准价</p><p><br/></p><p>每0.10元为100积分</p><p><br/></p><p>琪琪赌负</p><p><br/></p><p>飘哥赌正</p><p><br/></p><p>2017年04月06日早盘收盘价结算</p><p><br/></p>",
        hhDiffer: 649,
        id: 2392,
        imgUrl: "",
        mmDiffer: 38980,
        nickName: "向阳老师",
        pageViews: 5,
        rank: "rank",
        replyNum: 0,
        reward: 500,
        stockQuestions: [],
        tagQuestions: [{ tagId: 185, tagName: "股票" }],
        title: "【美女主播琪琪私加竞猜盘】",
        updateTime: "2017/04/05 14:49:34",
        userAvatar: "http://hhr360oss.oss-cn-hangzhou.aliyuncs.com/6968482050105458529.gif",
        userId: 33348
    }]
}


$(document).ready(function() {

    reMouseover();

    //点击tab切换时底部位置调整
    resizeFooter("#question-tab>li", ".main-container", ".con-left")


    //点击查看更多
    $('.lookMore').click(function() {
        var _this = this;
        addQuestion(_this, result);
        footerResize();
        //添加问题li后刷新头像鼠标移入移出事件
        reMouseover();
    })
})



//添加问题li
function addQuestion(_this, result) {
    var ul = $(_this).parent().parent().find('.questionList'),
        lis = ul.find(li),
        num = result.array.length;
    for (var i = 0; i < num; i++) {
        var li = $("<li>" +
            "<div class='member-pic'>" +
            "<a>" +
            "<i class='rank'>" +
            "</i>" +
            "<img src=" + result.array[i].userAvatar + ">" +
            "</a>" +
            "<div class='memberDetial'>" +
            "<div class='topDetial'>" +
            "<div class='leftDetial'>" +
            "<img src=" + result.array[i].userAvatar + ">" +
            " <a class='addCare'>加关注</a>" +
            "</div>" +
            "<div class='rightDetial'>" +
            "<p class='memName'>" + result.array[i].nickName + "</p>" +
            "<p>积分：<span class='memBonus'>5000</span></p>" +
            "<p>用户级别：<span class='mem-level'>会员</span></p>" +
            "<p>粉丝数&nbsp;<span class='memFans num'>12</span>&nbsp;人&nbsp; 关注&nbsp;<span class='memCare num'>10</span>&nbsp;人</p>" +
            "<p>已提供<span class='answer-num num'>8</span>个答案，收到<span class='answer-num num'>2</span>个邀请</p>" +
            "</div>" +
            "</div>" +
            "<div class='bottomDetial'>" +
            "<span class='personal-detial'>hello</span>" +
            "</div>" +
            "</div>" +
            "</div>" +
            "<div class='question-detial'>" +

            "<div class='question-title'>" +
            "<a class='title-name' questId=" + result.array[i].id + " src=''>" + result.array[i].title + "</a><i class='mongy-icon'></i><span class='money-num'>" + result.array[i].reward + "</span>" +
            "</div>" +

            "<div class='question-view'>" +
            "<ul>" +
            "<li>" +
            "<span class='glyphicon glyphicon-comment'></span><span class='que-ans-num'>" + result.array[i].replyNum + "</span>回答" +
            "</li>" +
            "<li>" +
            "<span class='glyphicon glyphicon-eye-open'></span><span class='que-view-num'>" + result.array[i].pageViews + "</span>浏览" +
            "</li>" +
            "</ul>" +
            "</div>" +
            "<div class='answerDetial'>" +
            "<p>" + result.array[i].detail +
            "</p>" +
            "</div>" +
            "<div class='question-bottom'>" +
            "<div class='question-stock'>" +
            "<ul>" +
            "</ul>" +
            "</div>" +
            "<span><span class='glyphicon glyphicon-time'></span><span class='que-time'>" + result.array[i].updateTime + "</span></span>" +
            "</div>" +
            "</div>" +
            "</li>" +
            ")"
        );
        var tags = result.array[i].tagQuestions;
        var stock = result.array[i].stockQuestions;
        var question_stock = li.find('.question-stock>ul');
        for (var k = 0; k < stock.length; k++) {
            question_stock.append($(
                "<li ><a href = '' tagId=" + stock[k].stockId + " >" + stock[k].stockName + "</a> </li>"
            ))
        }
        li.appendTo(ul);
    }
}