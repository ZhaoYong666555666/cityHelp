var express = require("express");
var path = require("path");
var app = express();

app.set('port',3100);
app.use(express.static(path.join(__dirname, 'dist'))); 

var index = require("./routes/index");//寻找页面的路由
var shop = require("./routes/shop");//寻找页面的路由
var page = require("./routes/page");//寻找数据的路由
app.use("/index.html",index.index);//根据得到的请求匹配相对应的路由
app.use("/shop.html",shop.shop);
app.use("/shop/json/:pageNum",page.page);



// 定制404页面
app.use(function(req, res){ 
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
});

//定制500页面
app.use(function(err, req, res, next){ 
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');
});

app.listen(app.get("port"), function(){
     console.log( 'Express started on http://www.zhaoyong666.com:' +
        app.get("port") + '; press Ctrl-C to terminate.' );
});