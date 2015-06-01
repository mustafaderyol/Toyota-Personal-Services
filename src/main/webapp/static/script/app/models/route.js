define(function (require) {
    "use strict";
    var Backbone = require('backbone'),
        Route = Backbone.Model.extend({
            urlRoot: '../../PersonalServices/api/route',
            idAttribute: "route_id"
        }),
        Routes = Backbone.Collection.extend({
            url: '../../PersonalServices/api/route'
        }),
        RTAndCRoute = Backbone.Model.extend({
            url: '../../PersonalServices/api/route/getroutetypeandcitytoroute'
        }),
        RTAndCRoutes = Backbone.Collection.extend({
            url: '../../PersonalServices/api/route/getroutetypeandcitytoroute'
        });

    return {
        Route: Route,
        Routes: Routes,
        RTAndCRoute: RTAndCRoute,
        RTAndCRoutes:RTAndCRoutes
    };
});