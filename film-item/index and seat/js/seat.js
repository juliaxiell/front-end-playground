addEventListener('load', function () {

    //用户选了几个座位
    var seatNum = 0;//存储座位个数
    var total = 0;
    // 用于存储当前选中的座位行列信息
    var seatMemo = [];

    //选座JS代码
    $(`#seats`).on(`click`, function (event) {
        var target = $(event.target);

        if (target.hasClass(`white`)) {
            target.removeClass(`white`);
            target.addClass(`green`)
            seatNum += 1;

            var currRow = target.attr(`row`);
            var currCol = target.attr(`col`);

            var isHaveCurrItem = seatMemo.some(({ row, col }) => {
                return row === currRow && col === currCol
            })

            if (!isHaveCurrItem) {
                seatMemo.push({
                    row: currRow,
                    col: currCol
                });
            }

            var seatMsg = '';

            seatMemo.forEach(({ row, col }) => {
                seatMsg += `第${row}排，第${col}列`
            })

            //显示选择的位置
            $(`#user-seat`).text(seatMsg)

        } else if (target.hasClass(`green`)) {
            target.remove(`green`);
            target.addClass(`white`);
            seatNum -= 1;

            var currRow = target.attr(`row`);
            var currCol = target.attr(`col`);

            seatMemo = seatMemo.filter(({ row, col }) => {
                return row !== currRow || col !== currCol
            });

            var seatMsg = '';

            seatMemo.forEach(({ row, col }) => {
                seatMsg += `第${row}排，第${col}列`
            })

            // $(`#user-seat`).text();
            $(`#user-seat`).text(seatMsg);


        }
        //计算总价填充到总价
        total = seatNum * 38;
        $(`.price`).text(total)




    })

    //选座后跳转支付页面的代码
    //生成随机验证码
    function createCode() {
        var codeStr = 'abcdefghijklmiopqrstuvwxyzABCDFEGHIJKLMNOPQRSTUVWXYZ0123456789';
        var reCode = '';
        for (var count = 0; count < 4; count++) {
            var index = parseInt(Math.random() * codeStr.length);
            var char = codeStr.charAt(index);
            reCode += char;
        }
        return reCode;
    }
    //存储真实验证码值
    var realCode = createCode(4);
    //绘制验证码
    var can = document.querySelector(`canvas`);
    var context = can.getContext(`2d`);
    drawPicture(context);
    //给登录画布添加点击事件
    can.onclick = function () {
        realCode = createCode(4);
        context.clearRect(0, 0, 360, 240);
        drawPicture(context);
    };

    //生成随机验证码和干扰线
    function drawPicture(context) {
        for (var i = 0; i < realCode.length; i++) {
            //随机颜色
            var red = Math.ceil(Math.random() * 255);
            var green = Math.ceil(Math.random() * 255);
            var blue = Math.ceil(Math.random() * 255);
            //随机画笔颜色
            context.fillStyle = `rgb(${red},${green},${blue})`;
            //设置字体大小
            var codeSize = Math.ceil(Math.random() * 30) + 60;
            context.font = `${codeSize}px 微软雅黑`;
            //随机横坐标
            var codeX = Math.ceil(Math.random() * ((78 * (i + 1) - codeSize) - 78 * i)) + 78 * i;
            //随机纵坐标
            var codeY = Math.ceil(Math.random() * (120 - codeSize)) + codeSize;
            //绘制字体
            context.fillText(realCode.charAt(i), codeX, codeY);
        }

        for (var l = 0; l < 6; l++) {
            context.beginPath();

            context.lineWidth = 3;
            //随机颜色
            var red = Math.ceil(Math.random() * 255);
            var green = Math.ceil(Math.random() * 255);
            var blue = Math.ceil(Math.random() * 255);
            //随机线条颜色
            context.strokeStyle = `rgb(${red},${green},${blue})`;
            //随机起点
            var lineBginX = Math.ceil(Math.random() * 360);
            var lineBginY = Math.ceil(Math.random() * 150);
            context.moveTo(lineBginX, lineBginY);
            //随机终点
            var lineEndX = Math.ceil(Math.random() * 360);
            var lineEndY = Math.ceil(Math.random() * 150);
            context.lineTo(lineEndX, lineEndY);
            context.stroke();
            context.closePath();

        }

    }

    //确认选座，提交订单
    $(`#confirm-seat`).on(`submit`, function (event) {
        var priceSum = $(`.price`).text();

        var $telVal = $(`.tel-num`).val();
        var regTel = /^1[3-9]\d{9}$/;
        var $codeVal = $(`.password`).val();

        if (priceSum != 0 && regTel.test($telVal) && $codeVal.toUpperCase() === realCode.toUpperCase()) {
            alert(`选座成功`)
        } else {
            event.preventDefault();
        }
    })
    //点击提交按钮变背景颜色
    $(`[type="submit"]`).on(`click`, function (event) {
        $(event.target).addClass(`color`)
    });


});