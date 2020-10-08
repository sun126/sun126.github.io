window.onload=function(){
    let index=0;    //默认显示第一张
    let allA=document.getElementsByTagName("a");
    allA[index].style.backgroundColor="black";

    let imgList=document.getElementsByClassName("imgList")[0];

    let autoTimer;
    function autoChange(){
        autoTimer=setInterval(function(){    //自动切换
            index++;
            move(imgList,-400*index,15,"left",function(){
                set();
            });
            
        },2000);
    };
    
    for (let i=0;i<allA.length;i++)   //手动切换
    {
        allA[i].onclick=function(){
            clearInterval(autoTimer);    //用户点击需要关闭自动定时器
            index=i;
            set();
            move(imgList,-400*index,15,"left",autoChange);               //点击效果结束需要打开自动定时器
        }
    }

    autoChange();

    function set(){
        if (index>=5){
            index=0;
            imgList.style.left="0px";
        }
        for (let i=0;i<allA.length;i++){
            allA[i].style.backgroundColor="";
        }
        allA[index].style.backgroundColor="black";
    }

    function move(obj,target,speed,attr,callback){
        clearInterval(obj.timer);     //防抖

        let currentPlace=window.getComputedStyle?parseInt(getComputedStyle(obj,null)[attr]):parseInt(obj.currentStyle[attr]);
        if (currentPlace>target){
            speed=-speed;
        }
        obj.timer=setInterval(function(){
            let lastValue=window.getComputedStyle?parseInt(getComputedStyle(obj,null)[attr]):parseInt(obj.currentStyle[attr]);
            if (lastValue==target){
                return;
            }
            let newValue=lastValue + speed;
            if (speed<0&&newValue<target||speed>0&&newValue>target){
                newValue=target;
            }
            obj.style[attr]=newValue+"px";
            if (newValue==target){
                clearInterval(obj.timer);   //自结束
                callback && callback();
            }
        },10);
    }
}