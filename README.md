# carcare-mobile

requirejs+gulp+jqmobile

目录：
carcare-mobile //使用jqm 开发的carcare移动端官网
--src   //静态资源
----css 
----img
----lib
----script
------include  // 页面JS对象，对各个属性和方法的封装
------widget   // 一些可继承的对象(例如：alert.js)和Utils
------common.js  //针对每个页面所需要的js模块进行设置 按需加载
----config.js  //整个项目js文件的配置，主要是requirejs的一些配置
--view       // jade 模板引擎
--gulpfile.js  // 使用gulp 进行开发以及打包发布
--package.json  // 
