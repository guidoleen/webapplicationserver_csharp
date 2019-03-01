
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

// GLOBALS CONSANTS
var URL = "http://localhost:63744/api/location/";

var utilparm = new UtilFindAdresBarParam(); // Get the id from parameter in url bar
var KLANTID = utilparm.findGetParameter('klantid');

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
        getHiddenInput(name)
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
            var strdata = this.createPostDataString("locid", locid, "&");
            strdata += this.createPostDataString("latitude", latitude, "&");
            strdata += this.createPostDataString("longitude", longitude, "&");
            strdata += this.createPostDataString("bertitel", berTitle, "&");
            strdata += this.createPostDataString("bertext", berText, "&");
            strdata += this.createPostDataString("berichtid", berichtid, "&");
            strdata += this.createPostDataString("klantid", klantid, "");
    
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
    
        createPostDataString(key, value, amp)
        {
            return key + "=" + value + amp;
        }
    }

//// Util Class
    class XtraJs
    {
        savePopUpInfo()
        {
            var crHinput = new CreateHiddenInput();

            var locid = crHinput.getHiddenInput("locid");
            console.log(locid);
            var latitude = crHinput.getHiddenInput("latitude");
            var longitude = crHinput.getHiddenInput("longitude");
            var berTitle = crHinput.getHiddenInput("bertitel");
            var berText = crHinput.getHiddenInput("bertext");
            var berichtid = crHinput.getHiddenInput("berichtid");

            new UpdateLocation().updateLocation(URL + KLANTID, locid, latitude, longitude, berTitle, berText, berichtid, KLANTID);

            console.log( crHinput.getHiddenInput("locid") + crHinput.getHiddenInput("bertitel") + crHinput.getHiddenInput("latitude") );
        }
    }

    function save()
    {
        new XtraJs().savePopUpInfo();
    }
    