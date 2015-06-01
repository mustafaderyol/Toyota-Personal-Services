define(function (require) {
    "use strict";
    var Backbone = require('backbone'),
        RouteType = Backbone.Model.extend({
            urlRoot: '../../PersonalServices/api/routetype',
            idAttribute: "route_type_id"
        }),
        RouteTypes = Backbone.Collection.extend({
            url: '../../PersonalServices/api/routetype'
        });

    return {
        RouteType: RouteType,
        RouteTypes: RouteTypes
    };
});