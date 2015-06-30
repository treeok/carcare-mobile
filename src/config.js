/**
 * Created by claire on 2015/6/25.
 */
var static_domain = 'http://localhost:63342/carcare-mobile/public';
var baseUrl1 = 'http://10.8.6.35:8088/mobile';
require.config({
    shim: {
        'jquery.mobile-min': {
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
        'jquery.mobile-min': 'jquery.mobile-1.4.5/jquery.mobile-1.4.5.min',
        include: '../script/include',
        widget: '../script/widget',
        common: '../script'
    }
});
require(['jquery-1.11.1.min','jquery.mobile-min','common/common'], function ($,Mobile,Common) {
    Common.init();
});
