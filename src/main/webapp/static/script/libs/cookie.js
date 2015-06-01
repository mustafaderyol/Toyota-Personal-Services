

function getCookie(cname)
{
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++)
    {
        var c = ca[i].replace(/^\s+|\s+$/g, '');
        if (c.indexOf(name)==0) return c.substring(name.length,c.length);
    }
    return null;
}

var o_user      =getCookie("o_user");
var authority   =getCookie("authority");
var userID      = getCookie("userId");
var sayac1      = getCookie("sayac");
var sayac       = getCookie("sayac");
var language    = getCookie("language");