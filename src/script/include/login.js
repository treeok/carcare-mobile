/**
 * Created by claire on 2015/6/27.
 */
define(['widget/utils'],function(Utils){
    var _login = {
        init:function(){
            var _that = this;
            _that.inputFocus();
            _that.getPicCode();
            $('#login-btn').on('tap',function(){
                _that.loginEvent();
            });
            $('#register-btn').on('tap',function(){
                _that.registerEvent();
            });
            $('#resetpwd-btn1').on('tap',function(){
                _that.resetPwd1Event();
            });
            $('#resetpwd-btn2').on('tap',function(){
                _that.resetPwd2Event();
            });
            $('#resetpwd-btn3').on('tap',function(){
                _that.resetPwd3Event();
            });
            $('#register-send-code').click(function(){
                _that.sendCode();
            });
            $('#resetpwd2-send-code').click(function(){
                _that.sendresetCode();
            });

        },
        inputFocus:function(){
            $('#login').on('focus', 'input', function () {
                $('#login').find('.tips-container').hide();
                $(this).parent().css('box-shadow','0 0 12px #38c');
            });
            $('#register').on('focus', 'input', function () {
                $('#register').find('.tips-container').hide();
                $(this).parent().css('box-shadow','0 0 12px #38c');
            });
            $('#resetpwd1').on('focus', 'input', function () {
                $('#resetpwd1').find('.tips-container').hide();
                $(this).parent().css('box-shadow','0 0 12px #38c');
            });
            $('#resetpwd2').on('focus', 'input', function () {
                $('#resetpwd2').find('.tips-container').hide();
                $(this).parent().css('box-shadow','0 0 12px #38c');
            });
            $('#resetpwd3').on('focus', 'input', function () {
                $('#resetpwd3').find('.tips-container').hide();
                $(this).parent().css('box-shadow','0 0 12px #38c');
            });
        },
        getLoginParams:function(){
            var params = {};
            params.tel = $('#login-tel').val();
            params.password = $('#login-pwd').val();
            return params;
        },
        loginEvent:function(){
            var _that = this;
            var params = _that.getLoginParams();
            var tel = $('#login-tel');
            this._tel = tel;
            if(tel.val() == ''){
                tel.parent().parent().find('p').eq(1).show();
                tel.parent().css('box-shadow','0 0 12px #a94442');
                return false;
            }
            if(!Utils.telRegx(tel.val())){
                tel.parent().parent().find('p').eq(0).show();
                tel.parent().css('box-shadow','0 0 12px #a94442');
                return false;
            }
            var pwd = $('#login-pwd');
            this._pwd = pwd;
            if(pwd.val() == ''){
                pwd.parent().parent().find('p').eq(4).show();
                pwd.parent().css('box-shadow','0 0 12px #a94442');
                return false;
            }
            if(!Utils.pwdRegx(pwd.val())){
                pwd.parent().parent().find('p').eq(3).show();
                pwd.parent().css('box-shadow','0 0 12px #a94442');
                return false;
            }
            var url = baseUrl1+'/member/login';
            Utils.ajaxJson(url,params,function(data){
                data = JSON.parse(data);
                if(data.errFlag == 0){
                    window.location.href ='index.html';
                }else if(data.errFlag == -1){
                    tel.parent().parent().find('p').eq(2).show();
                    tel.parent().css('box-shadow','0 0 12px #a94442');
                    return false;
                }else if(data.errFlag == -2){
                    pwd.parent().parent().find('p').eq(5).show();
                    pwd.parent().css('box-shadow','0 0 12px #a94442');
                    return false;
                }else{
                    window.location.href = '404.html';
                }
            });
        },
        getRegisterParams:function(){
            var params = {};
            params.tel = $('#register-tel').val();
            params.password = $('#register-pwd').val();
            params.code = $('#register-code').val();
            return params;
        },
        sendCode:function(){
            var sendCode = $('#register-send-code');
            var tel = $('#register-tel');
            if(tel.val() == ''){
                tel.parent().parent().find('p').eq(0).show();
                tel.parent().css('box-shadow','0 0 12px #a94442');
                return false;
            }
            if(!Utils.telRegx(tel.val())){
                tel.parent().parent().find('p').eq(2).show();
                tel.parent().css('box-shadow','0 0 12px #a94442');
                return false;
            }
            sendCode.attr('disabled',true);
            sendCode.css('backgroundColor','#7c7c7c');
            sendCode.text('60秒后点击再次发送');

            var i =60;
            var f=setInterval(function(){

                sendCode.text(i+'秒后点击再次发送');
                i--;
                if(i=='0'){
                    clearInterval(f);
                    sendCode.attr('disabled',false);
                    sendCode.css('backgroundColor','#37bdd6');
                    sendCode.text('获取验证码');
                }
            },1000);

            $.ajax({
                url: baseUrl1+'/member/sendCode.html',
                type:"post",
                datatype:"html",
                data:{"tel":tel.val()},
                success:function(data){
                }
            });
        },
        sendresetCode:function(){
            var sendCode = $('#resetpwd2-send-code');
            var tel = this._resetTel;

            sendCode.attr('disabled',true);
            sendCode.css('backgroundColor','#7c7c7c');
            sendCode.text('60秒后点击再次发送');

            var i =60;
            var f=setInterval(function(){

                sendCode.text(i+'秒后点击再次发送');
                i--;
                if(i=='0'){
                    clearInterval(f);
                    sendCode.attr('disabled',false);
                    sendCode.css('backgroundColor','#37bdd6');
                    sendCode.text('获取验证码');
                }
            },1000);

            $.ajax({
                url: baseUrl1+'/member/sendCode.html',
                type:"post",
                datatype:"html",
                data:{"tel":tel.val()},
                success:function(data){
                }
            });
        },
        registerEvent:function(){
            var _that = this;
            var params = _that.getRegisterParams();
            var tel = $('#register-tel');
            if(tel.val() == ''){
                tel.parent().parent().find('p').eq(0).show();
                tel.parent().css('box-shadow','0 0 12px #a94442');
                return false;
            }
            if(!Utils.telRegx(tel.val())){
                tel.parent().parent().find('p').eq(2).show();
                tel.parent().css('box-shadow','0 0 12px #a94442');
                return false;
            }
            var code = $('#register-code');
            if(code.val() == ''){
                code.closest('.ui-field-contain').find('p').eq(3).show();
                code.parent().css('box-shadow','0 0 12px #a94442');
                return false;
            }
            var pwd = $('#register-pwd');
            if(pwd.val() == ''){
                pwd.parent().parent().find('p').eq(7).show();
                pwd.parent().css('box-shadow','0 0 12px #a94442');
                return false;
            }
            if(!Utils.pwdRegx(pwd.val())){
                pwd.parent().parent().find('p').eq(6).show();
                pwd.parent().css('box-shadow','0 0 12px #a94442');
                return false;
            }
            var confirmPwd = $('#register-confirm-pwd');
            if(confirmPwd.val() == ''){
                confirmPwd.parent().parent().find('p').eq(8).show();
                confirmPwd.parent().css('box-shadow','0 0 12px #a94442');
                return false;
            }
            if(confirmPwd.val() != pwd.val()){
                confirmPwd.parent().parent().find('p').eq(9).show();
                confirmPwd.parent().css('box-shadow','0 0 12px #a94442');
                return false;
            }

            var url = baseUrl1+'/member/register';
            Utils.ajaxJson(url,params,function(data){
                data = JSON.parse(data);
                if(data.errFlag == 0){
                    $('#register').parent().parent().hide();
                    Utils.ajaxJson(baseUrl1+'/member/login',params,function(data){
                    });
                }else if(data.errFlag == -1){
                    tel.parent().parent().find('p').eq(1).show();
                    tel.parent().css('box-shadow','0 0 12px #a94442');
                    return false;
                }else if(data.errFlag == -2){
                    code.closest('.ui-field-contain').find('p').eq(4).show();
                    code.parent().css('box-shadow','0 0 12px #a94442');
                    return false;
                }else if(data.errFlag == -3){
                    code.closest('.ui-field-contain').find('p').eq(5).show();
                    code.parent().css('box-shadow','0 0 12px #a94442');
                    return false;
                }
            });

        },
        getPicCode:function(){
            var code = $('#code-img');
            code[0].src = baseUrl1+'/code.html';
            code.click(function(){
                Utils.ajaxGet(baseUrl1+'/code.html?'+Math.random(),function(data){
                    code[0].src = baseUrl1+'/code.html?'+Math.random();
                });
            });
        },
        resetPwd1Event:function(){
            $('#resetpwd-btn1').removeAttr('href');
            var tel = $('#resetpwd1-tel');
            if(tel.val() == ''){
                tel.parent().parent().find('p').eq(1).show();
                tel.parent().css('box-shadow','0 0 12px #a94442');
                return false;
            }
            if(!Utils.telRegx(tel.val())){
                tel.parent().parent().find('p').eq(0).show();
                tel.parent().css('box-shadow','0 0 12px #a94442');
                return false;
            }
            var code = $('#resetpwd1-code');
            if(code.val() == ''){
                code.closest('.ui-field-contain').find('p').eq(3).show();
                code.parent().css('box-shadow','0 0 12px #a94442');
                return false;
            }
            var params = {
                tel:tel.val(),
                code:code.val()
            };
            this._resetTel = tel.val();
            var url = baseUrl1+'/member/checkTelAndCode.html';
            Utils.ajaxJson(url,params,function(data){
                data = JSON.parse(data);
                if(data.errFlag == 0){
                    $('#resetpwd-btn1').attr('href','#resetpwd2');
                }else if(data.errFlag == -1){
                    tel.parent().parent().find('p').eq(2).show();
                    tel.parent().css('box-shadow','0 0 12px #a94442');
                    return false;
                }else if(data.errFlag == -2){
                    code.closest('.ui-field-contain').find('p').eq(4).show();
                    code.parent().css('box-shadow','0 0 12px #a94442');
                    return false;
                }
            });
        },
        resetPwd2Event:function(){
            $('#resetpwd-btn2').removeAttr('href');
            var code = $('#resetpwd2-code');
            if(code.val() == ''){
                code.closest('.ui-field-contain').find('p').eq(0).show();
                code.parent().css('box-shadow','0 0 12px #a94442');
                return false;
            }
            this._resetCode = code.val();
            var params = {
                tel:this._resetTel,
                code:code.val()
            };
            var url = baseUrl1+'/member/checkCode.html';
            Utils.ajaxJson(url,params,function(data){
                data = JSON.parse(data);
                if(data.errFlag == 0){
                    $('#resetpwd-btn2').attr('href','#resetpwd3');
                }else if(data.errFlag == -2){
                    code.closest('.ui-field-contain').find('p').eq(1).show();
                    code.parent().css('box-shadow','0 0 12px #a94442');
                }else if(data.errFlag == -3){
                    code.closest('.ui-field-contain').find('p').eq(2).show();
                    code.parent().css('box-shadow','0 0 12px #a94442');
                }
            });
        },
        resetPwd3Event:function(){
            $('#resetpwd-btn3').removeAttr('href');
            var pwd = $('#resetpwd3-pwd');
            if(pwd.val() == ''){
                pwd.parent().parent().find('p').eq(1).show();
                pwd.parent().css('box-shadow','0 0 12px #a94442');
                return false;
            }
            if(!Utils.pwdRegx(pwd.val())){
                pwd.parent().parent().find('p').eq(0).show();
                pwd.parent().css('box-shadow','0 0 12px #a94442');
                return false;
            }
            var confirmPwd = $('#resetpwd3-confirm-pwd');
            if(confirmPwd.val() == ''){
                confirmPwd.parent().parent().find('p').eq(2).show();
                confirmPwd.parent().css('box-shadow','0 0 12px #a94442');
                return false;
            }
            if(confirmPwd.val() != pwd.val()){
                confirmPwd.parent().parent().find('p').eq(3).show();
                confirmPwd.parent().css('box-shadow','0 0 12px #a94442');
                return false;
            }
            var params = {
                tel:this._resetTel,
                code:this._resetCode,
                password:pwd.val()
            };
            var url = baseUrl1+'/member/findBackPwd.html';
            Utils.ajaxJson(url,params,function(data){
                data = JSON.parse(data);
                if(data.errFlag == 0){
                    $('#resetpwd-btn3').attr('href','#login');
                }else{
                    alert('密码修改失败');
                }
            });
        }


    };

    return _login;
});