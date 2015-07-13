/**
 * Created by claire on 2015/6/27.
 */
define(['widget/utils'],function(Utils){
    var _common = {
        init:function(){
            var _that = this;
            this.menuEvent();
            this.getScript();
            $('#install-content').find('img').width(document.body.scrollWidth);
        },
        getScript:function(){
            var urlArray = document.URL.split('/'),
                docName = urlArray[urlArray.length - 1].split('.')[0];

            if(docName == 'index' || docName == ''){
                require(['include/index'],function(Index){
                    Index.init();
                });
            }
            if(docName == 'login'){
                require(['include/login'],function(Login){
                    Login.init();
                });
            }
            if(docName == 'register'){
                require(['include/register'],function(Register){
                    Register.init();
                });
            }
            if(docName == 'resetpwd' || docName == 'resetpwd2' || docName == 'resetpwd3'){
                require(['include/resetpwd'],function(Resetpwd){
                    Resetpwd.init();
                });
            }
            if(docName == 'choicecar'){
                require(['include/choicecar'],function(Choicecar){
                    Choicecar.init();
                });
            }
            if(docName == 'orderinfo'){
                require(['include/orderinfo'],function(Orderinfo){
                    Orderinfo.init();
                });
            }
            if(docName == 'address'){
                require(['include/address'],function(Address){
                    Address.init();
                });
            }
            if(docName == 'modifyaddress'){
                require(['include/modifyaddress'],function(Modifyaddress){
                    Modifyaddress.init();
                });
            }
            if(docName == 'subscribe'){
                require(['include/subscribe'],function(Subscribe){
                    Subscribe.init();
                });
            }
            if(docName == 'orderlist'){
                require(['include/orderlist'],function(Orderlist){
                    Orderlist.init();
                });
            }
            if(docName == 'ordersuccess'){
                require(['include/ordersuccess'],function(Ordersuccess){
                    Ordersuccess.init();
                });
            }
            if(docName == 'paysuccess' || docName == 'pay_return'){
                require(['include/paysuccess'],function(Paysuccess){
                    Paysuccess.init();
                });
            }
            if(docName == 'carlist'){
                require(['include/carlist'],function(Carlist){
                    Carlist.init();
                });
            }
            if(docName == 'detail'){
                require(['include/detail'],function(Detail){
                    Detail.init();
                });
            }
        },
        menuDisplay:function(){
            $('#menu-list').toggle();
            return false;
        },
        menuEvent:function(){
            var _that = this;
            $('#menu').click(function(){
                _that.menuDisplay();
            });

        }
    };

    return _common;
});