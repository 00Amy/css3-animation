//jquery显示上部提示框
$(document).ready(function(){
	$(".link .button").hover(function() {
		/* 划过时 */
		//获取data中的值
		var title = $(this).attr('data');
		//document.title = title;调试的新方法，用document.title
		//将对应值放入em中显示
		$('.tip em').text(title);
		var buttonPos = $(this).position().left-55;
		//获取由于可适性多的那一步值，注意用outWidth获得真实的值，而width只能获取css中定义的值
		var dis = ($('.tip').outerWidth() - $(this).outerWidth())/2;
		var trueDis = buttonPos-dis;
		//加入动画，并且让提示框出现在该出现的地方
		$('.tip').css({'left':trueDis+'px'}).animate({'opacity': 1, 'top': 140}, 300);
	}, function() {
		/* 划出时 */
		$('.tip').stop();
		if(!$('.tip').is(':animated')){
			$('.tip').animate({'top': 100,'opacity':0}, 300);
		}
		
	});
})