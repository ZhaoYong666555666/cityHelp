//————————————————↓↓↓大图轮播↓↓↓————————————————————//
$(document).ready(function() {
	var mySwiper = new Swiper('.swiper-container', {
		direction: 'horizontal',
		loop: true,
		pagination: '.swiper-pagination',
		paginationType: 'bullets',
		speed: 200,
		paginationClickable: true,
		autoplay:4000,
	})
})
//————————————————↑↑↑大图轮播↑↑↑————————————————————//
//————————————————↓↓↓插入当前时间↓↓↓————————————————————//
var time = document.querySelector(".time");
var qianggou = document.querySelector(".qianggou");
	function showTime(){
		var date = new Date();
		var h = date.getHours();
		var m = date.getMinutes();
		var s = date.getSeconds();
		time.value = "秒杀  " + h + ":" + m + ":"  + s
		setTimeout(showTime,1000);
	}
	time.onmouseover = function(){
		time.style.display = "none";
		qianggou.style.display = "inline-block";
	}
	qianggou.onmouseout = function(){
		qianggou.style.display = "none";
		time.style.display = "inline-block";
	}
	showTime();
//————————————————↑↑↑插入当前时间↑↑↑————————————————————//
