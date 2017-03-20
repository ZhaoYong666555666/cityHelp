$(function(){
	$(".main-bottom div").eq(0).show();
	$(".main-top dl").each(function(index){
		$(".main-top dl").eq(index).on({
			mouseenter:function(){
				$(".slider").css({
					"left":134*(index+1) - 90,
				})
				$(".main-bottom div").eq(index).show().siblings(".main-bottom div").hide();
			}
		})
	})






});