/**
 * Created by claire on 2015/6/25.
 */
define(['widget/utils'],function(Utils){
    var _index = {
        init:function(){
            this.initPage();
            this.btnConverse();
        },
        initPage:function(){
            var height = window.screen.availHeight;
            $('#index-content').height(height-223);
        },
        btnConverse:function(){
            Utils.ajaxJson(baseUrl1+'/switchTime',{},function(data){
                data = JSON.parse(data);
                if(data.errFlag == 0){
                    $('#index-to-details').before('<button id="index-entrance-purchase" style="display:inline-block;font-weight: normal; width: 100px; height: 35px; line-height: 5px; color: rgb(255, 255, 255); border: 1px solid rgb(55, 189, 214); font-size: 14px; border-radius: 0px; background: rgb(55, 189, 214);" class=" ui-btn ui-shadow ui-corner-all">立即购买</button>');
                    $('#index-entrance-purchase').click(function(){
                        window.location.href = baseUrl1+'choicecar.html';
                    });
                }else if(data.errFlag == 1){
                    $('#index-to-details').before('<button id="index-entrance-order" style="display:inline-block;font-weight:normal;background:#37bdd6;width:100px;height:35px;line-height: 5px;color:#fff;border:1px solid #37bdd6;font-size:14px;border-radius:0;" class=" ui-btn ui-shadow ui-corner-all">免费预约</button>');
                    $('#index-entrance-order').click(function(){
                        window.location.href = baseUrl1+'/subscribe/subscribe.html'
                    });
                }
                $('#index-to-details').click(function(){
                    window.location.href = baseUrl1+'detail.html'
                });
            });
        }
    };

    return _index;
});