define(function (require) {
    "use strict";
    //Bağımlılıklar çağırılıyor
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        RouteTypeModels     = require('app/models/routetype'),
        RouteModels         = require('app/models/route'),
        CityModels          = require('app/models/city'),
        StationModels       = require('app/models/station'),
        tpl                 = require('text!template/stations.html');

    var routeData, routeTypeData, cityData, stationData;

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
                '<li class="active">Duraklar</li>'+
                '<li><button class="btn btn-sm btn-warning" id="printButton"><span class="glyphicon glyphicon-print"></span> Yazdır</button></li>';
            $("#breadcrumb").html(htmlData);


            var routeType = new RouteTypeModels.RouteTypes();
            routeType.fetch({
                async: false,
                success: function(){
                    routeTypeData = routeType.models;
                }
            });


            var city = new CityModels.Cities();
            city.fetch({
                async: false,
                success: function(){
                    cityData = city.models;
                }
            });


            var station = new StationModels.Stations();
            station.fetch({
                async: false,
                success: function(){
                    stationData = station.models;
                }
            });

            var route = new RouteModels.Routes;
            route.fetch({
                async: false,
                success: function(){
                    routeData = route.models;
                }
            });

            var temp= _.template(tpl, {routeTypeModels: routeTypeData,routeModels:routeData,cityModels:cityData,stationModels:stationData});
            this.$el.html(temp);

            $("#stationInputTextStationNo").mask('00', {'translation': {0: {pattern: /[0-9*]/}}});
            $('#stationInputTextArrivalTime').mask('00:00');
            $('#stationInputTextDepartureTime').mask('00:00');


            $('.stationEditDivInputArrivalTime input').mask('00:00');
            $('.stationEditDivInputDepartureTime input').mask('00:00');
            $('.stationEditDivInputStationNo input').mask('00', {'translation': {0: {pattern: /[0-9*]/}}});

            /*
            var dizi = new Array(false,true,true,false,true,true,true,true,false);
            $('#stationsPageTableSearch').datatable({
                sort: dizi,
                filters: dizi
            }) ;
            $('.datatable-filter').addClass("form-control");
            */
        },
        events:{
            'click #stationSaveButton'          : 'stationSaveButton',
            'click .stationDeleteButton'        : 'stationDeleteButton',

            'dblclick .stationEditDivStationId'    : 'stationEditDiv',
            'dblclick .stationEditDivCityName'     : 'stationEditDiv',
            'dblclick .stationEditDivRouteTypeName': 'stationEditDiv',
            'dblclick .stationsEditDivRoute'       : 'stationEditDiv',
            'dblclick .stationEditDivStationName'  : 'stationEditDiv',
            'dblclick .stationEditDivStationNo'    : 'stationEditDiv',
            'dblclick .stationEditDivArrivalTime'  : 'stationEditDiv',
            'dblclick .stationEditDivDepartureTime': 'stationEditDiv',

            'click .stationEditDivCancel'       : 'stationEditDivCancel',
            'click .stationEditDivSubmit'       : 'stationEditDivSubmit'
        },
        dataRefresh:function(){
            var htmlData,routeTypeModels,cityModels,stationModels,routeModels;


            var routeType = new RouteTypeModels.RouteTypes();
            routeType.fetch({
                async: false,
                success: function(){
                   routeTypeModels = routeType.models;
                }
            });


            var city = new CityModels.Cities();
            city.fetch({
                async: false,
                success: function(){
                   cityModels = city.models;
                }
            });


            var station = new StationModels.Stations();
            station.fetch({
                async: false,
                success: function(){
                    stationModels = station.models;
                }
            });

            var route = new RouteModels.Routes;
            route.fetch({
                async: false,
                success: function(){
                   routeModels = route.models;
                }
            });

            _.each(stationModels, function(station){

                var cityData,routeTypeData,routeData,routeDataId;

                _.each(routeModels, function(route){
                if(station.get("route_id")==route.get("route_id"))
                {
                    routeData = route.get("route_name");
                    routeDataId = route.get("route_id");

                    _.each(cityModels, function(city){
                        if(route.get("city_id")==city.get("city_id"))
                        {
                        cityData = city.get("city_name");
                        }
                     });

                    _.each(routeTypeModels, function(routeType){
                        if(route.get("route_type_id")==routeType.get("route_type_id"))
                        {
                        routeTypeData = routeType.get("route_type_name");
                        }
                    });
                }
            });

            htmlData+='<tr>';
            htmlData+='<td style="width: 5%">';
            htmlData+='<div class="stationEditDivStationId"  id="s_'+station.get('station_id')+'" style="width: 100%">'+station.get("station_id")+'</div>';
            htmlData+='</td>';
            htmlData+='<td>';
            htmlData+='<div class="stationEditDivCityName"  id="s_'+station.get('station_id')+'" style="width: 100%">'+cityData+'</div>';
            htmlData+='</td>';
            htmlData+='<td>';
            htmlData+='<div class="stationEditDivRouteTypeName"  id="s_'+station.get('station_id')+'" style="width: 100%">'+routeTypeData+'</div>';
            htmlData+='</td>';
            htmlData+='<td>';
            htmlData+='<div class="stationsEditDivRoute" style="width: 100%" id="route_'+station.get('station_id')+'">'+routeData+'</div>';
            htmlData+='<div class="stationsEditDivInputRoute" id="inputRoute'+station.get('station_id')+'" style="display:none;">';
            htmlData+='<select class="form-control">';

            _.each(routeModels, function(route2){
                if(route2.get("route_id")==routeDataId)
                {
                    htmlData+='<option value="'+route2.get('route_id')+'" selected>'+route2.get('route_name')+'</option>';
                }
                else
                {
                    htmlData+='<option value="'+route2.get('route_id')+'">'+route2.get('route_name')+'</option>';
                }
            });
            htmlData+='</select>';
            htmlData+='</div>';
            htmlData+='</td>';
            htmlData+='<td>';
            htmlData+='<div class="stationEditDivStationName" style="width: 100%" id="stationName_'+station.get('station_id')+'">'+station.get('station_name')+'</div>';
            htmlData+='<div class="stationEditDivInputStationName" id="inputStationName'+station.get('station_id')+'" style="display:none;">';
            htmlData+='<input type="text" class="form-control" value="'+station.get('station_name')+'">';
            htmlData+='</div>';
            htmlData+='</td>';
            htmlData+='<td>';
            htmlData+='<div class="stationEditDivStationNo" style="width: 100%" id="stationNo_'+station.get('station_id')+'">'+station.get('station_no')+'</div>';
            htmlData+='<div class="stationEditDivInputStationNo" id="inputStationNo'+station.get('station_id')+'" style="display:none;">';
            htmlData+='<input type="text" class="form-control" value="'+station.get('station_no')+'">';
            htmlData+='</div>';
            htmlData+='</td>';
            htmlData+='<td>';
            htmlData+='<div class="stationEditDivArrivalTime" style="width: 100%" id="arrivalTime_'+station.get('station_id')+'">'+station.get('arrival_time')+'</div>';
            htmlData+='<div class="stationEditDivInputArrivalTime" id="inputArrivalTime'+station.get('station_id')+'" style="display:none;">';
            htmlData+='<input type="text" class="form-control" value="'+station.get('arrival_time')+'">';
            htmlData+='</div>';
            htmlData+='</td>';
            htmlData+='<td>';
            htmlData+='<div class="stationEditDivDepartureTime" style="width: 100%" id="departureTime_'+station.get('station_id')+'">'+station.get('departure_time')+'</div>';
            htmlData+='<div class="stationEditDivInputDepartureTime" id="inputDepartureTime'+station.get('station_id')+'" style="display:none;">';
            htmlData+='<input type="text" class="form-control" value="'+station.get('departure_time')+'">';
            htmlData+='</div>';
            htmlData+='</td>';
            htmlData+='<td>';
            htmlData+='<div class="stationSubmitAndCancelButton" id="buttonGroups'+station.get('station_id')+'" style="display: none; width: 80px;">';
            htmlData+='<button style="float: left; margin-right: 10px;" class="btn btn-sm btn-primary stationEditDivSubmit"  id="submit_'+station.get('station_id')+'"><span class="glyphicon glyphicon-ok"></span></button>';
            htmlData+='<button style="float: left;" class="btn btn-sm btn-warning stationEditDivCancel" id="cancel_'+station.get('station_id')+'"><span class="glyphicon glyphicon-remove"></span></button>';
            htmlData+='</div>';
            htmlData+='<div class="stationSubmitAndCancelButtonDelete" id="buttonGroupsDelete'+station.get('station_id')+'">';
            htmlData+='<button class="btn btn-sm btn-danger stationDeleteButton" id="'+station.get('station_id')+'"><span class="glyphicon glyphicon-trash"></span></button>';
            htmlData+='</div>';
            htmlData+='</td>';
            htmlData+='</tr>';
        });

            $("#stationsPageTable").html(htmlData);

        },
        stationEditDivSubmit:function(e){var id = e.target.id;
            id= id.split("_");


            var inputRoute = $("#inputRoute"+id[1]+" select").val().trim();
            var inputStationName = $("#inputStationName"+id[1]+" input").val().trim();
            var inputStationNo = $("#inputStationNo"+id[1]+" input").val().trim();
            var inputArrivalTime = $("#inputArrivalTime"+id[1]+" input").val().trim();
            var inputDepartureTime = $("#inputDepartureTime"+id[1]+" input").val().trim();


            var date = new Date();
            var stationModel = new StationModels.Station({station_id: id[1]});
             stationModel.fetch({
                async: false,
                success: function (station) {

                    station = station.toJSON();

                    var stationModel1 = new StationModels.Station({station_id: id[1],station_name:inputStationName,route_id:inputRoute,station_no:inputStationNo,arrival_time:inputArrivalTime,departure_time:inputDepartureTime,lastupd_uid:$.cookie("sysadm_uid"),lastupd_date:date,create_date:station.create_date,create_uid:station.create_uid});
                    stationModel1.save(null,{
                        async: false,
                        success: function(){
                            console.log("Güncelleme Başarılı");

                        }
                    });
                }
            });

            $("#"+id[1]).toggle();
            $("#input"+id[1]).toggle();

            this.dataRefresh();
        },
        stationEditDiv: function(e){
            var id = e.target.id;
            id= id.split("_");

            $(".stationSubmitAndCancelButtonDelete").show();
            $(".stationSubmitAndCancelButton").hide();

            $(".stationEditDivStationId").show();
            $(".stationEditDivCityName").show();
            $(".stationEditDivRouteTypeName").show();

            $(".stationsEditDivRoute").show();
            $(".stationsEditDivInputRoute").hide();

            $(".stationEditDivStationName").show();
            $(".stationEditDivInputStationName").hide();

            $(".stationEditDivStationNo").show();
            $(".stationEditDivInputStationNo").hide();

            $(".stationEditDivArrivalTime").show();
            $(".stationEditDivInputArrivalTime").hide();

            $(".stationEditDivDepartureTime").show();
            $(".stationEditDivInputDepartureTime").hide();



            $("#route_"+id[1]).toggle();
            $("#inputRoute"+id[1]).toggle();

            $("#stationName_"+id[1]).toggle();
            $("#inputStationName"+id[1]).toggle();

            $("#stationNo_"+id[1]).toggle();
            $("#inputStationNo"+id[1]).toggle();

            $("#arrivalTime_"+id[1]).toggle();
            $("#inputArrivalTime"+id[1]).toggle();

            $("#departureTime_"+id[1]).toggle();
            $("#inputDepartureTime"+id[1]).toggle();



            $("#buttonGroups"+id[1]).toggle();
            $("#buttonGroupsDelete"+id[1]).toggle();

        },
        stationEditDivCancel:function(e){
            var id = e.target.id;
            id= id.split("_");

            $("#route_"+id[1]).toggle();
            $("#inputRoute"+id[1]).toggle();

            $("#stationName_"+id[1]).toggle();
            $("#inputStationName"+id[1]).toggle();

            $("#stationNo_"+id[1]).toggle();
            $("#inputStationNo"+id[1]).toggle();

            $("#arrivalTime_"+id[1]).toggle();
            $("#inputArrivalTime"+id[1]).toggle();

            $("#departureTime_"+id[1]).toggle();
            $("#inputDepartureTime"+id[1]).toggle();



            $("#buttonGroups"+id[1]).toggle();
            $("#buttonGroupsDelete"+id[1]).toggle();
        },
        stationSaveButton: function(){

            var date = new Date();

            var stationInputTextRoute = $("#stationInputTextRoute").val().trim();
            var stationInputTextStationName = $("#stationInputTextStationName").val().trim();
            var stationInputTextStationNo = $("#stationInputTextStationNo").val().trim();
            var stationInputTextArrivalTime = $("#stationInputTextArrivalTime").val().trim();
            var stationInputTextDepartureTime = $("#stationInputTextDepartureTime").val().trim();

            if(stationInputTextRoute != null          && stationInputTextRoute != undefined         && stationInputTextRoute != ""        &&
                stationInputTextStationName != null   && stationInputTextStationName != undefined   && stationInputTextStationName != ""  &&
                stationInputTextStationNo != null     && stationInputTextStationNo != undefined     && stationInputTextStationNo != ""    &&
                stationInputTextArrivalTime != null   && stationInputTextArrivalTime != undefined   && stationInputTextArrivalTime != ""  &&
                stationInputTextDepartureTime != null && stationInputTextDepartureTime != undefined && stationInputTextDepartureTime != "")
            {
                //UserId alınacak
                var dizi={station_name:stationInputTextStationName,route_id:stationInputTextRoute,station_no:stationInputTextStationNo,arrival_time:stationInputTextArrivalTime,departure_time:stationInputTextDepartureTime,create_uid:$.cookie("sysadm_uid"),create_date:date};
                console.log(dizi);
                var stationModels1 = new StationModels.Station({station_name:stationInputTextStationName,route_id:stationInputTextRoute,station_no:stationInputTextStationNo,arrival_time:stationInputTextArrivalTime,departure_time:stationInputTextDepartureTime,create_uid:$.cookie("sysadm_uid"),create_date:date});
                stationModels1.save(null,{
                    async: false,
                    success: function(){
                        console.log("Kayıt Başarılı");
                    }
                });

                $("#stationInputTextRoute").val("");
                $("#stationInputTextStationName").val("");
                $("#stationInputTextStationNo").val("");
                $("#stationInputTextArrivalTime").val("");
                $("#stationInputTextDepartureTime").val("");

                this.dataRefresh();
            }
            else
            {
                alert("Lütfen Boş Bırakmayınız...");
            }

        },
        stationDeleteButton: function(e){
            var stationModels = new StationModels.Station({station_id: e.target.id});
            stationModels.destroy({
                async: false,
                success: function(){
                    console.log(":"+e.target.id+" Silindi");

                }
            });

            this.dataRefresh();
        }


    });
});

