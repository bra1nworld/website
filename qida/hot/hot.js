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

//实时播报
//var ontime_object = { array: [{ 'content': '123324345', 'createTime': '17:12', 'id': 9 }, { 'content': '123', 'createTime': '14:12', 'id': 2 }, { 'content': '6849', 'createTime': '13:12', 'id': 3 }, { 'content': '9847914', 'createTime': '16:12', 'id': 4 }, { 'content': '9794651', 'createTime': '17:55', 'id': 5 }, { 'content': '147582', 'createTime': '17:15', 'id': 6 }, { 'content': 'ytu', 'createTime': '18:01', 'id': 7 }, { 'content': '786752', 'createTime': '18:12', 'id': 8 }, { 'content': '986514', 'createTime': '18:32', 'id': 9 }, { 'content': '3656', 'createTime': '18:55', 'id': 10 }, ] }
$(document).ready(function() {

    reMouseover();

    //实时预测动态滚动效果
    slide('.realTime-ul');

    $('.questionArea .lookMore').click(function() {
        addQuestion(result);

        footerResize();
        //添加问题li后刷新头像鼠标移入移出事件
        reMouseover();
    });
})

//添加问题li
function addQuestion(result) {
    var ul = $('.questionList'),
        lis = $('.questionList>li'),
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
            "<div class='questioner'>" +
            "<span class='memName'>" + result.array[i].nickName + "</span>&nbsp;提问了" +
            "</div>" +
            "<div class='question-title'>" +
            "<a class='title-name' questId=" + result.array[i].id + " src=''>" + result.array[i].title + "</a><i class='mongy-icon'></i><span class='money-num'>" + result.array[i].reward + "</span>" +
            "</div>" +
            "<div class='question-tags'>" +
            "<ul>" +
            "</ul>" +
            "</div>" +
            "<div class='question-stock'>" +
            "<ul>" +
            "</ul>" +
            "</div>" +
            "<div class='question-bottom'>" +
            "<ul>" +
            "<li>" +
            "<span class='glyphicon glyphicon-comment'></span><span class='que-ans-num'>" + result.array[i].replyNum + "</span>回答" +
            "</li>" +
            "<li>" +
            "<span class='glyphicon glyphicon-eye-open'></span><span class='que-view-num'>" + result.array[i].pageViews + "</span>浏览" +
            "</li>" +
            "<li>" +
            "<span class='glyphicon glyphicon-time'></span><span class='que-time'>" + result.array[i].updateTime + "</span>" +
            "</li>" +
            "</ul>" +
            "</div>" +
            "</div>" +
            "</li>" +
            ")"
        );
        var tags = result.array[i].tagQuestions;
        var stock = result.array[i].stockQuestions;
        var question_tags = li.find('.question-tags>ul');
        var question_stock = li.find('.question-stock>ul');
        for (var j = 0; j < tags.length; j++) {
            question_tags.append($(
                "<li ><a href = '' tagId=" + tags[j].tagId + " >" + tags[j].tagName + "</a> </li>"
            ))
        }
        for (var k = 0; k < stock.length; k++) {
            question_stock.append($(
                "<li ><a href = '' tagId=" + stock[k].stockId + " >" + stock[k].stockName + "</a> </li>"
            ))
        }
        li.appendTo(ul);
    }
}

/**
 * 实时播报，向上滚动
 */
function slide(moutag) {
    var $this = $(moutag);
    var scrollTimer;
    $this.hover(function() {
        clearInterval(scrollTimer);
    }, function() {
        scrollTimer = setInterval(function() { scrollNews($this); }, 5000);
    }).trigger("mouseout");
}

function scrollNews(obj) {
    var self = obj.find("ul:first");
    var Lheight = self.find("li:first").height();
    self.animate({ "margin-top": -Lheight + "px" }, 'slow', function() {
        self.css({ "margin-top": "0px" }).find("li:first").appendTo(self);
    })
}