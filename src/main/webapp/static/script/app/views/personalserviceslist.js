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
        tpl                 = require('text!template/personalserviceslist.html');

    return Backbone.View.extend({
        el: "#main",
        initialize: function(){
        },
        render: function(){

            var htmlData='<li><a href="#index">Anasayfa</a></li>'+
                '<li class="active">Servisler</li>'+
                '<li><a href="#index" class="btn btn-sm btn-success"><span class="glyphicon glyphicon-list-alt"></span> Seçerek Sorgula</a></li>'+
                '<li><button class="btn btn-sm btn-warning" id="printButton"><span class="glyphicon glyphicon-print"></span> Yazdır</button></li>';
            $("#breadcrumb").html(htmlData);

            var temp = _.template(tpl);
            this.$el.html(temp);

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

            _.each(stationData,function(station){
                htmlData = htmlData + "<tr>";

                _.each(routeData,function(route){
                    if(route.get("route_id") == station.get("route_id"))
                    {
                        _.each(cityData,function(city){
                            if(city.get("city_id") == route.get("city_id"))
                            {
                                htmlData = htmlData + "<td>"+city.get("city_name")+"</td>";
                                return;
                            }
                        });

                        _.each(routeTypeData,function(routeType){
                            if(routeType.get("route_type_id") == route.get("route_type_id"))
                            {
                                htmlData = htmlData + "<td>"+routeType.get("route_type_name")+"</td>";

                                return;
                            }
                        });


                        htmlData = htmlData + "<td>"+route.get("route_name")+"</td>";
                        htmlData = htmlData + "<td>"+route.get("tot_duration")+"</td>";
                        htmlData = htmlData + "<td>"+route.get("peron_no")+"</td>";
                        htmlData = htmlData + "<td>"+route.get("vehicle_type")+"</td>";
                        return;
                    }

                });

                htmlData = htmlData + "<td>"+station.get("station_name")+"</td>";
                htmlData = htmlData + "<td>"+station.get("station_no")+"</td>";
                htmlData = htmlData + "<td>"+station.get("arrival_time")+"</td>";
                htmlData = htmlData + "<td>"+station.get("departure_time")+"</td>";

                htmlData = htmlData + "</tr>";
            });

            $("#stationListServicesTable").html(htmlData);


            var dizi = new Array(true,true,true,true,true,true,true,true,true,true);
            $('#stationListTable').datatable({
                sort: dizi,
                filters: dizi
            }) ;
            $('.datatable-filter').addClass("form-control");


        },
        events:{}

    });
});

