$(document).ready(function() {
	//窗口滚动时的动画
	$(window).scroll(function(event) {
		$(".navigation .navbar").css({
			background: '#FCA200',
		});
		$(".navigation .navbar").animate({opacity:0.7,height:70}, 1000);
		//当页面快处于上部时就让返回顶部按钮隐藏
		if($(window).scrollTop()<520){
			$(".back").hide(50);
		}else{
			$(".back").show(50);
		}
	});
 	
 	//返回顶部代码
 	var back = $(".back");
 	back.hide();
 	back.click(function(event) {
 		var timer = setInterval(function(){
 			$(window).scrollTop($(window).scrollTop()-50);
 			if($(window).scrollTop()==0){
 				clearInterval(timer);
 			}
 		},20);
 	});

});