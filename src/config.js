/**
 * Created by claire on 2015/6/25.
 */
var static_domain = 'http://localhost:63342/carcare-mobile/public';
require.config({
    shim: {
        'jquery.mobile-1.4.5.min': {
            deps: ['jquery-1.11.1.min'],
            exports: 'jquery.mobile'
        },
        'jquery-1.11.1.min': {
            exports: '$'
        }
    },
    baseUrl: static_domain+'/lib/',
    paths: {
        'jquery-1.11.1.min': 'jquery-1.11.1.min',
        'jquery.mobile-min': 'jquery.mobile-1.4.5.min',
        include: '../script/include',
        widget: '../script/widget',
        common: '../script'
    }
});
/*function loadCss(url) {
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = url;
    document.getElementsByTagName("head")[0].appendChild(link);
}*/
require(['jquery-1.11.1.min','jquery.mobile-1.4.5.min','common/common'], function ($,Mobile,Common) {
    Common.init();
});
