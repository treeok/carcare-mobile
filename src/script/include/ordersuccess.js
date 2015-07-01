/**
 * Created by claire on 2015/7/1.
 */
/**
 * Created by claire on 2015/7/1.
 */
define(['widget/utils'],function(Utils){
    var _orderSuccess = {
        init:function(){
            var _that = this;
            var urlArray = document.URL.indexOf('?');
            if(urlArray > 0){
                var code = document.URL.slice(urlArray).slice(6);
                console.log(code);
                _that.defaultPage(code);
            }
        },
        defaultPage:function(code){
            var url = baseUrl1 + '/order/getOrderInfo';
            Utils.ajaxJson(url,{code:code},function(data){
                data = JSON.parse(data);
                $('#ordersuccess-code').text(data.order.code);
                $('#ordersuccess-address').text(data.consignee.province+data.consignee.city+data.consignee.area+data.consignee.address);

            })
        }
    };

    return _orderSuccess;
});