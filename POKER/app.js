//加载相应模块 ws
const webSocket = require("ws");
//创建ws服务器
var wss = new webSocket.Server({port:9001});
//定义广播
function broadcast(data) {
    wss.clients.forEach(function each(client) {
        if (client.readyState === webSocket.OPEN) {
            client.send(data);
        }
    });
}
//随机洗牌
function shuffle(){
    var arr=[];
    var i, j, temp;
    for(var m=0;m<54;m++){arr.push(m+1)}
    for (i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[i];arr[i] = arr[j];arr[j] = temp;
    }
    return arr;
}
//数组转字符串
function toString(arr){return arr.join("-")}
//字符串转数组
function toArr(str){return str.split("-");}
//随机生成一个数，抢地主
function random(){return parseInt(Math.random()*3+1);}

var brr=[];
var bujiao=0;

//连接触发事件
wss.on("connection",(ws)=>{
    console.log("收到一个链接请求");
    //绑定事件 message
    ws.on("message",(msg)=>{
        broadcast(msg);
        brr.push(msg);
        console.log(brr);
        if(brr.length==3){
            var obj={marker:"start",id:random(),content:shuffle()};
            broadcast(JSON.stringify(obj));
        }
        if(msg.indexOf("buqiang")>0){
            bujiao++;
            console.log(bujiao);
            if(bujiao==3){
                var obj={marker:"start",id:random(),content:shuffle()};
                broadcast(JSON.stringify(obj));
            }
        }

    });


    //6:可选项目:如果客户端发来断开连接请求,不再发消息
    ws.on("close",()=>{
        console.log("客户端断开连接");
    });
});


