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
        }
    };
    return utils;
});