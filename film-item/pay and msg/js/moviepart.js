onload=function(){
     //获取参数
     function  movieParam(movieData){
    //获取传参并且去掉问号
    var search=location.search.substring(1);
    //分割字符串
    var movieObj=search.split(`&`);
    //存储取值结果
    var objVal;
    movieObj.forEach(function(val){
        var re=val.split(`=`);
        if(movieData==re[0]){
            objVal=re[1];
        }
    })
    return objVal;
    }
    //电影id
    var movieId=decodeURIComponent(movieParam(`id`));
   //电影名称
    var  movieTitle=decodeURIComponent(movieParam(`title`));
    //演员
    var  movieActors=decodeURIComponent(movieParam(`actors`));
    //图片
    var  movieImgSrc=decodeURIComponent(movieParam(`imgSrc`));
    //导演
    var  movieDirector=decodeURIComponent(movieParam(`director`));
    //价格
    var  moviePrice=decodeURIComponent(movieParam(`price`));
    //评分
    var  movieScore=decodeURIComponent(movieParam(`score`));
    //发行
    var  movieRelease=decodeURIComponent(movieParam(`release`));
    //类型
    var  movieType=decodeURIComponent(movieParam(`movieType`)).split(`,`) ;
    //语种
    var  movielanguage=decodeURIComponent(movieParam(`language`));
    //产地
    var  movieRegion=decodeURIComponent(movieParam(`region`));
    //简介
    var  movieDesc=decodeURIComponent(movieParam(`desc`));
    //时长
    var  movieDuration=decodeURIComponent(movieParam(`duration`));
    //评价
    /* var  movieComments=decodeURIComponent(movieParam(`comments`))
    console.log(movieComments) */
    //填充图片
    $(`#movie-img`).html(` <img src="${movieImgSrc}" alt="">`)
    //填充名称
    $(`#title`).html(movieTitle)
    //填充类型
    //3. 获取所有的电影种类数据
    //https://www.fastmock.site/mock/bb4157f45a0b5ffdcb3f6d984517a6c0/woniuMovie/getAllTypes
    $.ajax({
        url:`https://www.fastmock.site/mock/bb4157f45a0b5ffdcb3f6d984517a6c0/woniuMovie/getAllTypes`,
        type:(`get`),
        success:function(data){
            var typesArray=data.types;
            var typeVal=typesArray.filter(val=>movieType.includes(val.id+``));
            var typeStr=typeVal.reduce((totalString,val)=>totalString+` <span> ${val. name} </span>`,``)
            $(`#film-type`).html(typeStr);
        }
    })
    //填充产地
    $(`#region`).html(movieRegion)
    //填充时长
    $(`#duration`).html(movieDuration)
    //填充上映事件
    $(`#release`).html(movieRelease)
    //填充评分
    $(`#score-film`).html(movieScore)
    //填充简介
    $(`#desc`).html(movieDesc)
    //填充导演
    $(`#director`).html(movieDirector)
    //填充评价
    $.ajax({
        url:`https://www.fastmock.site/mock/bb4157f45a0b5ffdcb3f6d984517a6c0/woniuMovie/getAllMovies`,
        type:(`get`),
        success:function(data){
            var movieArray=data.movies;
            var movieCommentsArray=movieArray.filter(val=>movieTitle===val.title)[0].comments;
            movieCommentsArray.forEach(function(val){
                $(`#filmcomments`).append(` <div class="comment-card">
                <div class="card-top">
                    <div class="left">
                        <div class="img">
                            <img src="../images/影片详情1/icon-5.png" alt="">
                        </div>
                        <div class="word">
                            <p><a href="">Hp</a></p>
                            <span>23小时前</span>
                            <img src="../images/影片详情1/icon-8.jpg" alt="">
                            <img src="../images/影片详情1/icon-8.jpg" alt="">
                            <img src="../images/影片详情1/icon-8.jpg" alt="">
                            <img src="../images/影片详情1/icon-8.jpg" alt="">
                            <img src="../images/影片详情1/icon-9.jpg" alt="">
                        </div>
                    </div>
                    <div class="right">
                        <button><img src="../img/影片详情页/赞.png" alt=""></button>
                        <span>158</span>
                    </div>
                </div>
                <div class="card-bottom">
                    <span>${val}</span>
                </div>
              </div>`)
             console.log(val)

            })
            console.log(movieComments)
        }
    })
    //填充跳转特惠购票
$(`#buy-ticket`).prop(`href`,`../../film/html/cinema.html?movieName=${movieTitle}&movieId=${movieId}`);



   
    
   

}