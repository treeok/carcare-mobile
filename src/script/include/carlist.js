/**
 * Created by claire on 2015/7/2.
 */
define(['widget/utils'],function(Utils){
    var _carlist = {
        init:function(){
            this.initPage();
        },
        initPage:function(){
            var content = $('#carlist-list');
            Utils.ajaxJson(baseUrl1+'/suit/suitCarList',{},function(data){
                data = JSON.parse(data);
                content.empty();
                var contentHtml = '';
                for (var i = 0; i < data.length; i++) {
                    var item = data[i];
                    //生成carList部分
                    contentHtml += '<li data-role="list-divider" style="" class="ui-li-divider ui-bar-inherit ui-first-child">'+item.spell+'</li>';
                    if(item.children.length>0){
                        for(var j = 0;j<item.children.length;j++){
                            var cldItem = item.children[j];
                            contentHtml += '<li class="ui-collapsible ui-collapsible-themed-content ui-collapsible-collapsed ui-li-static ui-body-inherit ui-li-has-icon" data-role="collapsible" data-iconpos="right" data-inset="false" style="padding:0;"><h2 class="ui-collapsible-heading ui-collapsible-heading-collapsed" style="margin:0;"><a href="#" class="ui-collapsible-heading-toggle ui-btn ui-icon-plus ui-btn-icon-right ui-btn-inherit">'+cldItem.brandName+'</a></h2>';
                            if(cldItem.children.length>0){
                                contentHtml += '<div class="ui-collapsible-content ui-body-inherit" style="display: none;"><ul data-role="listview" class="ui-listview">';
                                for(var k = 0;k<cldItem.children.length;k++){
                                    var subItem = cldItem.children[k];
                                    contentHtml += '<li data-icon="false"><a class="ui-btn" data-value="'+subItem.modelId+'">'+subItem.modelName+'</a></li>';
                                }
                                contentHtml += '</ul></div>';
                            }
                            contentHtml += '</li>';
                        }
                    }
                }
                //加载carList部分进入到DOM树
                content.append(contentHtml);
                content.find('.ui-collapsible-heading-toggle').each(function(){
                    $(this).click(function(){
                        $(this).parent().next().toggle();
                        if($(this).hasClass('ui-icon-plus')){
                            $(this).removeClass('ui-icon-plus').addClass('ui-icon-minus');
                        }else{
                            $(this).removeClass('ui-icon-minus').addClass('ui-icon-plus');
                        }
                    });
                });
            });
        }
    };

    return _carlist;
});