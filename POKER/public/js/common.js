//定义变量
var buqi=0;

//定义函数

//数组转字符串
function toString(arr){return arr.join("-")}

//字符串转数组
function toArr(str){return str.split("-");}

var timer=0;
//倒计时器
function time() {
   clearInterval(timer);
    var i =21;
    timer = setInterval(function () {
        i--;
        $(".clock").html(i);
        if (i == 0) {
            clearInterval(timer);
        }
    }, 1000);

}


//发牌
function cards(arr){
    //清空$puke区域
    $puke.empty();
    var m=0;
    var html="";
    for(var i=0;i<arr.length;i++){
        html+=`<div data-pid="${arr[i]}" style="left:${m}px"> <img src="img/${arr[i]}.jpg"></div>`;
        m+=18;
    }
    $puke.html(html);
}
//发两侧玩家背面牌
function back(){
    var html="";
    var n=0;
    for(var i=0;i<17;i++){
        html+=`<div data-count=${i+1} style="top:${n}px"><img src="img/back.png"></div>`;
        n+=15;
    }
    $(".back").html(html);
    $(".count span").html(17);
}
//删除两侧玩家背面牌
function del(m,n){
    var $back=$(`[data-back=${m}]`);
    var $span=$(`[data-span=${m}]`);
    if(n!=1){
        aIndex=$back.find("div:last-child").data("count");
        $back.find(`div:nth-child(${aIndex-n+1})`).nextAll().remove();
        $back.find(`div:nth-child(${aIndex-n+1})`).remove();
        bIndex=parseInt($back.css("height"));
        $back.css("height",(bIndex-15*n));
        aIndex=$back.find("div:last-child").data("count");
        $span.html(aIndex);
        if(aIndex==undefined){$span.html(0)}
    }else{
        console.log(1);
        $back.find(`div:last-child`).remove();
        bIndex=parseInt($back.css("height"));
        console.log(bIndex);
        $back.css("height",bIndex-15);
        console.log(bIndex);
        aIndex=$back.find(`div:last-child`).data("count");
        $span.html(aIndex);
        if(aIndex==undefined){$span.html(0);}
    }
}


//出牌
function chupai(data){
    var obj=JSON.parse(data);
    var html = "";
    var n = 0;
    for (var i = 0; i < obj.content.length; i++) {
        html += `<div data-pid="${obj.content[i]}" style="left:${n}px"><img src="img/${obj.content[i]}.jpg"></div>`;
        n += 18;
    }
    //清除自己的icon
    $(`[data-id=${obj.id}] .icon`).removeClass("block");
    $(`[data-id=${obj.id}] .icon>div`).removeClass("block");
    //显示出牌
    $(`[data-id=${obj.id}] .cards`).addClass("block").html(html);
    //设置cards宽度
    $(`[data-id=${obj.id}] .cards`).css("width",70+(obj.content.length-1)*18);

    //出牌后显示下一玩家
    var index=null;
    obj.id==3?index=1:index=obj.id+1;
    $(`[data-id=${index}] .cards`).removeClass("block");
    $(`[data-id=${index}] .icon`).addClass("block").children().removeClass("block");
    $(`[data-id=${index}] .icon`).find(".play").addClass("block");
    $(`[data-id=${index}] .icon`).find(".clock").addClass("block");
    $(`[data-id=${index}] .icon`).find(".pass").removeClass("block");
    time();
    //删除页面背面图
    var oid=obj.id;
    var ocl=obj.content.length;
    del(oid,ocl);
}

//发牌并验证是否可以抢地主
function start(data,m,n){
    //发牌
    var obj=JSON.parse(data);
    arr = obj.content.slice(m, n);
    brr=obj.content.slice(51);
    arr.sort(function (a, b) {return a - b});
    cards(arr);
    //清除出牌区内容
    $(".clock").removeClass("block");
    $(".buqiang-1").removeClass("block");
    //显示另外两玩家背面图
    back();
    //显示剩余排数
    $(".opacity").removeClass("opacity");
    //显示最后三张牌
    $(".opacity-three").removeClass("opacity-three");
    // 清除举手图标、显示抢地主控件
    $(".hand").removeClass("block");
    $(`[data-id=${obj.id}]`).find(".isGrab").addClass("block");
    $(`[data-id=${obj.id}]`).find(".clock").addClass("block");
    time();

}

//抢地主
function grab(data){
    $(".img").html("<img src=img/good.png>");
    $(`[data-bianhao=${data}]`).html("<img src=img/bad.png>");
    $(`[data-id=${data}]`).find(".isGrab").removeClass("block");
    $(`[data-id=${data}]`).find(".play").addClass("block");
    $(`[data-id=${data}]`).find(".clock").addClass("block");
    time();
    //在别的玩家页面显示背面牌
    var html="";
    var n=0;
    for(var i=0;i<20;i++){
        html+=`<div data-count=${i+1} style="top:${n}px"><img src="img/back.png"></div>`;
        n+=15;
    }
    $(`[data-back=${data}]`).html(html);
    $(`[data-span=${data}]`).html(20);
    //改变高度
    $(`[data-back=${data}]`).css("height",371);
    //显示最后三张牌
    $(".lastThree").find("div").html("");
    var html="";
    for(var i=0;i<brr.length;i++){
        html+=`<img src="img/${brr[i]}.jpg">`;
    }
    $(".lastThree").find("div").html(html);
    //修改$puke的宽度
    $(`[data-id=${data}]`).next().find("#puke").css("width",412);
}
//不出
function pass(data){
    var obj=JSON.parse(data);
    //显示不出画面
    $(`[data-id=${obj.id}]`).find(".play").removeClass("block");
    $(`[data-id=${obj.id}]`).find(".pass").addClass("block");
    $(`[data-id=${obj.id}] .clock`).removeClass("block");

    //显示下一玩家
    var index=null;
    obj.id==3?index=1:index=obj.id+1;
    $(`[data-id=${index}] .cards`).removeClass("block");
    $(`[data-id=${index}] .icon`).addClass("block");
    $(`[data-id=${index}] .play`).addClass("block");
    $(`[data-id=${index}] .clock`).addClass("block");
    $(`[data-id=${index}] .pass`).removeClass("block");
    time();
}















//抢地主操作
$("#main-middle .qiang").click(function(){
    //发送变换头像的消息
    var bianhao=$("#main-middle .current").data("id");
    socket.send(bianhao);
    //拿到最后三张牌
    var twenty=arr.concat(brr);
    twenty.sort(function (a, b) {return a - b});
    cards(twenty);
});
//不抢地主操作
$(".buqiang").click(function(){
    var id=$(this).parent().parent().parent().data("id");
    //发送服务器
    var obj={marker:"buqiang",id:id}
    socket.send(JSON.stringify(obj));


})
function bujiao(data){
    var obj=JSON.parse(data);
    //清除当前clock、isGrab
    $(`[data-id=${obj.id}]`).find(".clock").removeClass("block");
    $(`[data-id=${obj.id}]`).find(".isGrab").removeClass("block");
    $(`[data-id=${obj.id}]`).find(".buqiang-1").addClass("block");
    //显示下一玩家
    var index=null;
    obj.id==3?index=1:index=obj.id+1;
    $(`[data-id=${index}] .cards`).removeClass("block");
    $(`[data-id=${index}] .icon`).addClass("block");
    $(`[data-id=${index}] .isGrab`).addClass("block");
    $(`[data-id=${index}] .clock`).addClass("block");
    time();
}










//单张比大小
function bigSmall(a,b){
    var i=parseInt((a+1)/4);
    switch(i){
        case 0:kaiguan(2);break;
        case 1:kaiguan(3);break;
        case 2:kaiguan(7);break;
        case 3:kaiguan(11);break;
        case 4:kaiguan(15);break;
        case 5:kaiguan(19);break;
        case 6:kaiguan(23);break;
        case 7:kaiguan(27);break;
        case 8:kaiguan(31);break;
        case 9:kaiguan(35);break;
        case 10:kaiguan(39);break;
        case 11:kaiguan(43);break;
        case 12:kaiguan(47);break;
        case 13:kaiguan(51);break;
    }
    function kaiguan(x){
        if(b<x){toggle=true}
        else{toggle=false}
    }
}



