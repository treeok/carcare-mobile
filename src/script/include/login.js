/**
 * Created by claire on 2015/6/27.
 */
define(['widget/utils'],function(Utils){
    var _login = {
        init:function(){
            var _that = this;
            $('#login-btn').on('tap',function(){
                _that.loginEvent();
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
            var url = 'http://10.8.6.43:8082/member/login';
            Utils.ajaxJson(url,params,function(data){
                data = JSON.parse(data);

            });
        },
        loginTelValid:function(){
            var tel = $('#login-tel');
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
        }


    };

    return _login;
});