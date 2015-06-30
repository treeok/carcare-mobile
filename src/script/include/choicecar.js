/**
 * Created by claire on 2015/6/29.
 */
define(['widget/utils'],function(Utils){
    var _choicecar = {
        init:function(){
            var _that = this;
            var brand = $('#brand'),
                model = $('#model'),
                year = $('#year'),
                style = $('#style');
            this.defaultDisplay();

            brand.change(function(){
                var changeBrand1 = brand.val();
                _that.getModel(changeBrand1,function(){
                    var changeModel1 = model.val();
                    _that.getYear(changeModel1,function(){
                        var changeYear1 = year.val();
                        _that.getStyle(changeModel1,changeYear1);
                    });
                });
            });

            model.change(function(){
                var changeModel2 = model.val();
                _that.getYear(changeModel2,function(){
                    var changeYear2 = year.val();
                    _that.getStyle(changeModel2,changeYear2);
                });
            });

            year.change(function(){
                var changeModel3 = model.val();
                var changeYear3 = year.val();
                _that.getStyle(changeModel3,changeYear3);
            });
            this.carConfirm();
            this.carConfirmOk();

        },
        defaultDisplay:function(){
            var _that = this;
            var brand = $('#brand'),
                model = $('#model'),
                year = $('#year'),
                style = $('#style');
            this.getBrand(function(){
                var defaultBrand = brand.val();
                _that.getModel(defaultBrand,function(){
                    var defaultModel = model.val();
                    _that.getYear(defaultModel,function(){
                        var defaultYear = year.val();
                        _that.getStyle(defaultModel,defaultYear);
                    });
                });
            });
        },
        carConfirm:function(){
            var _that = this;
            var brand = $('#brand'),
                model = $('#model'),
                year = $('#year'),
                style = $('#style'),
                choicecarConfirm = $('#choicecar-confirm');
            $('#choicecar-btn').click(function(){
                choicecarConfirm.removeAttr('styleId');
                var brandtxt = brand.find('option:selected').text();
                var modeltxt = model.find('option:selected').text();
                var yeartxt = year.find('option:selected').text();
                var styletxt = style.find('option:selected').text();
                var styleId =  style.val();
                choicecarConfirm.text(brandtxt+' '+modeltxt+' '+yeartxt+' '+styletxt).attr('styleId','styleId');
            });
        },
        carConfirmOk:function(){
            var _that = this;
            var brand = $('#brand'),
                model = $('#model'),
                year = $('#year'),
                style = $('#style');
            $('#choicecar-btn-ok').click(function(){
                var styleId =  style.val();
                var skuCode = model.find('option:selected').attr('data-skucode');
                window.location.href = 'orderinfo.html?styleId='+styleId+'&upc='+skuCode;
            });
        },
        getBrand:function(cb){
            $('#brand').empty();
            var url = baseUrl1 +'/suit/suitBrands';
            Utils.ajaxJson(url, {}, function (data) {
                data = JSON.parse(data);
                var html = '',arr = [];
                for (var i = 0; i < data.length; i++) {
                    arr = arr.concat(data[i].children);
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
            var url = baseUrl1 +'/suit/suitCarModel';
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
        getYear:function(val,cb){
            $('#year').empty();
            var url = baseUrl1 +'/suit/suitCarYear';
            Utils.ajaxJson(url, {modelId:val}, function (data) {
                data = JSON.parse(data);
                var html = '';
                for (var i = 0; i < data.length; i++) {
                    var item = data[i];
                    html += '<option value="'+item+'">'+item+'</option>'
                }
                $('#year').append(html);
                $('#year-button').find('span').text(data[0]);
                cb && cb();
            });
        },
        getStyle:function(val1,val2){
            $('#style').empty();
            var url = baseUrl1 +'/suit/suitCarStyleByYear';
            Utils.ajaxJson(url, {modelId:val1,year:val2}, function (data) {
                data = JSON.parse(data);
                var html = '';
                for (var i = 0; i < data.length; i++) {
                    var item = data[i];
                    html += '<option value="'+item.styleId+'">'+item.styleName.slice(5)+'</option>'
                }
                $('#style').append(html);
                $('#style-button').find('span').text(data[0].styleName.slice(5));
            });
        }
    };

    return _choicecar;
});