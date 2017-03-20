$(function(){
	var spanArr = ["上门安装调试路由器","系统安装","笔记本除尘清灰","手机刷机","打印机维修","服务器检测"];
	$(".search span").each(function(index,value){
		$(".search span").eq(index).on("click",function(){
			$(this).css({
				"background-color":"green",
				"border-radius":5,
				"color":"white"
			}).siblings(".search span").css({
				"background-color":"",
				"border-radius":"",
				"color":""
			});
			$(".search input").eq(0).val(spanArr[index]);
		});
	});


	/*****************************跨域访问360服务器********************************/
	window.suggest = function(data){
		//输出360服务器传给我们的数据
		console.log(data);
		var searchData = data["result"];
		$(".p-list ul li").each(function(index,value){
			//将遍历好的数据写入li里面
			$(".p-list ul li").eq(index).html(searchData[index]["word"]);
			//点击相对应的li，将li的内容赋给input
			$(".p-list ul li").eq(index).on("click",function(){
				$(".p-list input").eq(0).val($(this).html());
			});
		});
	};
	//创建script
	$(".p-list input").eq(0).on("input",function(){
		var JSONP = document.createElement("script");
		JSONP.src = "http://suggest.bang.360.cn/suggest?word="+$(this).val()+"&category=7&encodein=utf-8&encodeout=utf-8&format=json&callback=window.suggest&t=0.2560207773617478";
		// JSONP.src = "http://suggest.bang.360.cn/suggest?word="+this.value+"&category=7&encodein=utf-8&encodeout=utf-8&format=json&callback=window.suggest&t=0.2560207773617478";
		$("body").eq(0).append(JSONP);
		$(".p-list ul").show();
	});
	//点击窗口，让ul消失
	$(document).on("click",function(){
		$(".p-list ul").hide();
	});


	/*******************************************************************************/
	/*****************************获得网址上的数据**********************************/
	var index = getUrlParam("index");
	var num = getUrlParam("num");
	$.ajax({
	    url: "/shop/json/"+num,
	    tpye: "GET",
	    success: function (data) {
	        var data = JSON.parse(data);
	        var obj = data["shop_data"];
	        $(".shop_ico").html("<img src="+obj[index]["shop_ico"]+">");
	        $(".shop_name").html(obj[index]["shop_name"]);
	        $(".mobile").html(obj[index]["mobile"]);
	        $(".overFlow").html("主营："+obj[index]["main"]);
	        $(".addr").html("地址："+obj[index]["addr"]);
	        $(".shop_visit").html(obj[index]["shop_visit"]);
	    }
	});
	/*********************解析网址************************/
	function getUrlParam(name) {
	    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
	    if (r != null) return unescape(r[2]); return null; //返回参数值
	}
	/******************************************************************************/
	//店铺主营部分的ajax
	$.ajax({
	    url: "/shop/json/4",
	    tpye: "GET",
	    dataType:"json",
	    success:function(data){
	        var shopData = data["product"];
	        $(shopData).each(function(index,value){
	        	$(".product_img img").eq(index).attr("src",shopData[index]["product_img"]);
		        $(".product_name").eq(index).html(shopData[index]["product_name"]);
		        $(".service_desc1").eq(index).html("服务内容：" + shopData[index]["service_desc1"]);
	        });
	    }
	});











});