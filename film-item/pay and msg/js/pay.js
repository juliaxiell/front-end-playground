onload=function(){
//倒计时
var interId;

function startTime(){
    //创建定时器
    interId=setInterval(function(){
        //获取秒值
        var  oldSeconds=$(`#seconds`).text();
        var oldMinutes=$(`#minutes`).text();
        if(oldSeconds>0){
            $(`#seconds`).text(--oldSeconds);

        }else{
            //当秒值小于等于零时
            if(oldMinutes>0){
                $(`#minutes`).text(--oldMinutes);
                $(`#seconds`).text(59);
                oldSeconds=59;
            }
        }
        if(oldMinutes==0&&oldSeconds==0){
            clearInterval(interId);
        }
        
    },1000);
}
startTime();


//选择支付方式
$(`.way-body`).on(`click`,function(event){
   var $target=$(event.target);
     var payArray=$(this).children();

     payArray.each(function(index,ele){
         /* console.log(index,ele) */
         $(ele).removeClass(`act4`)
     })
     $target.addClass(`act4`)

})


//当点击确认支付时，结束倒计时

$(`#confirm`).on(`click`,function(event){
    console.log(`stop`)
    clearInterval(interId);
    location.href=`./web-paysucess.html`
});


}






