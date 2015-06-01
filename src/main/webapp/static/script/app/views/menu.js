define(function (require) {
    "use strict";
    //Bağımlılıklar çağırılıyor
    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        cookie              = require('jquery.cookie'),
        SysAdmUserModel     = require('app/models/sysadmuser');




    return Backbone.View.extend({
        el: "body",
        initialize: function(){
            if(typeof($.cookie("userLoggedIn")) == "undefined") {
                $('.functions').css({"display":"none"});
                $("#x").css({"display":"block"})
                $("#y").css({"display":"none"})
            } else {
                $('.functions').css({"display":"block"});
                $("#x").css({"display":"none"})
                $("#y").css({"display":"block"})
            }
        },
        render: function(){
            $("#firstnamelastname").html("<a>"+$.cookie("first_name")+" "+$.cookie("last_name")+"</a>");
        },
        events:{
            'click #loginbutton' : 'loginbutton',
            'click #printButton' : 'printButton',
            'click #exportExcel' : 'exportExcel',
            'click #logoffbutton': 'logout'
        },
        loginbutton: function(){
            console.log($('#username').val() + $('#password').val());

            var sysAdmUserData = new SysAdmUserModel.LoginUser();
            sysAdmUserData.fetch({
                data:{username: $('#username').val(),password:$('#password').val()},
                async: false,
                success: function(response){

                    response = response.toJSON();

                    console.log(response.sysadm_uid);
                    $.cookie("username", response.username);
                    $.cookie("first_name", response.first_name);
                    $.cookie("last_name", response.last_name);
                    $.cookie("sysadm_uid", response.sysadm_uid);
                    $.cookie("userLoggedIn",true);
                    window.location="";

                },
                error: function() {
                    alert("Kullanıcı Bilgilerinizi Kontrol Ediniz...");
                }
            });
        },
        logout: function() {
            $.removeCookie("userLoggedIn", undefined);

            $.cookie("username", undefined);
            $.cookie("first_name", undefined);
            $.cookie("last_name", undefined);

            window.location="";
        },
        printButton: function(){
            var divToPrint1 = document.getElementById("printTable1");
            var divToPrint2 = document.getElementById("printTable2");
            var css = "<style>table tr td{border:1px solid #000;}table{border:1px solid #000; width: 100%;} table tr th{border:1px solid #000;}</style>";
            var htmlData = css+" ";
            if(divToPrint1 !=null && divToPrint1!=undefined && divToPrint1!="")
                htmlData = htmlData+divToPrint1.outerHTML;

            htmlData =  htmlData+"<br><br>";

            if(divToPrint2 !=null && divToPrint2!=undefined && divToPrint2!="")
                htmlData =  htmlData+divToPrint2.outerHTML;

            var newWin= window.open("");
            newWin.document.write(htmlData);
            newWin.print();
            //newWin.close();
        },
        exportExcel:function(e){
            console.log("deneme");

        }

    });
});

