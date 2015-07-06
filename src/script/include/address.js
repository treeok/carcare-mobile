/**
 * Created by claire on 2015/7/1.
 */
define(['widget/utils'],function(Utils){
    var _address = {
        init:function(){
            var _that = this;
            this.getAddressList(function(){
                _that.setDeliveryAds();
            });
            $('#address-lists-add').click(function(){
                window.location.href = baseUrl1+'modifyaddress.html';
            });
            $('#address').find('.title').click(function(){
                window.location.href = baseUrl1+'orderinfo.html';
            });
        },
        getAddressList:function(cb){
            var _that = this;
            var url = baseUrl1 + '/address/list';
            Utils.ajaxJson(url, {}, function (data) {
                var container = $('#address-lists');
                container.empty();
                data = JSON.parse(data);
                var html = '';
                for (var i = 0; i < data.length; i++) {
                    var item = data[i];
                    html += '<div class="address-list" data-value="' + item.id + '" style="background: #fff;border:1px solid #37bdd6;height:155px;">' +
                    '<div style="margin:0 15px;position:relative;top:15px;border-bottom:1px dashed #37bdd6;height:100px;">' +
                    '<p style="margin:0 0 5px;"><span class="address-name" style="margin-right:15px;margin-left:0;">' + item.name + '</span><span class="address-tel">' + item.mobile.slice(0,3)+'****'+ item.mobile.slice(7) + '</span></p>' +
                    '<p style="margin:0 0 15px;" class="address-detail">' + item.province + '' + item.city + '' + item.district + '' + item.street + '</p></a>' +
                    '</div><div style="margin:25px 15px;font-size: 14px;"><div style="color: #929292;position: relative;"><input class="radio" type="radio" name="radio">送到这里去<a class="address-delete-btn ui-link" style="color: #929292;margin-left:15px;font-weight:normal;float:right;">删除</a><a class="address-edit-btn ui-link" style="color: #929292;font-weight:normal;float:right;">修改</a></div></div></div>';
                }
                container.append(html);
                $('.address-edit-btn').each(function(){
                    $(this).click(function(){
                        var id = $(this).closest('.address-list').attr('data-value');
                        window.location.href = 'modifyaddress.html?id='+id;
                    });
                });
                $('.address-delete-btn').each(function(){
                    $(this).click(function(){
                        var id = $(this).closest('.address-list').attr('data-value');
                        Utils.ajaxJson(baseUrl1 + '/address/delete', {id: id}, function (data) {
                            data = JSON.parse(data);
                            if (data.errFlag == 0) {
                                alert('删除成功');
                                _that.getAddressList();
                            }
                        });
                    });
                });

                cb && cb();
            });
        },
        setDeliveryAds:function(){
            $('#address').find('[name=radio]').each(function(){
                $(this).click(function(){
                    var id = $(this).closest('.address-list').attr('data-value');
                    var params = {
                        id:id,
                        defaultAddress:1
                    };
                    var url = baseUrl1+'/address/updateDefaultAddress';
                    Utils.ajaxJson(url,params,function(data){
                        data = JSON.parse(data);
                        if (data.errFlag == 0) {
                            window.location.href = baseUrl1+'orderinfo.html?styleId='+styleId+'&upc='+upc;
                        }
                    });
                });

            });
        }
    };

    return _address;
});