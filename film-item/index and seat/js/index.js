// onload = 

addEventListener('load',function () {



    //轮播图JS代码
    var count=2;
  var intervalId=this.setInterval(function(){
        $(`.img`).animate({
            marginLeft:-(count-1)*(this.innerWidth)+"px"},1000,`linear`,function(){
                if(count<5){
                    count++;
                }else{
                    $(`.img`).css(`margin-left`,`0px`);
                    count=2;
                }
            })
    },3000)

    $(`#block-1`).on(`click`,function(){
        clearInterval(intervalId);
        $(`.img`).css(`margin-left`,`-0px`);

    })

    $(`#block-2`).on(`click`,function(){
        clearInterval(intervalId);
        $(`.img`).css(`margin-left`,`-1920px`);

    })
     
    $(`#block-3`).on(`click`,function(){
        clearInterval(intervalId);
        $(`.img`).css(`margin-left`,`-${1920*2}px`);

    })
    $(`#block-4`).on(`click`,function(){
        clearInterval(intervalId);
        $(`.img`).css(`margin-left`,`-${1920*3}px`);

    })
     
     
   
 
           

   

    /* 1. 获取所有的电影数据
    https://www.fastmock.site/mock/bb4157f45a0b5ffdcb3f6d984517a6c0/woniuMovie/getAllMovies
    2. 获取所有的电影院数据
    https://www.fastmock.site/mock/bb4157f45a0b5ffdcb3f6d984517a6c0/woniuMovie/getAllOper
    as
    3. 获取所有的电影种类数据
    https://www.fastmock.site/mock/bb4157f45a0b5ffdcb3f6d984517a6c0/woniuMovie/getAllTypes
     */
    $.ajax({
        url: `https://www.fastmock.site/mock/bb4157f45a0b5ffdcb3f6d984517a6c0/woniuMovie/getAllOperas`,
        type: `get`,
        success: function (data) {
            var cinemaArray = data.operas;
            //取到电影院名称加到option中


            var optionStr = cinemaArray.reduce((total, val, index) =>
                total + `<option value="${index}">${val.name}</option>`
                , `<option value="">选择影院</option>`)
            $(`#cinema`).html(optionStr);

            //取到对应的影片添加到电影选择option中
            $.ajax({
                url: `https://www.fastmock.site/mock/bb4157f45a0b5ffdcb3f6d984517a6c0/woniuMovie/getAllMovies`,
                type: `get`,
                success: function (film) {
                    //找到影院对应的影片编号
                    $(`#cinema`).on(`change`, function (event) {
                        var cinemaIndex = event.target.value;
                        var cinemaMovies = cinemaArray[cinemaIndex].movies;

                        var filmArray = film.movies;
                        //遍历电影信息数组，找到复合影院对应的电影
                        var cinemaFilms = filmArray.filter(val => cinemaMovies.includes(val.id));
                        var filmsOption = cinemaFilms.reduce((totalFilms, film) =>
                            totalFilms + `<option value="">${film.title}</option>`
                            , `<option value="">选择电影</option>`)

                        $(`#films`).html(filmsOption);
                    })
                }
            })
        }
    })

    //填充影片内容
    $.ajax({
        url: `https://www.fastmock.site/mock/bb4157f45a0b5ffdcb3f6d984517a6c0/woniuMovie/getAllMovies`,
        type: `get`,
        success: function (film) {
            //搜索框
            film.movies.forEach(val=>$(`#mylist`).append(` <option > ${val.title}</option>`))
           


            $(`#search`).on(`click`,function(event){
                 //点击搜索
            //获取用户输入框内容
           var targetName= $(`[list="mylist"]`).val();
           //筛选找到影片数组里的名字和用户输入的一样的影片
           var targetObjArr=film.movies.filter(val=>val.title===targetName);
            var targetObj=targetObjArr[0];
            console.log(targetObj)
            location.assign(`../pay and msg/html/web-movieparticulars.html?id=${targetObj.id}&title=${targetObj.title}&actors=${targetObj.actors}&imgSrc=${targetObj.imgSrc}&director=${targetObj.director}&price=${targetObj.price}&score=${targetObj.score}&release=${targetObj.release}&movieType=${targetObj.movieType}&language=${targetObj.language}&region=${targetObj.region}&desc=${targetObj.desc}&duration=${targetObj.duration}&posterSrc=${targetObj.posterSrc}&trailerLink=${targetObj.trailerLink}&comments=${targetObj.comments}`)
            })

            //正在热映
            var filmsArr = film.movies.slice(0, 8);

            var divStr = filmsArr.reduce((totalDiv, val) =>
                totalDiv + ` <a href="../pay and msg/html/web-movieparticulars.html?id=${val.id}&title=${val.title}&actors=${val.actors}&imgSrc=${val.imgSrc}&director=${val.director}&price=${val.price}&score=${val.score}&release=${val.release}&movieType=${val.movieType}&language=${val.language}&region=${val.region}&desc=${val.desc}&duration=${val.duration}&posterSrc=${val.posterSrc}&trailerLink=${val.trailerLink}&comments=${val.comments}" class="item-a" >
            <div class="item">
                <div class="orange"></div>
                <div class="film-image"> <img src="${val.imgSrc}" alt=""> </div>
                <div class="box">
                    <p class="movieName">${val.title}</p>
                    <span class="score">${val.score}</span>
                </div>
            </div>
        </a>`
                , ``)

            $(`#showing`).html(divStr);
            $(`#showing-num`).text(`( ${filmsArr.length} 部 )`);
            //即将上映
            var laterFilmsArray = film.movies.slice(8, film.movies.length);

            $(laterFilmsArray).each((index, val) => {
                $(`#later-film`).append(` <a href="../pay and msg/html/web-movieparticulars.html?id=${val.id}&title=${val.title}&actors=${val.actors}&imgSrc=${val.imgSrc}&director=${val.director}&price=${val.price}&score=${val.score}&release=${val.release}&movieType=${val.movieType}&language=${val.language}&region=${val.region}&desc=${val.desc}&duration=${val.duration}&posterSrc=${val.posterSrc}&trailerLink=${val.trailerLink}&comments=${val.comments}" class="item-a" >
            <div class="item">
                <div class="orange"></div>
                <div class="film-image"> <img src="${val.imgSrc}" alt=""> </div>
                <div class="box">
                    <p class="movieName">${val.title}</p>
                    <span class="score">${val.score}</span>
                </div>
            </div>
        </a>`)
            });
            $(`#later-num`).text(`( ${laterFilmsArray.length} 部 )`)
        }
    }) 



})