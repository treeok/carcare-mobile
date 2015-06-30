/**
 * Created by claire on 2015/6/29.
 */
define(['widget/utils'],function(Utils){
    var _orderinfo = {
        init:function(){
            var _that = this;
            this.getDefaultAddress();
            this.getAddressList();
        },
        getAddressList:function(){
            $('#address-lists').empty();
            var url = baseUrl1 + '/address/test';
            Utils.ajaxJson(url, {}, function (data) {
                data = JSON.parse(data);
                var html = '';
                for(var i = 0 ;i <data.length;i++){
                    var item = data[i];
                    html += '<div class="address-list">'+
                    '<div style="margin:0 15px;position:relative;top:15px;">'+
                    '<p style="margin:0;"><img src="./img/user-ads.png"><span class="address-name">'+item.name+'</span><img src="./img/tel.png"><span class="address-tel">'+item.mobile+'</span></p>'+
                    '<p style="margin:0;" class="address-detail">'+item.province +''+ item.city+''+ item.district+''+item.street+'</p><a class="address-arrow" href="#edit-address" class="ui-link"></a>'+
                    '</div></div>';
                }
                $('#address-lists').append(html);
            });
        },
        getDefaultAddress:function(){
            var url = baseUrl1 + '/address/test';
            Utils.ajaxJson(url, {}, function (data) {
                $('#default-address').empty();
                data = JSON.parse(data);
                if(data != ''){
                    var item = data[0];
                    var html = '<div style="margin:0 15px;position:relative;top:15px;">'+
                        '<p style="margin:0;"><img src="./img/user-ads.png"><span class="address-name">'+item.name+'</span><img src="./img/tel.png"><span class="address-tel">'+item.mobile+'</span></p>'+
                        '<p style="margin:0;" class="address-detail">'+item.province +''+ item.city+''+ item.district+''+item.street+'</p><a class="address-arrow" href="#address" class="ui-link"></a>'+
                        '</div>';
                    $('#default-address').append(html);
                }else{
                    $('#default-address').append('<div style="margin:0 15px;position:relative;top:15px;"><a class="address-arrow" href="#address" class="ui-link"></a></div>');
                }
            });
        },
        addAddress:function(){
            
        }
    };

    return _orderinfo;
});