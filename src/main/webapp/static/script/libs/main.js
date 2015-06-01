requirejs.config({
    baseUrl: "static/script/libs",
    paths: {
        'app': '../app',
        'template': '../../templates',
        'datatables' : 'datatable.min',
        'mask':'mask',
        'excellentexport':'excellentexport'
    },
    shim: {
        'jquery' : {
            exports : '$'
        },
        'underscore' : {
            exports : '_'
        },
        'jquery.cookie' : {
            deps: ['jquery'],
            exports: '$.cookie'
        },
        'backbone': {
            deps: ['jquery','underscore'],
            exports: 'Backbone'
        } ,
        'bootstrap' : {
            exports : 'bootstrap'
        }
    }
});

require(['jquery', 'backbone', 'app/router','cookie','bootstrap','datatables','mask','excellentexport'], function ($, Backbone, Router) {
    var router = new Router();
    Backbone.history.stop();
    Backbone.history.start();
});