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

// GLOBALS CONSANTS
var URL = "http://localhost:63744/api/location/";

var utilparm = new UtilFindAdresBarParam(); // Get the id from parameter in url bar
var KLANTID = utilparm.findGetParameter('klantid');

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

            var insertYN = document.getElementById(crHinput.getInputValue("insert")).dataset.insert;
            if( insertYN == 1 )
            {
                locid = 0;
                new InsertLocation().insertLocation(URL + KLANTID, locid, latitude, longitude, berTitle, berText, berichtid, KLANTID);
            }

            if( insertYN == 0 )
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

    function save()
    {
        new XtraJs().savePopUpInfo();
    }

    function deleteThis()
    {
        new XtraJs().deleteMarker();
    }

    function reloadMap()
    {
        window.location.href = "index.html?klantid=" + KLANTID;
    }