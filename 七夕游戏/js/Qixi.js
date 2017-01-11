function boyWalk (container){
    
    var visualWidth = container.width();
    var visualHeight = container.height();
    
    //设定人物初始位置
    var getValue = function(className){
        var $elem = $(''+className+'');
        return {
            top:$elem.position().top,
            height:$elem.height()
        };
     };
    var pathY = function(){
        var data = getValue('.a_background_middle');
        return data.top + data.height / 2;
    }();
    var $boy = $("#boy");
    var boyHeight = $boy.height();

    $boy.css({
        top:pathY-boyHeight+25,
    });

    //设置任务运动路线
    function slowWalk () {
        $boy.addClass('slowWalk');
    }

    function pauseWalk() {
        $boy.addClass('pauseWalk');
    }

    function restoreWalk() {
        $boy.removeClass('pauseWalk');
    }

    function calculateDist(direction,proportion){
        return (direction == 'x' ? visualWidth:visualHeight)*proportion;
    }

    function startRun(options,runTime){
        var dfwalk = $.Deferred();
        $boy.transition(
            options,
            runTime,
            'linear',
            function(){
                dfwalk.resolve(); // 动画完成
            });
        return dfwalk;
    }

    function walkRun(time,distX,distY){
        time = time || 3000;
        slowWalk();
        var d1 = startRun({
            left:distX + 'px',
            top:distY?distY+'px':undefined
        },time);

        return d1;
    }

    var instanceX;
    function walkToShop(runTime){
        var defer = $.Deferred();
        var doorObj = $(".door");
        var doorOffset = doorObj.offset();
        var doorOffsetLeft = doorOffset.left;

        var boyOffset = $boy.offset();
        var boyOffsetLeft = boyOffset.left;

        instanceX = (doorOffsetLeft+doorObj.width()/2)-(boyOffsetLeft+$boy.width()/2);

        var walkPlay = startRun({
            transform:'translateX('+instanceX+'px),scale(0.3,0.3)',
            opacity:'0.1'
        },2000);

        walkPlay.done(function(){
            $boy.css('opacity', '0');
            defer.resolve();
        });
        return defer;
    }

    function walkOutShop(runTime){
        var defer = $.Deferred();
        restoreWalk();
        var walkPlay = startRun({
            transform:'translateX'+instanceX+'px),scale(1,1)',
            opacity:1
        },runTime);
        walkPlay.done(function(){
            defer.resolve();
        });
        return defer;
    }

    function talkFlower(){
        var defer = $.Deferred();
        setTimeout(function(){
            $boy.addClass('slowFlolerWalk');
            defer.resolve();
        },1000);
        return defer;
    }

    return {
        walkTo:function(time,proportionx,proportiony){
            var distX = calculateDist('x',proportionx);
            var distY = calculateDist('y',proportiony);
            return walkRun(time,distX,distY);
        },
        toShop:function(){
            return walkToShop.apply(null,arguments);
        },
        outShop:function(){
            return walkOutShop.apply(null,arguments);
        },
        stopWalk: function() {
            pauseWalk();
        },
        talkFlower: function() {
            return talkFlower();
        },
        resetOriginal: function() {
            this.stopWalk();
            $boy.removeClass('slowWalk slowFlolerWalk').addClass('boyOriginal');
        },
        setFlolerWalk:function(){
             $boy.addClass('slowFlolerWalk');
        },
        getWidth: function() {
            return $boy.width();
        }
    }
}