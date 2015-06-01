define(function (require) {
    "use strict";
    //Bağımlılıklar çağırılıyor
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        CityModels          = require('app/models/city'),
        RouteTypeModels     = require('app/models/routetype'),
        RouteModels         = require('app/models/route'),
        StationModels       = require('app/models/station'),
        SysadmuserModels    = require('app/models/sysadmuser'),
        tpl                 = require('text!template/exportexcel.html');

    return Backbone.View.extend({
        el: "#main",
        initialize: function(){
        },
        render: function(){

            if(!$.cookie("userLoggedIn"))
            {
                var router = new Backbone.Route("index");
                router.listPersonalServices();
            }

            var htmlData='<li><a href="#index">Anasayfa</a></li>'+
                '<li class="active">Excel\'e Aktar</li>';
            $("#breadcrumb").html(htmlData);

            htmlData = "";

            var cityData;
            var cityModels = new CityModels.Cities();
            cityModels.fetch({
                async: false,
                success: function(){
                    cityData = cityModels.models;
                }
            });

            var routeTypeData;
            var routeTypeModels = new RouteTypeModels.RouteTypes();
            routeTypeModels.fetch({
                async: false,
                success: function(){
                    routeTypeData = routeTypeModels.models;
                }
            });

            var routeData;
            var routeModels = new RouteModels.Routes();
            routeModels.fetch({
                async: false,
                success: function(){
                    routeData = routeModels.models;
                }
            });

            var stationData;
            var stationModels = new StationModels.Stations();
            stationModels.fetch({
                async: false,
                success: function(){
                    stationData = stationModels.models;
                }
            });

            var sysadmuserData;
            var sysadmuserModels = new SysadmuserModels.SysadmUsers;
            sysadmuserModels.fetch({
                async: false,
                success: function(){
                    sysadmuserData = sysadmuserModels.models;
                }
            });

            SysadmuserModels
            var temp= _.template(tpl, {cityModels: cityData,routeModels:routeData,routeTypeModels:routeTypeData,stationModels:stationData,sysadmuserModels:sysadmuserData});
            this.$el.html(temp);

        }

    });
});

