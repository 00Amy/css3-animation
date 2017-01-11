function Swipe(container){
        var width = container.width();
        var height = container.height();
        var element = container.find(':first');
        var slides = element.find('li');
        var swipe = {};

        //设置ul实际长度
        element.css({
                width: (width * slides.length)+'px',
                height: height+'px'
        });

        //设置每一个li的宽度和高度都等于当前的显示容器的宽和高
        $.each(slides, function(index) {
                 var slide = slides.eq(index);
                 slide.css({
                        width: width + 'px',
                        height: height + 'px'
                 });
        });

        swipe.scrollTo = function(x,speed){
             element.css({
                     "transition-timing-function":'linear',
                     "transition-duration":speed+'ms',
                     "transform":'translate3d(-'+x+'px,0px,0px)'
             }); 
             return this;  
        };

        return swipe;
}