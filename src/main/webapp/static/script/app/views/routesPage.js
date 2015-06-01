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
        tpl                 = require('text!template/routesPage.html');

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
                '<li class="active">Güzergahlar</li>'+
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

            $("#routesPageInputTextTotDuration").mask('000', {'translation': {0: {pattern: /[0-9*]/}}});
            $("#routesPageInputTextPeronNo").mask('00', {'translation': {0: {pattern: /[0-9*]/}}});

            $('.routesPageEditDivInputTotDuration input').mask('000', {'translation': {0: {pattern: /[0-9*]/}}});
            $('.routesPageEditDivInputPeronNo input').mask('00', {'translation': {0: {pattern: /[0-9*]/}}});
            /*
            var dizi = new Array(false,true,true,true,true,true,true,false);
            $('#routesPageTableSearch').datatable({
                sort: dizi,
                filters: dizi
            }) ;
            $('.datatable-filter').addClass("form-control");
            */
        },
        events:{
            'click #routesPageSaveButton' : 'routesPageSaveButton',
            'click .routesPageDeleteButton': 'routesPageDeleteButton',
            'dblclick .routesPageEditDivCity'  : 'routesPageEditDiv',
            'dblclick .routesPageEditDivRoute': 'routesPageEditDiv',
            'dblclick .routesPageEditDivRouteType': 'routesPageEditDiv',
            'dblclick .routesPageEditDivTotDuration': 'routesPageEditDiv',
            'dblclick .routesPageEditDivPeronNo': 'routesPageEditDiv',
            'dblclick .routesPageEditDivVehicleType': 'routesPageEditDiv',
            'click .routesPageEditDivCancel': 'routesPageEditDivCancel',
            'click .routesPageEditDivSubmit':'routesPageEditDivSubmit'
        },
        dataRefresh:function(){
            var htmlData;

            var routeModels = new RouteModels.Routes;
            routeModels.fetch({
                async: false,
                success: function(){
                _.each(routeModels.models, function(route){
                    var count=0;

                    var stationModels = new StationModels.Stations();
                    stationModels.fetch({
                        async: false,
                        success: function(){

                        _.each(stationModels.models, function(station){
                            if(station.get("route_id")==route.get("route_id"))
                            {
                            count++;
                            }
                        });
                        }
                    });

                    htmlData+='<tr>';
                    htmlData+='<td style="width: 5%">';
                    htmlData+=route.get("route_id");
                    htmlData+='</td>';
                    htmlData+='<td>';
                    htmlData+='<div class="routesPageEditDivRoute" style="width: 100%" id="route_'+route.get('route_id')+'">'+route.get('route_name')+'</div>';
                    htmlData+='<div class="routesPageEditDivInputRoute" id="inputRoute'+route.get('route_id')+'" style="display:none;">';
                    htmlData+='<input type="text" class="form-control" value="'+route.get('route_name')+'">';
                    htmlData+='</div>';
                    htmlData+='</td>';
                    htmlData+='<td>';
                    var cityModels = new CityModels.Cities();
                    cityModels.fetch({
                        async: false,
                        success: function(){
                         _.each(cityModels.models, function(city){
                            if(route.get("city_id")==city.get("city_id"))
                            {

                                htmlData+='<div class="routesPageEditDivCity" style="width: 100%" id="city_'+route.get('route_id')+'">'+city.get("city_name")+'</div>';
                                htmlData+='<div class="routesPageEditDivInputCity" id="inputCity'+route.get('route_id')+'" style="display:none;">';
                                htmlData+='<select class="form-control">';

                                 _.each(cityModels.models, function(city2){
                                    if(route.get("city_id")==city2.get("city_id"))
                                    {

                                        htmlData+='<option value="'+city2.get('city_id')+'" selected>'+city2.get('city_name')+'</option>';
                                    }else{
                                        htmlData+='<option value="'+city2.get('city_id')+'">'+city2.get('city_name')+'</option>';
                                    }
                                });
                                htmlData+='</select>';
                                htmlData+='</div>';
                            }

                         });

                        }
                    });
                    htmlData+='</td>';
                    htmlData+='<td>';
                    var routeTypeModels = new RouteTypeModels.RouteTypes();
                    routeTypeModels.fetch({
                        async: false,
                        success: function(){
                         _.each(routeTypeModels.models, function(routeType){
                            if(route.get("route_type_id")==routeType.get("route_type_id"))
                            {
                                htmlData+='<div class="routesPageEditDivRouteType" style="width: 100%" id="routeType_'+route.get('route_id')+'">'+routeType.get("route_type_name")+'</div>';
                                htmlData+='<div class="routesPageEditDivInputRouteType" id="inputRouteType'+route.get('route_id')+'" style="display:none;">';
                                htmlData+='<select class="form-control">';

                                _.each(routeTypeModels.models, function(routeType2){
                                    if(route.get("route_type_id")==routeType2.get("route_type_id"))
                                    {
                                        htmlData+='<option value="'+routeType2.get('route_type_id')+'" selected>'+routeType2.get('route_type_name')+'</option>';
                                    }
                                    else
                                    {
                                        htmlData+='<option value="'+routeType2.get('route_type_id')+'">'+routeType2.get('route_type_name')+'</option>';
                                    }
                                });
                                htmlData+='</select>';
                                htmlData+='</div>';
                             }


                         });
                        }
                    });
                    htmlData+='</td>';
                    htmlData+='<td>';
                    htmlData+='<div class="routesPageEditDivTotDuration" style="width: 100%" id="totDuration_'+route.get('route_id')+'">'+route.get('tot_duration')+'</div>';
                    htmlData+='<div class="routesPageEditDivInputTotDuration" id="inputTotDuration'+route.get('route_id')+'" style="display:none;">';
                    htmlData+='<input type="text" maxlength="5" class="form-control" value="'+route.get('tot_duration')+'">';
                    htmlData+='</div>';
                    htmlData+='</td>';

                    htmlData+='<td>';
                    htmlData+='<div class="routesPageEditDivPeronNo" style="width: 100%" id="peronNo_'+route.get('route_id')+'">'+route.get('peron_no')+'</div>';
                    htmlData+='<div class="routesPageEditDivInputPeronNo" id="inputPeronNo'+route.get('route_id')+'" style="display:none;">';
                    htmlData+='<input type="text" class="form-control" value="'+route.get('peron_no')+'">';
                    htmlData+='</div>';
                    htmlData+='</td>';

                    htmlData+='<td>';
                    htmlData+='<div class="routesPageEditDivVehicleType" style="width: 100%" id="vehicleType_'+route.get('route_id')+'">';

                    if(route.get("vehicle_type")=="1")
                    {
                        htmlData+='Midibüs';
                    }
                    else if(route.get("vehicle_type")=="2")
                    {
                        htmlData+='Minibüs';
                    }
                    else
                    {
                        htmlData+='Otobüs';
                    }
                    htmlData+='</div>';
                    htmlData+='<div class="routesPageEditDivInputVehicleType" id="inputVehicleType'+route.get('route_id')+'" style="display:none;">';
                    htmlData+='<select class="form-control">';
                    if(route.get("vehicle_type")=="1")
                    {

                        htmlData+='<option value="1" selected>Midibüs</option>';
                        htmlData+='<option value="2">Minibüs</option>';
                        htmlData+='<option value="3">Otobüs</option>';
                    }
                    else if(route.get("vehicle_type")=="2")
                    {
                        htmlData+='<option value="1">Midibüs</option>';
                        htmlData+='<option value="2" selected>Minibüs</option>';
                        htmlData+='<option value="3">Otobüs</option>';
                    }
                    else
                    {
                        htmlData+='<option value="1">Midibüs</option>';
                        htmlData+='<option value="2">Minibüs</option>';
                        htmlData+='<option value="3" selected>Otobüs</option>';
                    }

                    htmlData+='</select>';
                    htmlData+='</div>';
                    htmlData+='</td>';

                    htmlData+='<td>';
                    htmlData+='<div class="routesPageSubmitAndCancelButton" id="buttonGroups'+route.get('route_id')+'" style="display: none; width: 80px;">';
                    htmlData+='<button style="float: left; margin-right: 10px;" class="btn btn-sm btn-primary routesPageEditDivSubmit"  id="submit_'+route.get('route_id')+'"><span class="glyphicon glyphicon-ok"></span></button>';
                    htmlData+='<button style="float: left;" class="btn btn-sm btn-warning routesPageEditDivCancel" id="cancel_'+route.get('route_id')+'"><span class="glyphicon glyphicon-remove"></span></button>';
                    htmlData+='</div>';
                    htmlData+='<div class="routesPageSubmitAndCancelButtonDelete" id="buttonGroupsDelete'+route.get('route_id')+'">';
                    if(count>0){
                        htmlData+='<button class="btn btn-sm btn-danger routesPageDeleteButton" disabled id="'+route.get('route_id')+'"><span class="glyphicon glyphicon-trash"></span></button>';
                    }
                    else
                    {
                        htmlData+='<button class="btn btn-sm btn-danger routesPageDeleteButton" id="'+route.get('route_id')+'"><span class="glyphicon glyphicon-trash"></span></button>';
                    }
                    htmlData+='</div>';
                    htmlData+='</td>';
                    htmlData+='</tr>';
                });
                }
            });

            $("#routesPageTable").html(htmlData);

        },
        routesPageEditDivSubmit:function(e){
            var id = e.target.id;
            id= id.split("_");


            var inputRoute = $("#inputRoute"+id[1]+" input").val().trim();
            var inputCity = $("#inputCity"+id[1]+" select").val().trim();
            var inputRouteType = $("#inputRouteType"+id[1]+" select").val().trim();
            var inputTotDuration = $("#inputTotDuration"+id[1]+" input").val().trim();
            var inputPeronNo = $("#inputPeronNo"+id[1]+" input").val().trim();
            var inputVehicleType = $("#inputVehicleType"+id[1]+" select").val().trim();


            var date = new Date();
            var routeModel = new RouteModels.Route({route_id: id[1]});
            routeModel.fetch({
                async: false,
                success: function (route) {

                    route = route.toJSON();

                    var routeModel1 = new RouteModels.Route({route_id: id[1],route_name:inputRoute,city_id:inputCity,route_type_id:inputRouteType,tot_duration:inputTotDuration,peron_no:inputPeronNo,vehicle_type:inputVehicleType,lastupd_uid:$.cookie("sysadm_uid"),lastupd_date:date,create_date:route.create_date,create_uid:route.create_uid});
                    routeModel1.save(null,{
                        async: false,
                        success: function(){
                            console.log("Güncelleme Başarılı");
                            $("#cityInputText").val("");

                        }
                    });
                }
            });

            $("#"+id[1]).toggle();
            $("#input"+id[1]).toggle();

            this.dataRefresh();
        },
        routesPageEditDiv: function(e){
            var id = e.target.id;
            id= id.split("_");

            $(".routesPageSubmitAndCancelButtonDelete").show();
            $(".routesPageSubmitAndCancelButton").hide();

            $(".routesPageEditDivCity").show();
            $(".routesPageEditDivInputCity").hide();

            $(".routesPageEditDivRoute").show();
            $(".routesPageEditDivInputRoute").hide();

            $(".routesPageEditDivRouteType").show();
            $(".routesPageEditDivInputRouteType").hide();

            $(".routesPageEditDivTotDuration").show();
            $(".routesPageEditDivInputTotDuration").hide();

            $(".routesPageEditDivPeronNo").show();
            $(".routesPageEditDivInputPeronNo").hide();

            $(".routesPageEditDivVehicleType").show();
            $(".routesPageEditDivInputVehicleType").hide();

            $("#route_"+id[1]).toggle();
            $("#inputRoute"+id[1]).toggle();

            $("#city_"+id[1]).toggle();
            $("#inputCity"+id[1]).toggle();

            $("#routeType_"+id[1]).toggle();
            $("#inputRouteType"+id[1]).toggle();

            $("#totDuration_"+id[1]).toggle();
            $("#inputTotDuration"+id[1]).toggle();

            $("#peronNo_"+id[1]).toggle();
            $("#inputPeronNo"+id[1]).toggle();

            $("#vehicleType_"+id[1]).toggle();
            $("#inputVehicleType"+id[1]).toggle();

            $("#buttonGroups"+id[1]).toggle();
            $("#buttonGroupsDelete"+id[1]).toggle();

        },
        routesPageEditDivCancel:function(e){
            var id = e.target.id;
            id= id.split("_");

            $("#route_"+id[1]).toggle();
            $("#inputRoute"+id[1]).toggle();

            $("#city_"+id[1]).toggle();
            $("#inputCity"+id[1]).toggle();

            $("#routeType_"+id[1]).toggle();
            $("#inputRouteType"+id[1]).toggle();

            $("#totDuration_"+id[1]).toggle();
            $("#inputTotDuration"+id[1]).toggle();

            $("#peronNo_"+id[1]).toggle();
            $("#inputPeronNo"+id[1]).toggle();

            $("#vehicleType_"+id[1]).toggle();
            $("#inputVehicleType"+id[1]).toggle();

            $("#buttonGroups"+id[1]).toggle();
            $("#buttonGroupsDelete"+id[1]).toggle();
        },
        routesPageSaveButton: function(){

            var date = new Date();

            var routesPageInputTextRouteName = $("#routesPageInputTextRouteName").val().trim();
            var routesPageInputTextCity = $("#routesPageInputTextCity").val().trim();
            var routesPageInputTextRouteType = $("#routesPageInputTextRouteType").val().trim();
            var routesPageInputTextTotDuration = $("#routesPageInputTextTotDuration").val().trim();
            var routesPageInputTextPeronNo = $("#routesPageInputTextPeronNo").val().trim();
            var routesPageInputTextVehicleType = $("#routesPageInputTextVehicleType").val().trim();
            if(routesPageInputTextRouteName != null     && routesPageInputTextRouteName != undefined    && routesPageInputTextRouteName != ""   &&
                routesPageInputTextCity != null         && routesPageInputTextCity != undefined         && routesPageInputTextCity != ""        &&
                routesPageInputTextRouteType != null    && routesPageInputTextRouteType != undefined    && routesPageInputTextRouteType != ""   &&
                routesPageInputTextTotDuration != null  && routesPageInputTextTotDuration != undefined  && routesPageInputTextTotDuration != "" &&
                routesPageInputTextPeronNo != null      && routesPageInputTextPeronNo != undefined      && routesPageInputTextPeronNo != "" &&
                routesPageInputTextVehicleType != null  && routesPageInputTextVehicleType != undefined  && routesPageInputTextVehicleType != "")
            {
                //UserId alınacak
                var dizi={route_name:routesPageInputTextRouteName,city_id:routesPageInputTextCity,route_type_id:routesPageInputTextRouteType,tot_duration:routesPageInputTextTotDuration,peron_no:routesPageInputTextPeronNo,vehicle_type:routesPageInputTextVehicleType,create_uid:$.cookie("sysadm_uid"),create_date:date};
                console.log(dizi);
                var routeModels1 = new RouteModels.Route({route_name:routesPageInputTextRouteName,city_id:routesPageInputTextCity,route_type_id:routesPageInputTextRouteType,tot_duration:routesPageInputTextTotDuration,peron_no:routesPageInputTextPeronNo,vehicle_type:routesPageInputTextVehicleType,create_uid:$.cookie("sysadm_uid"),create_date:date});
                routeModels1.save(null,{
                    async: false,
                    success: function(){
                        console.log("Kayıt Başarılı");
                    }
                });

                $("#routesPageInputTextRouteName").val("");
                $("#routesPageInputTextCity").val("");
                $("#routesPageInputTextRouteType").val("");
                $("#routesPageInputTextTotDuration").val("");
                $("#routesPageInputTextPeronNo").val("");
                $("#routesPageInputTextVehicleType").val("");

                this.dataRefresh();
            }
            else
            {
                alert("Lütfen Boş Bırakmayınız...");
            }

        },
        routesPageDeleteButton: function(e){
            var routeModels = new RouteModels.Route({route_id: e.target.id});
            routeModels.destroy({
                async: false,
                success: function(){
                    console.log(":"+e.target.id+" Silindi");

                }
            });

            this.dataRefresh();
        }


    });
});

