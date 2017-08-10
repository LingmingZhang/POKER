function message(data,x,y,id){
    if (data == "hand-1") {$(".hand-1").addClass("block").html("<img src=img/hand.png>").prev().remove()}
    else if (data == "hand-2") {$(".hand-2").addClass("block").html("<img src=img/hand.png>").prev().remove()}
    else if (data == "hand-3") {$(".hand-3").addClass("block").html("<img src=img/hand.png>").prev().remove()}
    else if(data.indexOf("play")>0){chupai(data)}
    else if(data.indexOf("start")>0){start(data,x,y)}//发牌
    else if(data=="1"||data=="2"||data=="3"){grab(data)}//抢地主
    else if(data.indexOf("pass")>0){pass(data)}//不出
    else if(data.indexOf("buqiang")>0){bujiao(data)}//不抢
}
