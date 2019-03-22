// THIS SCRIPT USES THE SAVE, DELETE AND UPDATE FUNCTION IN THE POPUP...

'use strict';
// UTILS
class UtilFindAdresBarParam
{
    constructor(){};

    findGetParameter(parameterName) 
    {
        var result = null,
            tmp = [];
        window.location.search
            .substr(1)
            .split("&")
            .forEach(function (item) {
            tmp = item.split("=");
            if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
            });
        return result;
    }
}

///// Cookie Class
class Cookie
{
    setCookie(cname,cvalue,exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires=" + d.toGMTString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
    
    getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
        }
        return "";
    }

    deleteCookie()
    {
        document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
} 

// GLOBALS CONSANTS
var URL = "http://localhost:63744/api/location/";
var URL2 = "http://localhost:63744/api/location/";

var utilparm = new UtilFindAdresBarParam(); // Get the id from parameter in url bar
var KLANTID = 0; // utilparm.findGetParameter('klantid');
var C_LAT = utilparm.findGetParameter('lat');
var C_LON = utilparm.findGetParameter('lon');

// CLASS SECTION
    class CreateHiddenInput
    {
        constructor(divname)
        {
            this.divname = divname;
        }
        createHiddenInput(name, value)
        {
            var input = document.createElement("input");
            input.setAttribute("type", "hidden");
            input.setAttribute("id", name);
            input.setAttribute("name", name);
            input.setAttribute("value", value);

            document.getElementById(this.divname).appendChild(input);
        }
        setHiddenInput(name, value)
        {
            var inputdoc = document.getElementById(name);
            inputdoc.value = value;
        }
        getInputValue(name)
        {
            var inputdoc = document.getElementById(name);
            return inputdoc.value;
        }
    }

//// Update Location
    var xmlhttp = new XMLHttpRequest();

    class UpdateLocation
    {
        constructor(){}
    
        updateLocation(url, locid, latitude, longitude, berTitle, berText, berichtid, klantid)
        {
          // locid=42&latitude=52%2C3&longitude=4&bertitel=Dit+is+een+nieuwe+titel&bertext=Dit+is+een+text+over+deze+locatie&berichtid=2&klantid=2        
            var strdata = new CreatePostDataString().createPostDataString("locid", locid, "&");
            strdata += new CreatePostDataString().createPostDataString("latitude", latitude, "&");
            strdata += new CreatePostDataString().createPostDataString("longitude", longitude, "&");
            strdata += new CreatePostDataString().createPostDataString("bertitel", berTitle, "&");
            strdata += new CreatePostDataString().createPostDataString("bertext", berText, "&");
            strdata += new CreatePostDataString().createPostDataString("berichtid", berichtid, "&");
            strdata += new CreatePostDataString().createPostDataString("klantid", klantid, "");
    
            var xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded; charset=utf-8');
            xhr.onload = function () 
            {
                if (xhr.readyState == xhr.DONE && xhr.status == "200") 
                {
                  console.log(xhr.response + " " + strdata);
                } else {
                  console.log("Error in de verbinding...");
                }
            }
            xhr.send(strdata);
        }
    }

///// INSERT Class
class InsertLocation
    {
        constructor(){}
    
        insertLocation(url, locid, latitude, longitude, berTitle, berText, berichtid, klantid)
        {
          // locid=42&latitude=52%2C3&longitude=4&bertitel=Dit+is+een+nieuwe+titel&bertext=Dit+is+een+text+over+deze+locatie&berichtid=2&klantid=2        
            var strdata = new CreatePostDataString().createPostDataString("locid", locid, "&");
            strdata += new CreatePostDataString().createPostDataString("latitude", latitude, "&");
            strdata += new CreatePostDataString().createPostDataString("longitude", longitude, "&");
            strdata += new CreatePostDataString().createPostDataString("bertitel", berTitle, "&");
            strdata += new CreatePostDataString().createPostDataString("bertext", berText, "&");
            strdata += new CreatePostDataString().createPostDataString("berichtid", berichtid, "&");
            strdata += new CreatePostDataString().createPostDataString("klantid", klantid, "");
    
            var xhr = new XMLHttpRequest();
            xhr.open("PUT", url, true);
            xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded; charset=utf-8');
            xhr.onload = function () 
            {
                if (xhr.readyState == xhr.DONE && xhr.status == "200") 
                {
                  console.log(xhr.response + " " + strdata);
                } else {
                  console.log("Error in de verbinding...");
                }
            }
            xhr.send(strdata);
        }
    }

    ///// INSERT Class
class DeleteLocation
{
    constructor(){}

    deleteLocation(url, locid, latitude, longitude, berTitle, berText, berichtid, klantid)
    {
      // locid=42&latitude=52%2C3&longitude=4&bertitel=Dit+is+een+nieuwe+titel&bertext=Dit+is+een+text+over+deze+locatie&berichtid=2&klantid=2        
        var strdata = new CreatePostDataString().createPostDataString("locid", locid, "&");
        strdata += new CreatePostDataString().createPostDataString("latitude", latitude, "&");
        strdata += new CreatePostDataString().createPostDataString("longitude", longitude, "&");
        strdata += new CreatePostDataString().createPostDataString("bertitel", berTitle, "&");
        strdata += new CreatePostDataString().createPostDataString("bertext", berText, "&");
        strdata += new CreatePostDataString().createPostDataString("berichtid", berichtid, "&");
        strdata += new CreatePostDataString().createPostDataString("klantid", klantid, "");

        var xhr = new XMLHttpRequest();
        xhr.open("DELETE", url, true);
        xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded; charset=utf-8');
        xhr.onload = function () 
        {
            if (xhr.readyState == xhr.DONE && xhr.status == "200") 
            {
              console.log(xhr.response + " " + strdata);
            } else {
              console.log("Error in de verbinding...");
            }
        }
        xhr.send(strdata);
    }
}

    class CreatePostDataString
    {
        createPostDataString(key, value, amp)
        {
            return key + "=" + value + amp;
        }
    }

// LOGIN class
        class Login
        {
            constructor(){}
    
            login(url, klantid, email, pwd)
            {
                var strdata = new CreatePostDataString().createPostDataString("klantid", klantid, "&");
                strdata += new CreatePostDataString().createPostDataString("email", email, "&");
                strdata += new CreatePostDataString().createPostDataString("pwd", pwd, "");
    
                var xhr = new XMLHttpRequest();
                xhr.open("POST", url, true);
                xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded; charset=utf-8');
                xhr.onload = function () 
                {
                    if (xhr.readyState == xhr.DONE && xhr.status == "200") 
                    {
                        var strjson = JSON.parse(xhr.response);
                        strjson = JSON.parse(strjson);

                        crHinput.setHiddenInput("sessionid", strjson[0].sessionid);
                        crHinput.setHiddenInput("sessiontoken", strjson[0].sessiontoken);
                        
                        console.log(strjson);

                        new Cookie().setCookie("klantid", strjson[0].klantid);
                        new Cookie().setCookie("sessionid", strjson[0].sessionid);
                        new Cookie().setCookie("sessiontoken", strjson[0].sessiontoken);
                    } 
                    else 
                    {
                        console.log("Error in de verbinding...");
                    }
                }
                xhr.send(strdata);
            }
        }


//// Util Class
    var crHinput = new CreateHiddenInput();
    class XtraJs
    {

        // Save PopUp
        savePopUpInfo()
        {
            var locid = crHinput.getInputValue("locid");
            var latitude = crHinput.getInputValue("latitude");
            var longitude = crHinput.getInputValue("longitude");
            var berTitle = this.checkIfFormInputEmpty(crHinput.getInputValue("form_title"), "bertitel");
            var berText = this.checkIfFormInputEmpty(crHinput.getInputValue("form_bertext"), "bertext");
            var berichtid = crHinput.getInputValue("berichtid");

            var insertYN = parseInt(document.getElementById(crHinput.getInputValue("insert")).dataset.insert);
            if( insertYN == 1 ) // INSERT = 1
            {
                locid = 0;
                new InsertLocation().insertLocation(URL + KLANTID, locid, latitude, longitude, berTitle, berText, berichtid, KLANTID);
            }
            if( insertYN == 0 ) // UPDATE = 0
            {
                new UpdateLocation().updateLocation(URL + KLANTID, locid, latitude, longitude, berTitle, berText, berichtid, KLANTID);
            }

            reloadMap();
        }

        // Delete Marker
        deleteMarker()
        {
            var locid = crHinput.getInputValue("locid");
            var latitude = 0;
            var longitude = 0;
            var berTitle = "";
            var berText = "";
            var berichtid = crHinput.getInputValue("berichtid");

            var insertYN = document.getElementById(crHinput.getInputValue("insert")).dataset.insert;
            if( insertYN == 0 )
            {
                new DeleteLocation().deleteLocation(URL + KLANTID, locid, latitude, longitude, berTitle, berText, berichtid, KLANTID);
                reloadMap();
            }
        }

        // Login Member
        loginMember()
        {
            var email = crHinput.getInputValue("email");
            var pwd = crHinput.getInputValue("pwd");

            // First Logout the previous session in db
            // if( KLANTID != null )
            //     new Login().login(URL + KLANTID + "/0", KLANTID, email, pwd); // 0 == logout in C#

            // Then login for a new session in db
            new Login().login(URL + "0/1", KLANTID, email, pwd); // 1 == login in C#
            
            reloadMap();
        }

        logoutMember()
        {
            var email = "";
            var pwd = "";

            new Login().login(URL + KLANTID + "/0", KLANTID, email, pwd); // 0 == logout in C#
            new Cookie().deleteCookie();
        }

        checkIfFormInputEmpty(value, altrnValue)
        {
            if( value == "" )
            {
                return crHinput.getInputValue(altrnValue);
            }
            else 
                return value;
        }
    }

    // Call functions
    function save()
    {
        new XtraJs().savePopUpInfo();
    }

    function deleteThis()
    {
        new XtraJs().deleteMarker();
    }

    function loginThis()
    {
        new XtraJs().loginMember();
    }
    
    function logOutThis()
    {
        new XtraJs().logoutMember();
    }

    function reloadMap()
    {
        window.location.href = "index.html?klantid=" + KLANTID + "&" +
        "lat=" + crHinput.getInputValue("C_HLAT") + "&" +
        "lon=" + crHinput.getInputValue("C_HLON");
    }