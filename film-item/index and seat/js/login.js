// onload=
addEventListener('load', function () {
    //存储输入是否合法
    var telRe = false;
    var pswRe = false;
    //存储再次输入密码是否正确
    var pswIs = false;
    //存储验证码是否正确
    var codeIS = false;
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
    var canArr = document.querySelectorAll(`canvas`);

    //给登录画布绘制验证码
    var loginCan = canArr[0];
    var loginContext = loginCan.getContext(`2d`);
    drawPicture(loginContext);
    //给登录画布添加点击事件
    function loginCanCilck() {
        realCode = createCode(4);
        console.log(realCode)
        loginContext.clearRect(0, 0, 360, 240);
        drawPicture(loginContext);
    }
    document.querySelector(`#loginCan`).onclick = function () {
        loginCanCilck();
    }



    //给注册画布绘制验证码
    var registerCan = canArr[1];
    var registerContext = registerCan.getContext(`2d`);
    drawPicture(registerContext);
    //给注册画布添加点击事件
    function registerCanClick() {
        realCode = createCode(4);
        registerContext.clearRect(0, 0, 360, 240);
        drawPicture(registerContext);
    }
    document.querySelector(`#registerCan`).onclick = function () {
        registerCanClick();
    }

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
            var codeSize = Math.ceil(Math.random() * 30) + 50;
            context.font = `${codeSize}px 微软雅黑`;
            //随机横坐标
            var codeX = Math.ceil(Math.random() * ((75 * (i + 1) - codeSize) - 75 * i)) + 75 * i;
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


    //点击登录按钮执行代码
    document.querySelector(`#login`).onclick = function (event) {
        //组织a标签的默认行为
        event.preventDefault();
        document.querySelector(`.register`).style.display = `flex`;
    }
    
    //验证验证码是否正确
    document.querySelector(`#login-code`).onchange = function (event) {
        
        var codeVal = event.target.value;
        if (codeVal.toUpperCase() === realCode.toUpperCase()) {
            var p = event.target.nextElementSibling;
            p.style.display = `none`;
            codeIS = true;
        } else {
            var p = event.target.nextElementSibling;
            p.style.display = `block`
        }
       

    }

    //提交表单执行的代码
    document.querySelector(`#login-form`).onsubmit = function (event) {
        var loginTel = document.querySelector(`#login-tel`).value;
        var loginPsd = document.querySelector(`#login-psd`).value;
        var loginCode = document.querySelector(`#login-code`).value;
        codeIS = loginCode.toUpperCase() === realCode.toUpperCase();

        //从本地存储中获取数据
        var loginJson = localStorage.getItem(`users`);
        if (loginJson == null) {
            var usersArray = [];
        } else {
            var usersArray = JSON.parse(loginJson);
        }

         
        //遍历数组找到存储的复合条件的账号信息
        var loginUser = usersArray.find(val => val.userTel === loginTel);

        if (loginUser != undefined) {
            if (loginTel === loginUser.userTel && loginPsd === loginUser.userPsd && codeIS) {
                //存储登录账号信息
                sessionStorage.setItem(`account`, loginTel)
                alert(`登录成功`)
                document.querySelector(`.register`).style.display = `none`;
            } else {
                //阻止form的默认行为
                event.preventDefault()
                alert(`账号或密码或验证码有误`)
            }
        } else {
            //阻止form的默认行为
            event.preventDefault()
            alert(`账号或密码或验证码有误`)
        }
    }



    /* 登录后执行的代码*/
    var loginAccount = sessionStorage.getItem(`account`);
    if (loginAccount == null) {
        document.querySelector(`#user-downline`).style.display = `block`;
    } else {
        document.querySelector(`#user-downline`).style.display = `none`;
        document.querySelector(`#user-online`).innerHTML = ` <li>欢迎${loginAccount}
 </li>
 <li id="closelogin" >退出登录 
 </li>`;

        //点击注销执行代码
        document.querySelector(`#closelogin`).onclick = function () {
            sessionStorage.removeItem(`account`);
            location.reload();
        }
    }


    //点击注册按钮执行代码
    document.querySelector(`#register`).onclick = function (event) {
        //组织a标签的默认行为
        event.preventDefault();
        document.querySelector(`.signin`).style.display = `flex`;
    }



    //验证电话号码是否合法
    document.querySelector(`#re-tel`).onchange = function (event) {
        var regTel = /^1[3-9]\d{9}$/;
        var reTelVal = event.target.value;
        telRe = regTel.test(reTelVal);
        if (!telRe) {
            var p = event.target.nextElementSibling;
            p.style.display = `block`
        } else {
            var p = event.target.nextElementSibling;
            p.style.display = `none`
            telRe = true;
        }
    }
    //验证密码是否合法
    document.querySelector(`#re-psw`).onchange = function (event) {
        var regPsw = /^[a-zA-Z0-9]{6,20}$/;
        var rePswVal = event.target.value;

        pswRe = regPsw.test(rePswVal);
        if (!pswRe) {
            var p = event.target.nextElementSibling;
            p.style.display = `block`
        } else {
            var p = event.target.nextElementSibling;
            p.style.display = `none`;
            pswRe = true;
        }

    }

    //验证密码是否正确
    document.querySelector(`#re-psws`).onchange = function (event) {
        var psdVal = document.querySelector(`#re-psw`).value;
        var psws = event.target.value;

        if (psdVal !== psws) {
            var p = event.target.nextElementSibling;
            p.style.display = `block`
        } else {
            var p = event.target.nextElementSibling;
            p.style.display = `none`;
            pswIs = true;
        }

    }

    //验证验证码是否正确
    document.querySelector(`#re-code`).onchange = function (event) {
        var codeVal = event.target.value;
        if (codeVal.toUpperCase() === realCode.toUpperCase()) {
            var p = event.target.nextElementSibling;
            p.style.display = `none`;
            codeIS = true;
        } else {
            var p = event.target.nextElementSibling;
            p.style.display = `block`
        }
        console.log(codeIS);

    }
    //用户点击立即注册,表单提交
    document.querySelector(`#re-form`).onsubmit = function (event) {

        //  判断电话号码和密码是否都合法
        if (telRe && pswRe && pswIs && codeIS) {
            var tel = document.querySelector(`#re-tel`).value;
            var psd = document.querySelector(`#re-psw`).value;
            //将获取的值存入本地存储中


           
            //存储用户数据
            var userJson = localStorage.getItem(`users`);
            if (userJson == null) {
                var usersArray = [];
            } else {
                var usersArray = JSON.parse(userJson);
            }


            var isExist = usersArray.some(val => val.userTel == tel);
            if (isExist) {
                alert(`此手机号码已注册，请直接登录`)
            } else {
                usersArray.push({
                    userTel: tel,
                    userPsd: psd,
                })
                var userJson = JSON.stringify(usersArray);
                localStorage.setItem(`users`, userJson);
                alert(`注册成功`)
                document.querySelector(`.signin`).style.display = `none`;
            }
        } else {
            //阻止form的默认行为
            event.preventDefault()
        }

    }
    //点击关闭登录框
    this.document.querySelector(`#close-login`).onclick = function () {
        document.querySelector(`.register`).style.display = `none`;
    }
    //点击关闭注册框
    this.document.querySelector(`#close-register`).onclick = function () {
        document.querySelector(`.signin`).style.display = `none`;
    }

}
)