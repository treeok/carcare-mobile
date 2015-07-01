/**
 * Created by claire on 2015/6/30.
 */
define(['widget/utils'],function(Utils) {
    var _orderlist = {
        _num1:1,
        _num2:1,
        init:function(){
            var _that = this;
            this.getOrderList(_that._num1,5);
            this.getSubscribeList(_that._num2,5);

        },
        getOrderList:function(no,size){
            var _that = this;
            var url = baseUrl1 + '/order/order-list.html';
            Utils.ajaxWithLoader(url, {page: no, limit: size}, function (data) {
                data = JSON.parse(data);
                var lists = $('#orderlist-lists');
                var html = '';
                if(data.items.length > 0){
                    for(var i = 0; i<data.items.length;i++){
                        var item = data.items[i];
                        var statusName;
                        switch (item.order.status) {
                            case 1:
                                if (parseInt(item.order.financialStatus) == 3) {
                                    statusName = '付款成功';
                                } else {
                                    statusName = '等待付款';
                                }
                                break;
                            case 3:
                                if (parseInt(item.order.financialStatus) == 3) {
                                    statusName = '付款成功';
                                } else {
                                    statusName = '等待付款';
                                }
                                break;
                            case 6:
                                statusName = '等待收货';
                                break;
                            case  9:
                                statusName = '订单取消';
                                break;
                            case 10:
                                statusName = '订单取消';
                                break;
                            case 15:
                                statusName = '订单完成';
                                break;
                        }
                        html += '<div class="orderlist-list" data-value="'+item.order.code+'"><div class="orderlist-list-title">'+
                        '<div class="orderlist-list-left"><img src="./img/box.png"></div>'+
                        '<div class="orderlist-list-right">'+
                        '<p style="color:#37bdd6;">'+item.orderLines[0].productName+
                        '</p><p>'+item.orderLines[0].price+'</p><p>'+item.orderLines[0].createTime+'</p>'+
                        '</div><a class="ui-link">'+statusName+'</a></div></div>';
                    }
                    lists.append(html);
                    _that.getDetailOrder();
                }else{
                    lists.append('<p style="font-size: 16px;">亲，您暂时没有订单信息哦！</p>');
                }
            });
        },
        getMoreOrders:function(){
            var _that = this;
            var num = _that._num1++;
            $(document).on("pageshow","#orders",function(){
                ///滑动到底部事件
                $(document).unbind("scroll");
                $(document).bind("scroll", function(event){
                    if( $(document).scrollTop() >= $(document).height()-$(window).height() ){
                        _that.getOrderList(num,5);
                    }
                });
            });
            $(document).on("pagehide","#orders",function(){
                $(document).unbind("scroll");
            });

        },
        getSubscribeList:function(no,size){
            var url = baseUrl1 + '/getSubscribeInfo';
            Utils.ajaxWithLoader(url, {pageNo: no, pageSize: size}, function (data) {
                data = JSON.parse(data);
                var lists = $('#subscribe-lists');
                var html = '';
                if (data.subinfo.length > 0) {
                    for (var i = 0; i < data.subinfo.length; i++) {
                        var item = data.subinfo[i];
                        html += '<div class="orderlist-list"><div class="orderlist-list-title">' +
                        '<div class="orderlist-list-left"><img src="'+item.modelImg+'" width="60"></div>' +
                        '<div class="orderlist-list-right">' +
                        '<p style="color:#37bdd6;">' + item.brandName + ' ' +item.modelName + ' ' +item.styleName.slice(0,5) +
                        '</p><p style="color:#37bdd6;">' + item.styleName.slice(5) + '</p><p>' + item.name+ ' ' +item.cdt + '</p>' +
                        '</div></div></div>';
                    }
                    lists.append(html);
                } else {
                    lists.append('<p style="font-size: 16px;">亲，您暂时没有预约信息哦！</p>');
                }
            });
        },
        getMoreSubscribe:function(){
            var _that = this;
            var num = _that._num2++;
            $(document).on("pageshow","#subscribes",function(){
                ///滑动到底部事件
                $(document).unbind("scroll");
                $(document).bind("scroll", function(event){
                    if( $(document).scrollTop() >= $(document).height()-$(window).height() ){
                        _that.getSubscribeList(num,5);
                    }
                });
            });
            $(document).on("pagehide","#subscribes",function(){
                $(document).unbind("scroll");
            });
        },
        getDetailOrder:function(){
            var orderLists = $('#orderlist-lists').find('a');
            orderLists.each(function(){
                $(this).click(function(){
                    var self = $(this);
                    self.removeAttr('href');
                    var code = self.closest('.orderlist-list').attr('data-value');
                    var url = baseUrl1 + '/order/getOrderInfo';
                    Utils.ajaxWithLoader(url, {code:code}, function (data) {
                        data = JSON.parse(data);
                        self.attr('href','#orderdetail');
                        window.location.href = 'orderlist.html#orderdetail';
                        Utils.ajaxJson(baseUrl1 + '/suit/suitCarInfo', {styleId:data.orderLines[0].styleId}, function (data) {
                            data = JSON.parse(data);
                            $('#orders-car').text(data.brandName +' '+data.modelName+' '+data.styleName);
                        });
                        var statusName;
                        switch (data.order.status) {
                            case 1:
                                if (parseInt(data.order.financialStatus) == 3) {
                                    statusName = '付款成功';
                                } else {
                                    statusName = '等待付款';
                                }
                                break;
                            case 3:
                                if (parseInt(data.order.financialStatus) == 3) {
                                    statusName = '付款成功';
                                } else {
                                    statusName = '等待付款';
                                }
                                break;
                            case 6:
                                statusName = '等待收货';
                                break;
                            case  9:
                                statusName = '订单取消';
                                break;
                            case 10:
                                statusName = '订单取消';
                                break;
                            case 15:
                                statusName = '订单完成';
                                break;
                        }
                        $('#orders-status').text(statusName);
                        $('#orders-price').text(data.orderLines[0].price);
                        $('#orders-date').text(data.orderLines[0].createTime);
                        $('#orders-code').text(data.order.code);
                        $('#orders-ads').text(data.consignee.province +' '+data.consignee.city+' '+data.consignee.area+' '+data.consignee.address);
                        $('#orders-name').text(data.consignee.name +' '+data.consignee.mobile);
                        $('#orders-pay').text('支付宝');
                        $('#orders-img')[0].src = data.orderLines[0].productImage;
                        $('#orders-title').text(data.orderLines[0].productName);
                        $('orders-quantity').text('价格:'+data.orderLines[0].price+' '+'数量:'+data.orderLines[0].quantity);

                    });
                });
            });
        }
    };

    return _orderlist;
});