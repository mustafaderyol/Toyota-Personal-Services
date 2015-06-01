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
        tpl                 = require('text!template/personalservicessearch.html');

    return Backbone.View.extend({
        el: "#main",
        initialize: function(){

        },
        render: function(){

            var htmlData='<li><a href="#index">Anasayfa</a></li>'+
                '<li class="active">Servisler</li>'+
                '<li><a href="#listPersonalServices" class="btn btn-sm btn-success"><span class="glyphicon glyphicon-list-alt"></span> Listeden Sorgula</a></li>'+
                '<li><button class="btn btn-sm btn-warning" id="printButton"><span class="glyphicon glyphicon-print"></span> Yazdır</button></li>';
            $("#breadcrumb").html(htmlData);

            var selectData;

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


            selectData= _.template(tpl, {cityModels: cityData,routeTypeModels: routeTypeData});

            this.$el.html(selectData);

        },
        events:{
            'change #sehirselect'           : 'sehirAndGuzergahTipiSelectChange',
            'change #guzergahtipiselect'    : 'sehirAndGuzergahTipiSelectChange',
            'change #guzergahselect'        : 'guzergahSelectChange',
            'change #durakselect'           : 'durakSelectChange'
        },
        sehirAndGuzergahTipiSelectChange: function(){
            var selectSehir         = $("#sehirselect").val();
            var selectGuzergahTipi  = $("#guzergahtipiselect").val();
            if(selectSehir != null && selectSehir != undefined && selectSehir != "" &&
                selectGuzergahTipi != null && selectGuzergahTipi != undefined && selectGuzergahTipi != "")
            {

                var htmlData = "<option value=''>Güzergah Seçiniz...</option>";
                var routeModels = new RouteModels.RTAndCRoutes();
                routeModels.fetch({
                    data:{city_id:selectSehir,route_type_id:selectGuzergahTipi},
                    async: false,
                    success: function(){
                        _.each(routeModels.models,function(row){
                            htmlData = htmlData+"<option value='"+row.get("route_id")+"'>"+row.get("route_name")+"</option> ";
                        });
                    }
                });

                $("#guzergahselect").html(htmlData);
                $("#guzergahselect").removeAttr('disabled');
            }
        },
        guzergahSelectChange: function(){

            var selectGuzergah  = $("#guzergahselect").val();
            if(selectGuzergah != null && selectGuzergah != undefined && selectGuzergah != "")
            {
                var resultData;
                var routeModel = new RouteModels.Route();
                routeModel.fetch({
                    data:{id:selectGuzergah},
                    async: false,
                    success: function(data){
                        resultData = data.toJSON();
                        resultData = resultData[0];
                    }
                });

                $("#tot_duration").html(resultData["tot_duration"]);
                $("#peron_no").html(resultData["peron_no"]);
                $("#vehicle_type").html(resultData["vehicle_type"]);

                var htmlSelectData = "<option value=''>Durak Seçiniz...</option>";
                var htmlTableData = "";
                var stationModels = new StationModels.GetRStations();
                stationModels.fetch({
                    data:{route_id:selectGuzergah},
                    async: false,
                    success: function(){
                        _.each(stationModels.models,function(row){
                            htmlTableData = htmlTableData +"<tr>" +
                                "<td>"+row.get("station_name")+"</td>" +
                                "<td>"+row.get("station_no")+"</td>" +
                                "<td>"+row.get("arrival_time")+"</td>" +
                                "<td>"+row.get("departure_time")+"</td>" +
                                "</tr>";

                            htmlSelectData = htmlSelectData+"<option value='"+row.get("station_id")+"'>"+row.get("station_name")+"</option> ";
                        });
                    }
                });


                $("#durakselect").html(htmlSelectData);
                $("#durakselect").removeAttr('disabled');


                $("#stationTable").html(htmlTableData);
            }
        },
        durakSelectChange: function(){
            var selectDurak  = $("#durakselect").val();
            var selectGuzergah  = $("#guzergahselect").val();
            if(selectDurak != null && selectDurak != undefined && selectDurak != "")
            {
                var htmlTableData = "";
                var stationModels = new StationModels.Station({station_id:selectDurak});
                stationModels.fetch({
                    async: false,
                    success: function(data){
                        var resultData = data.toJSON();
                            htmlTableData = htmlTableData +"<tr>" +
                                "<td>"+resultData["station_name"]+"</td>" +
                                "<td>"+resultData["station_no"]+"</td>" +
                                "<td>"+resultData["arrival_time"]+"</td>" +
                                "<td>"+resultData["departure_time"]+"</td>" +
                                "</tr>";

                    }
                });
            }
            else
            {
                var htmlTableData = "";
                var stationModels = new StationModels.GetRStations();
                stationModels.fetch({
                    data:{route_id:selectGuzergah},
                    async: false,
                    success: function(){
                        _.each(stationModels.models,function(row){
                            htmlTableData = htmlTableData +"<tr>" +
                                "<td>"+row.get("station_name")+"</td>" +
                                "<td>"+row.get("station_no")+"</td>" +
                                "<td>"+row.get("arrival_time")+"</td>" +
                                "<td>"+row.get("departure_time")+"</td>" +
                                "</tr>";

                        });
                    }
                });
            }

            $("#stationTable").html(htmlTableData);
        }

    });
});

