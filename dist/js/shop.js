$(function(){function t(t){var o=new RegExp("(^|&)"+t+"=([^&]*)(&|$)"),s=window.location.search.substr(1).match(o);return null!=s?unescape(s[2]):null}var o=["上门安装调试路由器","系统安装","笔记本除尘清灰","手机刷机","打印机维修","服务器检测"];$(".search span").each(function(t,s){$(".search span").eq(t).on("click",function(){$(this).css({"background-color":"green","border-radius":5,color:"white"}).siblings(".search span").css({"background-color":"","border-radius":"",color:""}),$(".search input").eq(0).val(o[t])})}),window.suggest=function(t){console.log(t);var o=t.result;$(".p-list ul li").each(function(t,s){$(".p-list ul li").eq(t).html(o[t].word),$(".p-list ul li").eq(t).on("click",function(){$(".p-list input").eq(0).val($(this).html())})})},$(".p-list input").eq(0).on("input",function(){var t=document.createElement("script");t.src="http://suggest.bang.360.cn/suggest?word="+$(this).val()+"&category=7&encodein=utf-8&encodeout=utf-8&format=json&callback=window.suggest&t=0.2560207773617478",$("body").eq(0).append(t),$(".p-list ul").show()}),$(document).on("click",function(){$(".p-list ul").hide()});var s=t("index"),n=t("num");$.ajax({url:"/shop/json/"+n,tpye:"GET",success:function(t){var t=JSON.parse(t),o=t.shop_data;$(".shop_ico").html("<img src="+o[s].shop_ico+">"),$(".shop_name").html(o[s].shop_name),$(".mobile").html(o[s].mobile),$(".overFlow").html("主营："+o[s].main),$(".addr").html("地址："+o[s].addr),$(".shop_visit").html(o[s].shop_visit)}}),$.ajax({url:"/shop/json/4",tpye:"GET",dataType:"json",success:function(t){var o=t.product;$(o).each(function(t,s){$(".product_img img").eq(t).attr("src",o[t].product_img),$(".product_name").eq(t).html(o[t].product_name),$(".service_desc1").eq(t).html("服务内容："+o[t].service_desc1)})}})});