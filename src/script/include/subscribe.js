/**
 * Created by claire on 2015/6/30.
 */
define(['widget/utils'],function(Utils){
    var _subscribe = {
        init:function(){
            var _that = this;
            var brand = $('#brand'),
                model = $('#model'),
                style = $('#style');
            this.defaultDisplay();
            this.getPicCode();
            brand.change(function(){
                var changeBrand1 = brand.val();
                _that.getModel(changeBrand1,function(){
                       var changeModel1 = model.val();
                      _that.getStyle(changeModel1);
                });
            });

            model.change(function(){
                var changeModel2 = model.val();
                _that.getStyle(changeModel2);
            });

            $('#subscribe').on('focus', 'input', function () {
                $('#subscribe').find('.tips-container').hide();
                $(this).parent().css('box-shadow','0 0 12px #38c');
            });

            $('#subscribe-btn').click(function(){
                _that.getSubscribeEvent();
            });

        },
        defaultDisplay:function(){
            var _that = this;
            var brand = $('#brand'),
                model = $('#model'),
                style = $('#style');
            this.getBrand(function(){
                var defaultBrand = brand.val();
                _that.getModel(defaultBrand,function(){
                    var defaultModel = model.val();
                    _that.getStyle(defaultModel);
                });
            });
        },
        getBrand:function(cb){
            $('#brand').empty();
            var url = baseUrl1 +'/subscribe/getBrands';
            Utils.ajaxJson(url, {}, function (data) {
                data = JSON.parse(data);
                var html = '',arr = [];
                for (var i in data) {
                    arr = arr.concat(data[i]);
                }
                for(var j = 0; j < arr.length; j++){
                    var item = arr[j];
                    html += '<option value="'+item.brandId+'">'+item.brandName+'</option>';
                }
                $('#brand').append(html);
                $('#brand-button').find('span').text(arr[0].brandName);
                cb && cb();
            });
        },
        getModel:function(val,cb){
            $('#model').empty();
            var url = baseUrl1 +'/subscribe/getAutoModel';
            Utils.ajaxJson(url, {brandId:val}, function (data) {
                data = JSON.parse(data);
                var html = '';
                for (var i = 0; i < data.length; i++) {
                    var item = data[i];
                    html += '<option value="'+item.modelId+'" data-skucode="'+item.skuCode+'">'+item.modelName+'</option>'
                }
                $('#model').append(html);
                $('#model-button').find('span').text(data[0].modelName);
                cb && cb();
            });
        },
        getStyle:function(val){
            $('#style').empty();
            var url = baseUrl1 +'/subscribe/getAutoStyle';
            Utils.ajaxJson(url, {modelId:val}, function (data) {
                data = JSON.parse(data);
                var arr = [],
                    html = '';
                for(var i in data){
                    arr = arr.concat(data[i]);
                }
                for(var j = 0;j < arr.length;j++){
                    var item = arr[j];
                    html += '<option value="'+item.styleId+'">'+item.styleName+'</option>';
                }
                $('#style').append(html);
                $('#style-button').find('span').text(arr[0].styleName);
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
        getSubscribeEvent:function(){
            $('#subscribe-btn').removeAttr('href');
            var name = $('#name');
            if(name.val() == ''){
                name.parent().parent().parent().find('p').eq(0).show();
                name.parent().css('box-shadow','0 0 12px #a94442');
                return false;
            }
            var code = $('#code');
            if(code.val() == ''){
                code.parent().parent().parent().find('p').eq(1).show();
                code.parent().css('box-shadow','0 0 12px #a94442');
                return false;
            }
            var mail = $('#mail');
            if(mail.val() == ''){
                code.parent().parent().parent().find('p').eq(3).show();
                code.parent().css('box-shadow','0 0 12px #a94442');
                return false;
            }
            if(!Utils.mailRegx(mail.val())){
                mail.parent().parent().parent().find('p').eq(4).show();
                mail.parent().css('box-shadow','0 0 12px #a94442');
                return false;
            }
            var params = {
                styleid:$('#style').val(),
                name:name.val(),
                code:code.val(),
                mail:mail.val()
            };
            var url = baseUrl1+'/member/doSubscribe';
            Utils.ajaxJson(url,params,function(data){
                data = JSON.parse(data);
                if(data.errFlag == 1){
                    window.location.href = baseUrl1+'/subscribe/subscribe.html#subscribe-ok';
                    $('#subscribe-car').text($('#brand').val()+''+$('#model').val()+''+$('#style').val());
                    $('#subscribe-name').text(name.val());
                    $('#subscribe-mail').text(mail.val());
                }else if(data.errFlag == -2) {
                    code.parent().parent().parent().find('p').eq(2).show();
                    code.parent().css('box-shadow','0 0 12px #a94442');
                    return false;
                }
            });
       }
    };

    return _subscribe;
});