//用於鏈式運動，加入回掉函數(endfn)
function startmove(obj,att,target,endFn){
    clearInterval(obj.timer);

    var currentVal=0;
    var speed=0;
    
    obj.timer=setInterval(function(){

        //加入opacity
        if(att=="opacity"){
            currentVal=parseInt(getStyle(obj,att)*100);
           
        }else{
            currentVal=parseInt(getStyle(obj,att));
            
        }

        speed=(target-currentVal)/7;
        speed=speed>0?Math.ceil(speed):Math.floor(speed);

        currentVal+=speed;
        if(Math.abs(currentVal-target)<Math.abs(speed)){
            currentVal=target;
            if(att=="opacity"){
                obj.style.opacity=currentVal/100;
                obj.style.filter="alpha(opacity="+currentVal+")";
            }else{
                obj.style[att]=currentVal+"px";
            }
            clearInterval(obj.timer);
            
            
            //回掉操作:如果有回掉函數則繼續執行
            if(endFn) endFn();
            
        }else{
            if(att=="opacity"){
                obj.style[att]=currentVal/100;
                obj.style.filter="alpha(opacity="+currentVal+")";
            }else{
                obj.style[att]=currentVal+"px";
            }
        }
    },20)
}

function getStyle(obj,att){
    //必須把取整拿掉，否則獲取不到opacity
    return window.getComputedStyle ? getComputedStyle(obj)[att]: obj.currentStyle[att];
   
}
