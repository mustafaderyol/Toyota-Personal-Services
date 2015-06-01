define(function (require) {
    "use strict";
    //Bağımlılıklar yükleniyor
    var Backbone                        = require('backbone'),
        Menu                            = require('app/views/menu'),
        PersonalServicesSearchView      = require('app/views/personalservicessearch'),
        PersonalServicesListView        = require('app/views/personalserviceslist'),
        CitiesView                      = require('app/views/cities'),
        RouteTypesView                  = require('app/views/routetypes'),
        RouteView                       = require('app/views/routesPage'),
        StationView                     = require('app/views/stations'),
        ExportExcel                     = require('app/views/exportexcel'),
        //cookie                          = require('cookie'),//cookie arama

        menu                            = new Menu(),
        personalServicesSearchView      = new PersonalServicesSearchView(),
        personalServicesListView        = new PersonalServicesListView(),
        citiesView                      = new CitiesView(),
        routeTypesView                  = new RouteTypesView(),
        routeView                       = new RouteView(),
        stationView                     = new StationView(),
        exportExcel                     = new ExportExcel();


    return Backbone.Router.extend({
        //yönlendirme kuralları belirleniyor
        routes: {
            ''                          : 'personalservicessearch',
            'index'                     : 'personalservicessearch',
            'listPersonalServices'      : 'listPersonalServices',
            'citiesPage'                : 'citiesPage',
            'routetypesPage'            : 'routetypesPage',
            'routesPage'                : 'routesPage',
            'stationsPage'              : 'stationsPage',
            'exportexcel'               : 'exportexcel'
        },
        personalservicessearch: function () {
            menu.render();

            $("#navbarliRouteType").removeClass("active");
            $("#navbarliCity").removeClass("active");
            $("#navbarliRoute").removeClass("active");
            $("#navbarliStation").removeClass("active");

            //personalservicessearch sayfası çağırılıyor
            personalServicesSearchView.render();
        },
        listPersonalServices: function(){

            $("#navbarliRouteType").removeClass("active");
            $("#navbarliCity").removeClass("active");
            $("#navbarliRoute").removeClass("active");
            $("#navbarliStation").removeClass("active");
            $("#navbarliExportExcel").removeClass("active");

            personalServicesListView.render();
        },
        citiesPage: function(){

            $("#navbarliCity").addClass("active");
            $("#navbarliRouteType").removeClass("active");
            $("#navbarliRoute").removeClass("active");
            $("#navbarliStation").removeClass("active");
            $("#navbarliExportExcel").removeClass("active");

            citiesView.render();
        },
        routetypesPage: function(){

            $("#navbarliCity").removeClass("active");
            $("#navbarliRouteType").addClass("active");
            $("#navbarliRoute").removeClass("active");
            $("#navbarliStation").removeClass("active");
            $("#navbarliExportExcel").removeClass("active");

            routeTypesView.render();
        },
        routesPage: function(){

            $("#navbarliCity").removeClass("active");
            $("#navbarliRouteType").removeClass("active");
            $("#navbarliRoute").addClass("active");
            $("#navbarliStation").removeClass("active");
            $("#navbarliExportExcel").removeClass("active");

            routeView.render();
        },
        stationsPage: function(){

            $("#navbarliCity").removeClass("active");
            $("#navbarliRouteType").removeClass("active");
            $("#navbarliRoute").removeClass("active");
            $("#navbarliStation").addClass("active");
            $("#navbarliExportExcel").removeClass("active");

            stationView.render();
        },
        exportexcel: function(){

            $("#navbarliCity").removeClass("active");
            $("#navbarliRouteType").removeClass("active");
            $("#navbarliRoute").removeClass("active");
            $("#navbarliStation").removeClass("active");
            $("#navbarliExportExcel").addClass("active");

            exportExcel.render();
        }

    });
});