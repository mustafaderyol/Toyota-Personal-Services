define(function (require) {
    "use strict";
    //Bağımlılıklar çağırılıyor
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        RouteTypeModels     = require('app/models/routetype'),
        RouteModels         = require('app/models/route'),
        tpl                 = require('text!template/routetypes.html');

    var routeData;

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
                '<li class="active">Güzergah Tipleri</li>'+
                '<li><button class="btn btn-sm btn-warning" id="printButton"><span class="glyphicon glyphicon-print"></span> Yazdır</button></li>';
            $("#breadcrumb").html(htmlData);


            var routeTypeData;
            var routeTypeModels = new RouteTypeModels.RouteTypes();
            routeTypeModels.fetch({
                async: false,
                success: function(){
                    routeTypeData = routeTypeModels.models;
                }
            });

            var routeModels = new RouteModels.Routes;
            routeModels.fetch({
                async: false,
                success: function(){
                    routeData = routeModels.models;
                }
            });

            var temp= _.template(tpl, {routeTypeModels: routeTypeData,routeModels:routeData});
            this.$el.html(temp);

        },
        events:{
            'click #routeTypeSaveButton' : 'routeTypeSaveButton',
            'click .routeTypeDeleteButton': 'routeTypeDeleteButton',
            'dblclick .routeTypeEditDiv': 'routeTypeEditDiv',
            'click .routeTypeEditDivCancel': 'routeTypeEditDivCancel',
            'click .routeTypeEditDivSubmit':'routeTypeEditDivSubmit'
        },
        dataRefresh:function(){
            var htmlData;
            var routeTypeModels1 = new RouteTypeModels.RouteTypes();
            routeTypeModels1.fetch({
                async: false,
                success: function(){
                    _.each(routeTypeModels1.models, function(routeType){

                        var count = 0;

                        _.each(routeData, function(route){
                            if(route.get("route_type_id")==routeType.get("route_type_id"))
                                count++;
                        });

                        htmlData = htmlData+'<tr>';
                        htmlData = htmlData+'<td style="width: 10%">';
                        htmlData = htmlData+routeType.get("route_type_id");
                        htmlData = htmlData+'</td>';

                        htmlData = htmlData+'<td style="width: 80%">';
                        htmlData = htmlData+'<div class="routeTypeEditDiv" style="width: 100%" id="'+routeType.get("route_type_id")+'">'+routeType.get("route_type_name")+'</div>';
                        htmlData = htmlData+'<div class="routeTypeEditDivInput" id="input'+routeType.get("route_type_id")+'" style="display:none;">';
                        htmlData = htmlData+'<input style="width: 90%; float: left; margin-right: 10px;" type="text" class="form-control" value="'+routeType.get("route_type_name")+'">';
                        htmlData = htmlData+'<button style="float: left; margin-right: 10px;" class="btn btn-sm btn-primary routeTypeEditDivSubmit"  id="submit_'+routeType.get("route_type_id")+'"><span class="glyphicon glyphicon-ok"></span></button>';
                        htmlData = htmlData+'<button style="float: left;" class="btn btn-sm btn-warning routeTypeEditDivCancel" id="cancel_'+routeType.get("route_type_id")+'"><span class="glyphicon glyphicon-remove"></span></button>';
                        htmlData = htmlData+'</div>';

                        htmlData = htmlData+'</td>';

                        htmlData = htmlData+'<td style="width: 5%">';
                        if(count>0)
                        {
                            htmlData = htmlData+'<button class="btn btn-sm btn-danger routeTypeDeleteButton" disabled id="'+routeType.get("route_type_id")+'"><span class="glyphicon glyphicon-trash"></span></button>';
                        }
                        else
                        {
                            htmlData = htmlData+'<button class="btn btn-sm btn-danger routeTypeDeleteButton" id="'+routeType.get("route_type_id")+'"><span class="glyphicon glyphicon-trash"></span></button>';
                        }
                        htmlData = htmlData+'</td>';
                        htmlData = htmlData+'</tr>';
                    });
                }
            });

            $("#routeTypesTable").html(htmlData);

        },
        routeTypeEditDivSubmit:function(e){
            var id = e.target.id;
            id= id.split("_");
            var text = $("#"+id[1]).text();
            var input = $.trim($("#input"+id[1]+" input").val());
            if(text!=input)
            {

                var date = new Date();
                $("#"+id[1]).text(input);
                var routeTypeModels = new RouteTypeModels.RouteType({route_type_id: id[1]});
                routeTypeModels.fetch({
                    async: false,
                    success: function (routeType) {

                        routeType = routeType.toJSON();

                        var routeTypeModels2 = new RouteTypeModels.RouteType({route_type_id: id[1],route_type_name:input,lastupd_uid:$.cookie("sysadm_uid"),lastupd_date:date,create_date:routeType.create_date,create_uid:routeType.create_uid});
                        routeTypeModels2.save(null,{
                            async: false,
                            success: function(){
                                console.log("Güncelleme Başarılı");
                                $("#routeTypeInputText").val("");

                            }
                        });
                    }
                });
            }
            $("#"+id[1]).toggle();
            $("#input"+id[1]).toggle();

            this.dataRefresh();
        },
        routeTypeEditDiv: function(e){
            var id = e.target.id;
            $(".routeTypeEditDiv").show(500);
            $(".routeTypeEditDivInput").hide(500);
            $("#"+id).toggle("slow");
            $("#input"+id).toggle("slow");

        },
        routeTypeEditDivCancel:function(e){
            var id = e.target.id;
            id= id.split("_");
            $("#"+id[1]).toggle("slow");
            $("#input"+id[1]).toggle("slow");
        },
        routeTypeSaveButton: function(){

            var date = new Date();

            var routeTypeInputText = $("#routeTypeInputText").val().trim();
            if(routeTypeInputText != null && routeTypeInputText != undefined && routeTypeInputText != "")
            {
                //UserId alınacak
                var routeTypeModels = new RouteTypeModels.RouteType({route_type_name:routeTypeInputText,create_uid:$.cookie("sysadm_uid"),create_date:date});
                routeTypeModels.save(null,{
                    async: false,
                    success: function(){
                        console.log("Kayıt Başarılı");
                    }
                });

                this.dataRefresh();
                $("#routeTypeInputText").val("");
            }
            else
            {
                alert("Lütfen Boş Bırakmayınız...");
            }

        },
        routeTypeDeleteButton: function(e){
            var routeTypeModels = new RouteTypeModels.RouteType({route_type_id: e.target.id});
            routeTypeModels.destroy({
                async: false,
                success: function(){
                    console.log("ReservationId:"+e.target.id+" Silindi");

                }
            });

            this.dataRefresh();
        }


    });
});

