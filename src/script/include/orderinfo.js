/**
 * Created by claire on 2015/6/29.
 */
define(['widget/utils'],function(Utils){
    var _orderinfo = {
        init:function(){
            var _that = this;
            this.getDefaultAddress();
            this.submitOrder();
        },
        getDefaultAddress:function(){
            var _that = this;
            var url = baseUrl1 + '/address/list';
            Utils.ajaxJson(url, {}, function (data) {
                var container = $('#default-address');
                container.empty();
                data = JSON.parse(data);
                if(data != ''){
                    container.append('<div style="margin:0 15px;position:relative;top:12px;">'+
                    '<p style="margin:0 0 5px;"><img src="./img/user-ads.png"><span class="address-name">'+ data[0].name+'</span><img src="./img/tel.png"><span class="address-tel">'+ data[0].mobile+'</span></p>'+
                    '<p style="margin:0;" class="address-detail"><span class="address-province" data-value="'+data[0].provinceId+'">'+ data[0].province +'</span><span class="address-city" data-value="'+data[0].cityId+'">'+  data[0].city+'</span><span class="address-district" data-value="'+data[0].districtId+'">'+  data[0].district+'</span><span class="address-street">'+ data[0].street+'</span></p><a class="address-arrow" class="ui-link"></a>'+
                    '</div>');
                }else{
                    container.append('<div style="margin:0 15px;position:relative;top:15px;"><a class="address-arrow" class="ui-link"></a></div>');
                }
                container.find('a').click(function(){
                    window.location.href = 'address.html';
                });
            });
        },
        submitOrder: function () {
            var num1 = document.URL.indexOf('?');
            if(num1 > 0){
                var num2 = document.URL.slice(num1).indexOf('styleId');
                var num3 = document.URL.slice(num1).indexOf('upc');
                var upc = document.URL.slice(num1).slice(num3+4);
                var styleId = document.URL.slice(num1).slice(num2+8,num3-1);
                var url1 = baseUrl1 + '/findSkuByUpc';
                Utils.ajaxJson(url1, {upc:upc}, function (data) {
                    data = JSON.parse(data);
                    $('#goods-name').text(data.specifications);
                    $('#goods-price').text(data.price);
                    $('#goods-quantity').text(1);
                    $('#goods-total-price').text(data.price);
                    $('#goods-all-price').text(data.price);
                    $('#goods-all-prices').text('￥'+data.price);

                    $('#order-submit').click(function(){
                        var params = {
                            'provinceId': $('.address-province').attr('data-value'),
                            'cityId': $('.address-city').attr('data-value'),
                            'areaId': $('.address-district').attr('data-value'),
                            'province': $('.address-province').text(),
                            'city': $('.address-city').text(),
                            'area': $('.address-district').text(),
                            'address': $('.address-street').text(),
                            'mobile': $('.address-tel').text(),
                            'name': $('.address-name').text(),
                            'paymentType': 1,
                            'tradeItem': data.id+':'+ 1,
                            'styleId':styleId,
                            'source':2
                        };
                        var url = baseUrl1 + '/order/order-create';
                        Utils.ajaxJson(url, params, function (data) {
                            data = JSON.parse(data);
                            if(data.errFlag == 0){
                                alert('下单成功！');
                                window.location.href = 'ordersuccess.html?code='+data.errMsg;
                            }else{
                                alert('下单失败！');
                            }
                        });
                    });
                });
            }

        }
    };

    return _orderinfo;
});