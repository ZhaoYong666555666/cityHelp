//var arr = [[0,0],["-100px",0],["-200px",0],["-300px",0],["-400px",0],["-500px",0]]
var arr = ["0 0","-100px 0","-200px 0","-300px 0","-400px 0","-500px 0"]
var arr1 = ["0 -100px","-100px -100px","-200px -100px","-300px -100px","-400px -100px","-500px -100px"]
console.log(arr)
for(var i = 0;i<arr.length;i++){
	arr[i].index = i;
	$(".bgs").eq(i).css({
		"background-image":"url(../images/电脑维修/t01a5ee140324e29932.png)",
		"background-repeat":"no-repeat",
		//"background-position":arr[i][0] + " " + arr[i][1],
		"background-position":arr[i]
	});
}



$("#type dl").on("mouseover",function(){
	var id = $(this).find('dt').attr("id");
	$(this).find('dt').css({
		"background-position":arr1[id]
	});
});
$("#type dl").on("mouseout",function(){
	var id = $(this).find('dt').attr("id");
	$(this).find('dt').css({
		"background-position":arr[id]
	});
});


//滑过进入商铺

$(".bottom dl").each(function(index,value){
	$(this).on("mouseover",function(){
		$(".bottom dl div").eq(index).show().siblings("div").hide();
	})
	$(this).on("mouseout",function(){
		$(".bottom dl div").eq(index).hide().siblings("div").show();
	})
})



//点击页
var num = 1
 ajaxdata(num)
 ajaxditu(num)
$(".page span").each(function(index,value){
	 $(".page span").eq(index).on("click",function(){
	 $(this).css("background","orange").siblings('span').css("background","")
	 num = $(this).html()
	  //发起ajax请求
	  map.setFitView("");
	 ajaxdata(num)
	 ajaxditu(num)
	 })
	
})
//请求ajax
function ajaxdata(num){

	$.ajax({
	 	"url":"/a/json/"+num,
	 	"type":"GET",
	 	"dataType":"json",
		 	success:function(data)
		 	{
		 		//console.log(data)
		 		var valueArr = data["shop_data"];
		 		//console.log(valueArr);
		 		
			 		$(valueArr).each(function(index,value)
			 		{
			 			$("h5").eq(index).html($(valueArr)[index]["shop_name"])
			 			$(".p1").eq(index).html("主营:"+$(valueArr)[index]["main"])
			 			$(".p2").eq(index).html("地址:"+$(valueArr)[index]["addr"])
			 			$(".bottom dt img").eq(index).attr("src",$(valueArr)[index]["shop_ico"])
			 		})
		 			

		 	}

	   })
}



//点击地图出现 地图

$("#ditu").on("click",function(){
	$("#meng").show(1000);
	ajaxditu(num)
})

$("#close").on("click",function(){
	$("#meng").hide(1000);
})


  //创建地图
    var map = new AMap.Map('container', {
        resizeEnable:true,//可变尺度
        zoom:11,//地图详细倍数
        center:[116.397428, 39.90923], //经纬
         
    })
      //map.clearMap();
	//地图样式
	AMap.plugin(['AMap.ToolBar','AMap.Scale','AMap.OverView'],
    function(){
        map.addControl(new AMap.ToolBar());//工具条

        map.addControl(new AMap.Scale());//比例尺

        map.addControl(new AMap.OverView({isOpen:true}));//鹰眼
    });    


function ajaxditu(num){
	$.ajax({
	 	"url":"/a/json/"+num,
	 	"type":"GET",
	 	"dataType":"json",
		 success:function(data)
		 {
		 	var mapArr = data["shop_data"];
		 	//console.log(data)
			
		    //信息窗口
			 var infoWindow = new AMap.InfoWindow({
			 	offset:new AMap.Pixel(0,-30)
			 	//content:info.join("<br>")

			 });
		 	$(mapArr).each(function(index,value)
			 {
			 	//map.cleanOverlays()
			 	//marker.remove()
			 	//map.remove(marker);// marker[i].serMap(null);
			 	var jingdu = mapArr[index]["map_longitude"];
			 	var weidu = mapArr[index]["map_latitude"];
			 	
                var info = [];
			   info.push("<h5 class= 'info-title'>"+mapArr[index]["shop_name"]+"</h5>");
			   info.push("<p class = 'info-main'>主营:"+mapArr[index]["main"]+"</p>");
			   info.push("<div class = 'info-addr'>地址:"+mapArr[index]["addr"]+"</div>");
			   info.push("<a>进入店铺>></a>");
			   console.log(info)
			    //大头针
                var marker = new AMap.Marker({
                    position:[jingdu,weidu],
			        map:map,
                });
                //marker.content='我是第'+(index+1)+'个Marker';
                marker.content=info.join("")  //使用默认信息窗体框样式，显示信息内容
		        marker.on('click',markerClick);
		        marker.emit('click',{target:marker});
			    map.setFitView();
			})
		 	 function markerClick(e){
		        infoWindow.setContent(e.target.content);
		        infoWindow.open(map, e.target.getPosition());
			    }
			
		   // map.setFitView();

		 }
	})
}



//获得店铺超链接
$(".shangpu").each(function(index,value){
    $(".shangpu").eq(index).on("click",function(){
        $(".shangpu a").attr("href","http://172.18.32.16:3110/shop.html/?index="+index+"&num="+num);
    });
});
//地图
$("#container").each(function(index,value){
    $("container").eq(index).on("click",function(){
        $("container a").attr("href","http://172.18.32.16:3110/shop.html/?index="+index+"&num="+num);
    });
});