/**
 * Created by claire on 2015/6/27.
 */
define(['widget/utils'],function(Utils){
    var _common = {
        init:function(){
            var _that = this;
            this.menuEvent();
            this.getScript();
        },
        getScript:function(){
            var urlArray = document.URL.split('/'),
                docName = urlArray[urlArray.length - 1].split('.')[0];
            if(docName == 'login'){
                require(['include/login'],function(Login){
                    Login.init();
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
        },
        menuDisplay:function(){
            $('#menu-list').toggle();
        },
        menuEvent:function(){
            var _that = this;
            $('#menu').on('tap',function(){
                _that.menuDisplay();
            });

        }
    };

    return _common;
});