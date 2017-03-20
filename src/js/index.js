$(function(){
	$(".cutCity").on("click",function(e){
		$(".cutCity div").toggle();
	});
	$(".cutCity .btn").on("click",function(e){
		$(".cutCity div").hide();
		e.stopPropagation();
	});


//鼠标滑过轮播图右边的模块显示响应的信息
	$(".banner-left p").each(function(index,value){
		$(".banner-left p").eq(index).on("mouseenter",function(e){
			console.log(index);
			$(".ban").eq(index).show().siblings(".ban").hide();
			$(".sanJiao").css({
					"display":"block",
					"top":100*index + 43,
			});
		});
		$(".ban").on("mouseleave",function(){
			$(".ban").hide();
			$(".sanJiao").hide();
		});
	});



// 添加进入店铺
	$(".main-middle-left dl").each(function(index,value){
		$(".main-middle-left dl").eq(index).on({
			mouseenter:function(){
				$(".main-middle-left dl div").eq(index).show();
			},
			mouseleave:function(){
				$(".main-middle-left dl div").eq(index).hide();

			}
		});
	});


	var mapNum = 1;
	//初始化的ajax
	$.ajax({
		url:"/shop/json/1",//ajax发送的网址请求
		type:"GET",//请求方式
		dataType:"json",//请求文件类型
		success:function(data){//请求成功之后返回的数据
			var shopData = data["shop_data"];

			/*********************方法一，遍历数据**********************/
			$(shopData).each(function(index,value){
				//店铺名称
				$(".dianPu").eq(index).html($(shopData)[index]["shop_name"]);
				//主营项目
				$(".zhuYing").eq(index).html($(shopData)[index]["main"]);
				//店铺地址
				$(".addRess").eq(index).html($(shopData)[index]["addr_detail"] + "<span>人气：<b class='renQi'></b>次浏览</span>");
				// 人气如何
				$(".renQi").eq(index).html($(shopData)[index]["shop_visit"]);
				//改变图片
				$(".shop-img").eq(index).attr("src",$(shopData)[index]["shop_ico"]);
			});
			/******************方法二，遍历各个标签*********************/
			//店铺名称
			/*$(".dianPu").each(function(index,value){
				$(".dianPu").eq(index).html(shopData[index]["shop_name"]);
			});
			//主营项目
			$(".zhuYing").each(function(index,value){
				$(".zhuYing").eq(index).html(shopData[index]["main"]);
			});
			//店铺地址
			$(".addRess").each(function(index,value){
				$(".addRess").eq(index).html(shopData[index]["addr_detail"] + "<span>人气：<b class='renQi'></b>次浏览</span>");
			});
			// 人气如何
			$(".renQi").each(function(index,value){
				$(".renQi").eq(index).html(shopData[index]["shop_visit"]);
			});
			//改变图片
			$(".shop-img").each(function(index,value){
				$(".shop-img").eq(index).attr("src",shopData[index]["shop_ico"]);
			});*/
			$(".comeIn").each(function(index,value){
			    $(".comeIn").eq(index).on("click",function(){
			        $(".comeIn a").attr("href","http://www.zhaoyong666.com:3100/html/shop.html?index="+index+"&num=1");
			    });
			});
		}
	});
	//初始化第一个页码
	$(".main-bottom span").eq(0).css("background-color","orange");
	//点击页码
	$(".main-bottom span").each(function(index,value){
		$(".main-bottom span").eq(index).on("click",function(e){
			// console.log($(this).html());//输出页码的内容
			// console.log(typeof parseInt($(this).html()));//将页码的内容转化成number型的类型
			//获得页面的页码号
			var that = this;
			var num = parseInt($(this).html());//将页码的内容转化成整数
			mapNum = num;
			$(this).css("background-color","orange").siblings(".main-bottom span").css("background-color","");
			//发起ajax请求
			$.ajax({
				url:"/shop/json/" + num,//ajax发送的网址请求
				type:"GET",//请求方式
				dataType:"json",//请求文件类型
				success:function(data){//请求成功之后返回的数据
					console.log(data);
					if(num < 4){
						var shopData = data["shop_data"];
						$(shopData).each(function(index,value){
							//店铺名称
							$(".dianPu").eq(index).html($(shopData)[index]["shop_name"]);
							//主营项目
							$(".zhuYing").eq(index).html($(shopData)[index]["main"]);
							//店铺地址
							$(".addRess").eq(index).html($(shopData)[index]["addr_detail"] + "<span>人气：<b class='renQi'></b>次浏览</span>");
							// 人气如何
							$(".renQi").eq(index).html($(shopData)[index]["shop_visit"]);
							//改变图片
							$(".shop-img").eq(index).attr("src",$(shopData)[index]["shop_ico"]);
						});
					}else{
						var shopData = data["product"];
						$(shopData).each(function(index,value){
							$(".dianPu").eq(index).html($(shopData)[index]["product_name"]);
							$(".zhuYing").eq(index).html($(shopData)[index]["service_desc1"]);
							$(".addRess").eq(index).html($(shopData)[index]["tag_name"] + "<span>人气：<b class='renQi'></b>次浏览</span>");
							$(".renQi").eq(index).html($(shopData)[index]["shop_id"]);
							$(".shop-img").eq(index).attr("src",$(shopData)[index]["product_img"]);
						});
						
					}
				}
			});


			//点击进入店铺
			$(".comeIn").each(function(index,value){
			    $(".comeIn").eq(index).on("click",function(){
			        $(".comeIn a").attr("href","http://www.zhaoyong666.com:3100/html/shop.html?index="+index+"&num="+num);
			    });
			});


		});
	});

	//创建地图对象
    var map = new AMap.Map('map',{
        resizeEnable: true,
        zoom: 10,
        center: [116.480983, 40.0958]
    });
    //添加比例尺
    //ToolBar:集成了缩放、平移、定位等功能按钮在内的组合控件
    //Scale:展示地图在当前层级和纬度下的比例尺
    //OverView:在地图右下角显示地图的缩略图
    //Geolocation:用来获取和展示用户主机所在的经纬度位置
    //MapType:实现默认图层与卫星图、实施交通图层之间切换的控
    AMap.plugin(['AMap.ToolBar','AMap.Scale','AMap.OverView','AMap.Geolocation','AMap.MapType'],
    function(){
        map.addControl(new AMap.ToolBar());
        map.addControl(new AMap.Geolocation());
        map.addControl(new AMap.Scale());
        map.addControl(new AMap.MapType());
        map.addControl(new AMap.OverView({isOpen:true}));
	});
	/*****************点击地图按钮，显示地图*******************/
	$(".map-Btn").on("click",function(){
		$(".map-wrap").slideDown(888);
		$(".close").on("click",function(){
			$(".map-wrap").slideUp(888);
		});
		createAjax();
		//点击地图中页码
		$(".map-wrap p span").each(function(index,value){
			$(".map-wrap p span").eq(index).on("click",function(){
				$(this).css("background-color","orange").siblings(".map-wrap p span").css("background-color","");
				mapNum = parseInt($(this).html());
				createAjax();
			});
		});
		/**************************************************************/
	});

	var marker;
	function createAjax(){
		//添加地图标注
	    // console.log(mapNum);
	    $.ajax({
	    	"url":"/shop/json/" + mapNum,
	    	"type":"get",
	    	"dataType":"json",
	    	success:function(data){
	    		// console.log(mapNum);
	    		// console.log(data);
	    		var markers = data["shop_data"];
	    		console.log(markers);
			    $(markers).each(function(index,value){
			    	var map_latitude = markers[index]["map_latitude"];//维度
					var map_longitude = markers[index]["map_longitude"];//经度
					marker = new AMap.Marker({
                    	position: [map_longitude, map_latitude],
                    	map:map
                	});
                	marker.setMap(map);

                	//构建信息窗体中显示的内容,还没有实现
                	var infoWindow = new AMap.InfoWindow({
			 			offset:new AMap.Pixel(0,-30)
			 		});

	                var info = [];
	                info.push();
				    info.push("<h5 class= 'info-title'>"+markers[index]["shop_name"]+"</h5>");
				    info.push("<p class = 'info-main'>主营:"+markers[index]["main"]+"</p>");
				    info.push("<div class = 'info-addr'>地址:"+markers[index]["addr"]+"</div>");
				    info.push("<a href = '#'>进入店铺>></a>");
				    console.log(info)

	                marker.content=info.join("")  //使用默认信息窗体框样式，显示信息内容
			        marker.on('click',markerClick);
			        marker.emit('click',{target:marker});
				    map.setFitView();

				 	function markerClick(e){
				        infoWindow.setContent(e.target.content);
				        infoWindow.open(map, e.target.getPosition());
					}
				})
	    	}
	    })
	}

		


});