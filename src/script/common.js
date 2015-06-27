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