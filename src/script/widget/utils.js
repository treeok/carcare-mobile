/**
 * Created by claire on 2015/6/25.
 */
define(function(){
    var utils = {
        ajaxGet:function(url,param,cb){
            if(typeof param !== 'object'){
                cb = param;
                param = null;
            }
            $.get(url,param,function(data){
                cb&&cb(data);

            });
        },
        ajaxJson:function(url,param,cb,errCb){
            $.ajax({
                type: 'post',
                url: url,
                data: param,
                success: function(data){
                    cb&&cb(data)
                }
            });
        },
        ajaxWithLoader:function(url,param,cb){
            var _that = this;
            $.ajax({
                type: 'post',
                timeout: 1000,//请求超时时间（毫秒）
                async: true,//异步
                url: url,
                data: param,
                beforeSend: function () {
                    _that.showLoader();
                },
                complete: function () {
                    _that.hideLoader();
                },
                success: function(data){
                    cb&&cb(data)
                }
            });
        },
        telRegx:function(str){
            var reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
            return str.match(reg);
        },
        pwdRegx:function(str){
            var reg = /((?=.*\d)(?=.*\D)|(?=.*[a-zA-Z])(?=.*[^a-zA-Z]))^.{8,16}$/;
            return str.match(reg);
        },
        mailRegx:function(str){
            var reg = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
            return str.match(reg);
        },
        chineseRegx:function(str){
            var reg = /^[\u4e00-\u9fa5]$/;
            return str.match(reg);
        },
        showLoader:function(){
            $.mobile.loading('show', {
                text: '', //加载器中显示的文字
                textVisible: true, //是否显示文字
                theme: 'a',        //加载器主题样式a-e
                textonly: false,   //是否只显示文字
                html: ""           //要显示的html内容，如图片等，默认使用Theme里的ajaxLoad图片
            });
        },
        hideLoader:function(){
            $.mobile.loading('hide');
        }
    };
    return utils;
});