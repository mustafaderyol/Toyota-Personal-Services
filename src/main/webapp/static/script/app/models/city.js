define(function (require) {
    "use strict";
    var Backbone = require('backbone'),
        City = Backbone.Model.extend({
            urlRoot: '../../PersonalServices/api/city',
            idAttribute: "city_id"
        }),
        Cities = Backbone.Collection.extend({
            url: '../../PersonalServices/api/city'
        });

    return {
        City: City,
        Cities: Cities
    };
});