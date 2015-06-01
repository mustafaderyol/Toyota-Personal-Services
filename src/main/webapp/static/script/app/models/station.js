define(function (require) {
    "use strict";
    var Backbone = require('backbone'),
        Station = Backbone.Model.extend({
            urlRoot: '../../PersonalServices/api/station',
            idAttribute: "station_id"
        }),
        Stations = Backbone.Collection.extend({
            url: '../../PersonalServices/api/station'
        }),
        GetRStation = Backbone.Model.extend({
            url: '../../PersonalServices/api/station/getroutetostation'
        }),
        GetRStations = Backbone.Collection.extend({
            url: '../../PersonalServices/api/station/getroutetostation'
        });

    return {
        Station: Station,
        Stations: Stations,
        GetRStation: GetRStation,
        GetRStations:GetRStations
    };
});