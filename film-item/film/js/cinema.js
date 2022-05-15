$(function () {

    function getParameter(movie) {
        //获取传参
        var Search = location.search;
        //获取问号后面的
        var data = Search.substring(`1`);
        var dataArr = data.split(`&`);

        //存储取值结果
        var parameter;
        dataArr.forEach(function (val) {
            var obj = val.split(`=`);
            if (movie == obj[0]) {
                parameter = obj[1];
            }
        })
        return parameter;
    }

    //电影名称
    var movieName = decodeURIComponent(getParameter(`movieName`));
    //电影id
    var movieId = decodeURIComponent(getParameter(`movieId`));



    $.ajax({
        url: `https://www.fastmock.site/mock/bb4157f45a0b5ffdcb3f6d984517a6c0/woniuMovie/getAllOperas`,
        type: `get`,
        success: function (data) {
            var movieCenterArr = data.operas;

               movieCenterArr.forEach(val => {
            
                       if(val.movies.includes(movieId)){
            
                        $(`#moivecenter`).append(`
                        <ul class="film-list">
                        <li>
                            <div>
                                <h6>${val.name}</h6>
                                <p>${val.address}</p>
                                <button>改签</button>
                                <button>折扣卡</button>
                            </div>
                            <div>
                                <span>￥23起</span>
                           <a href="../../film/html/cinema-2.html?id=${val.id}&name=${val.name}&address=${val.address}&phone=${val.phone}&img_src=${val.img_src}&movies=${val.movies}&movieName=${movieName}&movieId=${movieId}">选座购票</a>
                                <p>24Km</p>
                            </div>
                        </li>
            
                    </ul>
                        `)
                       }
            
                     });  

          /*  var orderUl= movieCenterArr.reduce(function (total, val) {

                if (val.movies.includes(movieId)) {

                    total+(`
                <ul class="film-list">
                <li>
                    <div>
                        <h6>${val.name}</h6>
                        <p>${val.address}</p>
                        <button>改签</button>
                        <button>折扣卡</button>
                    </div>
                    <div>
                        <span>￥23起</span>
                   <a href="../../film/html/cinema-2.html?id=${val.id}&name=${val.name}&address=${val.address}&phone=${val.phone}&img_src=${val.img_src}&movies=${val.movies}&movieName=${movieName}&movieId=${movieId}">选座购票</a>
                        <p>24Km</p>
                    </div>
                </li>
    
            </ul>
                `)
                }
            }, ``)
            $(`#moivecenter`).html(orderUl) */


        }
    })
})