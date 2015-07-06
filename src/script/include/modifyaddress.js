/**
 * Created by claire on 2015/7/1.
 */
define(['widget/utils'],function(Utils){
    var _modifyAddress = {
        init:function(){
            var _that = this;
            var urlArray = document.URL.indexOf('?');
            if(urlArray > 0){
                var id = document.URL.slice(urlArray).slice(4);
                this.editAddress(id);
            }else{
                this.addAddress();
            }
        },
        adsAddSelectDefault:function(cb){
            var _that = this;
            this.buildAdsSelect(1, 0, 'province', function () {
                var val1 = $('#province').val();
                _that.buildAdsSelect(2, val1, 'city', function () {
                    var val2 = $('#city').val();
                    _that.buildAdsSelect(3, val2, 'county',cb);
                });
            });
            $('#province').change(function () {
                var val1 = $(this).val();
                _that.buildAdsSelect(2, val1, 'city', function () {
                    var val2 = $('#city').val();
                    _that.buildAdsSelect(3, val2, 'county',cb);
                });
            });
            $('#city').change(function () {
                var value = $(this).val();
                _that.buildAdsSelect(3, value, 'county',cb);
            });
        },
        addAddress:function(){
            var container = $('#modify-address');
            container.on('focus', 'input', function () {
                container.find('.tips-container').hide();
                $(this).parent().css('box-shadow','0 0 12px #38c');
            });
            container.on('focus', 'textarea', function () {
                container.find('.tips-container').hide();
                $(this).parent().css('box-shadow','0 0 12px #38c');
            });
            this.adsAddSelectDefault();
            var name = $('#name'),
                tel = $('#tel'),
                street = $('#street'),
                province = $('#province'),
                city = $('#city'),
                county = $('#county'),
                _that = this;
            $('#modify-ads-btn').click(function(){
                var params = {
                    name: name.val(),
                    mobile: tel.val(),
                    provinceId: province.val(),
                    province: province.find('option:selected').text(),
                    cityId: city.val(),
                    city: city.find('option:selected').text(),
                    districtId: county.val(),
                    district: county.find('option:selected').text(),
                    street: street.val()
                };
                if(name.val() == ''){
                    name.parent().parent().find('p').eq(0).show();
                    name.parent().css('box-shadow','0 0 12px #a94442');
                    return false;
                }
                if(name.val().length > 20){
                    name.parent().parent().find('p').eq(1).show();
                    name.parent().css('box-shadow','0 0 12px #a94442');
                    return false;
                }
                if(tel.val() == ''){
                    tel.closest('.ui-content').find('p').eq(2).show();
                    tel.parent().css('box-shadow','0 0 12px #a94442');
                    return false;
                }
                if(!Utils.telRegx(tel.val())){
                    tel.closest('.ui-content').find('p').eq(3).show();
                    tel.parent().css('box-shadow','0 0 12px #a94442');
                    return false;
                }
                if(street.val() == ''){
                    street.closest('.ui-content').find('p').eq(4).show();
                    street.parent().css('box-shadow','0 0 12px #a94442');
                    return false;
                }
                if(street.val().length > 50){
                    street.parent().parent().find('p').eq(5).show();
                    street.parent().css('box-shadow','0 0 12px #a94442');
                    return false;
                }
                var url = baseUrl1+'/address/add';
                Utils.ajaxJson(url,params,function(data){
                    data = JSON.parse(data);
                    if (data.errFlag == 0) {
                        alert('地址添加成功');
                        window.location.href = 'address.html';
                    } else {
                        alert('地址添加失败');
                    }
                });
            });
        },
        buildAdsSelect:function(levelId, id, contentId, cb ,val){
            Utils.ajaxJson(baseUrl1 + '/address/getCity', {
                levelId: levelId,
                id: id
            }, function (data) {
                $('#' + contentId).empty();
                data = JSON.parse(data);
                if (data.errFlag == 1) {
                    var d = data.list;
                    var html = '';
                    for (var i = 0; i < d.length; i++) {
                        var item = d[i];
                        html += '<option value="' + item.id + '">' + item.name + '</option>';
                    }
                    $('#' + contentId).append(html);
                    if(val){
                        for (var j = 0; j < d.length; j++) {
                            if(val == d[j].id){
                                $('#'+contentId+'-button').find('span').text(d[j].name);
                                $('#' + contentId).val(val);
                            }
                        }
                    }else{
                        $('#'+contentId+'-button').find('span').text(d[0].name);
                    }
                    cb && cb();
                }
            });
        },
        editAddress:function(id){
            var name = $('#name'),
                tel = $('#tel'),
                street = $('#street'),
                province = $('#province'),
                city = $('#city'),
                county = $('#county'),
                _that = this;
            var url = baseUrl1 + '/address/findAddressById';
            Utils.ajaxJson(url, {id:id}, function (data) {
                data = JSON.parse(data);
                name.val(data.name);
                tel.val(data.mobile);
                street.val(data.street);

                _that.buildAdsSelect(1, 0, 'province', function () {
                    var val1 = data.provinceId;
                    _that.buildAdsSelect(2, val1, 'city', function () {
                        var val2 = data.cityId;
                        _that.buildAdsSelect(3, val2, 'county',null,data.districtId);
                    },data.cityId);
                },data.provinceId);

                $('#province').change(function () {
                    var val1 = $(this).val();
                    _that.buildAdsSelect(2, val1, 'city', function () {
                        var val2 = $('#city').val();
                        _that.buildAdsSelect(3, val2, 'county');
                    });
                });
                $('#city').change(function () {
                    var value = $(this).val();
                    _that.buildAdsSelect(3, value, 'county');
                });

                $('#modify-ads-btn').click(function(){
                    var params = {
                        name: name.val(),
                        mobile: tel.val(),
                        provinceId: province.val(),
                        province: province.find('option:selected').text(),
                        cityId: city.val(),
                        city: city.find('option:selected').text(),
                        districtId: county.val(),
                        district: county.find('option:selected').text(),
                        street: street.val(),
                        id:id
                    };

                    if(name.val() == ''){
                        name.parent().parent().find('p').eq(0).show();
                        name.parent().css('box-shadow','0 0 12px #a94442');
                        return false;
                    }
                    if(name.val().length > 20){
                        name.parent().parent().find('p').eq(1).show();
                        name.parent().css('box-shadow','0 0 12px #a94442');
                        return false;
                    }
                    if(tel.val() == ''){
                        tel.closest('.ui-content').find('p').eq(2).show();
                        tel.parent().css('box-shadow','0 0 12px #a94442');
                        return false;
                    }
                    if(!Utils.telRegx(tel.val())){
                        tel.closest('.ui-content').find('p').eq(3).show();
                        tel.parent().css('box-shadow','0 0 12px #a94442');
                        return false;
                    }
                    if(street.val() == ''){
                        street.closest('.ui-content').find('p').eq(4).show();
                        street.parent().css('box-shadow','0 0 12px #a94442');
                        return false;
                    }
                    if(street.val().length > 50){
                        street.parent().parent().find('p').eq(5).show();
                        street.parent().css('box-shadow','0 0 12px #a94442');
                        return false;
                    }
                    var url = baseUrl1+'/address/update';
                    Utils.ajaxJson(url,params,function(data){
                        data = JSON.parse(data);
                        if (data.errFlag == 0) {
                            alert('地址修改成功');
                            window.location.href = 'address.html';
                        } else {
                            alert('地址修改失败');
                        }
                    });
                });
            });
        }
    };

    return _modifyAddress;
});