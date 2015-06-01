define(function (require) {
    "use strict";
    //Bağımlılıklar çağırılıyor
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        CityModels          = require('app/models/city'),
        RouteModels          = require('app/models/route'),
        tpl                 = require('text!template/cities.html');

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
                '<li class="active">Şehirler</li>'+
                '<li><button class="btn btn-sm btn-warning" id="printButton"><span class="glyphicon glyphicon-print"></span> Yazdır</button></li>';
            $("#breadcrumb").html(htmlData);


            var cityData;
            var cityModels = new CityModels.Cities();
            cityModels.fetch({
                async: false,
                success: function(){
                    cityData = cityModels.models;
                }
            });

            var routeModels = new RouteModels.Routes;
            routeModels.fetch({
                async: false,
                success: function(){
                    routeData = routeModels.models;
                }
            });

            var temp= _.template(tpl, {cityModels: cityData,routeModels:routeData});
            this.$el.html(temp);
        },
        events:{
            'click #citySaveButton' : 'citySaveButton',
            'click .cityDeleteButton': 'cityDeleteButton',
            'dblclick .cityEditDiv': 'cityEditDiv',
            'click .cityEditDivCancel': 'cityEditDivCancel',
            'click .cityEditDivSubmit':'cityEditDivSubmit'
        },
        dataRefresh:function(){
            var htmlData;
            var cityModels1 = new CityModels.Cities();
            cityModels1.fetch({
                async: false,
                success: function(){
                    _.each(cityModels1.models, function(city){

                        var count = 0;

                        _.each(routeData, function(route){
                            if(route.get("city_id")==city.get("city_id"))
                                count++;
                        });

                        htmlData = htmlData+'<tr>';
                        htmlData = htmlData+'<td style="width: 10%">';
                        htmlData = htmlData+city.get("city_id");
                        htmlData = htmlData+'</td>';
                        htmlData = htmlData+'<td style="width: 80%">';
                        htmlData = htmlData+'<div class="cityEditDiv" style="width: 100%" id="'+city.get('city_id')+'">'+city.get('city_name')+'</div>';
                        htmlData = htmlData+'<div class="cityEditDivInput" id="input'+city.get('city_id')+'" style="display:none;">';
                        htmlData = htmlData+'<input style="width: 90%; float: left; margin-right: 10px;" type="text" class="form-control" value="'+city.get('city_name')+'">';
                        htmlData = htmlData+'<button style="float: left; margin-right: 10px;" class="btn btn-sm btn-primary cityEditDivSubmit"  id="submit_'+city.get('city_id')+'"><span class="glyphicon glyphicon-ok"></span></button>';
                        htmlData = htmlData+'<button style="float: left;" class="btn btn-sm btn-warning cityEditDivCancel" id="cancel_'+city.get('city_id')+'"><span class="glyphicon glyphicon-remove"></span></button>';
                        htmlData = htmlData+'</div>';

                        htmlData = htmlData+'</td>';
                        htmlData = htmlData+'<td style="width: 5%">';
                        if(count>0)
                        {
                            htmlData = htmlData+'<button class="btn btn-sm btn-danger cityDeleteButton" disabled id="'+city.get('city_id')+'"><span class="glyphicon glyphicon-trash"></span></button>';
                        }
                        else
                        {
                            htmlData = htmlData+'<button class="btn btn-sm btn-danger cityDeleteButton" id="'+city.get('city_id')+'"><span class="glyphicon glyphicon-trash"></span></button>';
                        }
                        htmlData = htmlData+'</td>';
                        htmlData = htmlData+'</tr>';
                    });
                }
            });

            $("#citiesTable").html(htmlData);
        },
        cityEditDivSubmit: function(e){
            var id = e.target.id;
            id= id.split("_");
            var text = $("#"+id[1]).text();
            var input = $.trim($("#input"+id[1]+" input").val());
            if(text!=input)
            {

                var date = new Date();
                $("#"+id[1]).text(input);
                var cityModel = new CityModels.City({city_id: id[1]});
                cityModel.fetch({
                    async: false,
                    success: function (city) {

                        city = city.toJSON();

                        var cityModels = new CityModels.City({city_id: id[1],city_name:input,lastupd_uid:$.cookie("sysadm_uid"),lastupd_date:date,create_date:city.create_date,create_uid:city.create_uid});
                        cityModels.save(null,{
                            async: false,
                            success: function(){
                                console.log("Güncelleme Başarılı");
                                $("#cityInputText").val("");

                            }
                        });
                    }
                });
            }
            $("#"+id[1]).toggle();
            $("#input"+id[1]).toggle();

            this.dataRefresh();
        },
        cityEditDiv: function(e){
            var id = e.target.id;
            $(".cityEditDiv").show(500);
            $(".cityEditDivInput").hide(500);
            $("#"+id).toggle("slow");
            $("#input"+id).toggle("slow");

        },
        cityEditDivCancel:function(e){
            var id = e.target.id;
            id= id.split("_");
            $("#"+id[1]).toggle("slow");
            $("#input"+id[1]).toggle("slow");
        },
        citySaveButton: function(){

            var date = new Date();

            var cityInputText = $.trim($("#cityInputText").val());
            if(cityInputText != null && cityInputText != undefined && cityInputText != "")
            {
                //UserId alınacak
                var cityModels = new CityModels.City({city_name:cityInputText,create_uid:$.cookie("sysadm_uid"),create_date:date});
                cityModels.save(null,{
                    async: false,
                    success: function(){
                        console.log("Kayıt Başarılı");

                        $("#cityInputText").val("");

                    }
                });


                this.dataRefresh();
            }
            else
            {
                alert("Lütfen Boş Bırakmayınız...");
            }
        },
        cityDeleteButton: function(e){
            var cityModels = new CityModels.City({city_id: e.target.id});
            cityModels.destroy({
                async: false,
                success: function(){
                    console.log("ReservationId:"+e.target.id+" Silindi");

                }
            });

            this.dataRefresh();
        }


    });
});

