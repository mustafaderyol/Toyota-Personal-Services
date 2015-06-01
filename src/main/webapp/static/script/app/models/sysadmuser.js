define(function (require) {
    "use strict";
    var Backbone = require('backbone'),
        SysadmUser = Backbone.Model.extend({
            urlRoot: '../../PersonalServices/api/sysadmuser',
            idAttribute: "id"
        }),
        SysadmUsers = Backbone.Collection.extend({
            url: '../../PersonalServices/api/sysadmuser'
        }),
        LoginUser = Backbone.Model.extend({
            url: '../../PersonalServices/api/sysadmuser/login'
        });

    return {
        SysadmUser: SysadmUser,
        SysadmUsers: SysadmUsers,
        LoginUser:LoginUser
    };
});