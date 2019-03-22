import { MarkersOnMap } from './markersonmap';
import { Cookie } from './cookie';
import { CreatePostDataString } from './createpostdatastring';

var xmlhttp = new XMLHttpRequest();

export class JsonOnMap
{
    constructor(jsonres)
    {
        this.jsonres = jsonres;
    }
    putTheJsonOnMap(osMap, osMapName, evMap)
    {
        var monmap = new MarkersOnMap();

        // Data from cookie to c#
        var sessionId = new Cookie().getCookie("sessionid");
        var sessionToken = new Cookie().getCookie("sessiontoken");

        var strdata = new CreatePostDataString().createPostDataString("sessionid", sessionId, "&");
        strdata += new CreatePostDataString().createPostDataString("sessiontoken", sessionToken, "");

        xmlhttp.open("POST", this.jsonres, true); // http://localhost:63744/api/location/2/1/1
        xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded; charset=utf-8');

        xmlhttp.onload = function()
        {
            if(this.readyState == xmlhttp.DONE && xmlhttp.status == "200")
            {
                var jsonObj = JSON.parse(xmlhttp.response); // JSON.parse(xmlhttp.response);
                jsonObj = JSON.parse(jsonObj); // Parse JSON twice

                monmap.putMarkersOnMap(osMap, osMapName, jsonObj, evMap);
            }
        }
        xmlhttp.send(strdata);
    }
}

// TEST Object
var OBJWEG = [
    {    "latitude": 52.072,    "longitude": 5.184,    "locid": 1  },  {    "latitude": 52.03,    "longitude": 5.2,    "locid": 3  },  {    "latitude": 51.3,    "longitude": 5.2,    "locid": 4  }
];