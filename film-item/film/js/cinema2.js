$(function () {

  function getParameter(cinemaData) {
    //获取传参
    var Search = location.search;
    //获取问号后面的
    var data = Search.substring(`1`);
    var dataArr = data.split(`&`);
    
    //存储取值结果
    var parameter;
    dataArr.forEach(function(val){
      var  obj=val.split(`=`);
      if(cinemaData==obj[0]){
        parameter=obj[1];
      }
    })
    return parameter;
  }
 //电影院名称
 var cinemaName=decodeURIComponent(getParameter(`name`)) ;
 //影院地址
 var cinemaAddress=decodeURIComponent(getParameter(`address`)) ;
 //影院电话
 var cinemaPhone=decodeURIComponent(getParameter(`phone`)) ;
 //影院图片
 var cinemaImg_src=decodeURIComponent(getParameter(`img_src`)) ;
 //影院电影
 var cinemaMovies=decodeURIComponent(getParameter(`movies`)) ;
 //影片id
 var movieId=decodeURIComponent(getParameter(`movieId`));
 //影片名称
 var movieName=decodeURIComponent(getParameter(`movieName`));


 //填充页面信息
 $(`#cinema-name`).text(cinemaName);
 $(`#cinema-name2`).text(cinemaName);
 $(`#cinema-address`).text(cinemaAddress);
 $(`#cinema-phone`).text(`电话：${cinemaPhone}`);
 $(`#cinema-img`).prop(`src`,`${cinemaImg_src}`);
 $(`#filmName`).text(movieName);


  //创建地图
    var map=new BMapGL.Map(`cinema-map`);
    map.centerAndZoom(new BMapGL.Point(104.069944, 30.579012),15);
    map.enableScrollWheelZoom();
    var geo=new BMapGL.Geocoder();
    var city=`成都市`;
    
    geo.getPoint(cinemaAddress,function(point){
        //创建标注
        var marker=new BMapGL.Marker(point);
        map.addOverlay(marker);
        //地址逆向解析
        geo.getLocation(point,function(re){
          //创建消息框
         var win=new BMapGL.InfoWindow(re.cinemaAddress,{
             width:100,
             height:100,
             titie:`影城地址`
          }) 
          //在地图上打开消息框
          map.openInfoWindow(win,point);

          //设置地图中心
          map.centerAndZoom(point,15);
        })
 
    },city) 













  //获取当前时间
  var time = new Date();
  var hour = time.getHours();
  var minnute = time.getMinutes();
  var timeStr = `${hour}:${minnute}`;
  console.log(timeStr)
  var startArray = $(`.start-time`);
  for (var i = 0; i < startArray.length; i++) {
    var start = $(startArray[i]).text();
    var timeOut = start >= timeStr;

    console.log(timeOut)
    if (timeOut) {
      $(startArray[i]).parent().parent().find(`.state`).html(` <a href="../../index and seat/选座.html">购票</a> `)
    } else {
      $(startArray[i]).parent().parent().find(`.state`).html(` <button disabled="disabled">停止售票</button> `)
    }

  }

  function nowTime() {
    var time = new Date();
    var hour = time.getHours();
    var minnute = time.getMinutes();
    var seconds = time.getSeconds();

    /*   function cheak(i) {
        var num;
        if (i < 10) {
          num = `0` + i;
        } else {
          num = i
        }
      } */
    /*   hour=cheak(hour);
      minnute=cheak(minnute); */
    var timeStr = `${hour}:${minnute}:${seconds}`;
    console.log(timeStr)
    var startArray = $(`.start-time`);
    for (var i = 0; i < startArray.length; i++) {
      var start = $(startArray[i]).text();
      var timeOut = start > timeStr;

      console.log(timeOut)
      if (!timeOut) {
        $(startArray[i]).parent().parent().find(`.state`).html(` <button disabled="disabled">停止售票</button> `)
      } else {
        $(startArray[i]).parent().parent().find(`.state`).html(` <a href="../../index and seat/选座.html">购票</a> `)
      }

    }
  }

  //setInterval(`nowTime()`,1000);





})