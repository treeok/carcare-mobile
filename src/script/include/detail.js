/**
 * Created by claire on 2015/7/6.
 */
define(['widget/utils'],function(Utils){
    var _detail = {
        init:function(){
            this.initPage();
            this.btnConverse();
        },
        initPage:function(){
            $('#funciton').find('img').width(document.body.scrollWidth);
            $('#earn').find('img').width(document.body.scrollWidth);
        },
        btnConverse:function(){
            Utils.ajaxJson(baseUrl1+'/switchTime',{},function(data){
                data = JSON.parse(data);
                $('#detail').find('.footer').empty();
                if(data.errFlag == 0){
                    $('#detail').find('.footer').append('<button id="details-purchase-btn" style="float:right;background:#f65b19;color:#fff;font-weight:normal;margin-right:15px;" data-corners="false" class="ui-btn ui-shadow">立即购买</button>');
                    $('#details-purchase-btn').click(function(){
                        window.location.href = baseUrl1+'/choicecar.html';
                    });
                }else if(data.errFlag == 1){
                    $('#detail').find('.footer').append('<button id="details-subscribe-btn" style="float:right;background:#f65b19;color:#fff;font-weight:normal;margin-right:15px;" data-corners="false" class="ui-btn ui-shadow">免费预约</button>');
                    $('#details-subscribe-btn').click(function(){
                        window.location.href = baseUrl1+'/subscribe/subscribe.html';
                    });
                }
            });
        }
    };

    return _detail;
});