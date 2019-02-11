import { MarkersOnMap } from './markersonmap';

var xmlhttp = new XMLHttpRequest();

export class JsonOnMap
{
    constructor(jsonres)
    {
        this.jsonres = jsonres;
    }
    putTheJsonOnMap(osMap, osMapName)
    {
        var monmap = new MarkersOnMap();
                
        xmlhttp.onreadystatechange = function()
        {
            if(this.readyState == 4 && this.status == 200)
            {
                var jsonObj = JSON.parse(xmlhttp.response); // JSON.parse(xmlhttp.response);
                jsonObj = JSON.parse(jsonObj); // Parse JSON twice

                monmap.putMarkersOnMap(osMap, osMapName, jsonObj);
            }
        }
        xmlhttp.open("GET", this.jsonres, true);
        xmlhttp.send();
    }
}

// TEST Object
var OBJWEG = [
    {    "latitude": 52.072,    "longitude": 5.184,    "locid": 1  },  {    "latitude": 52.03,    "longitude": 5.2,    "locid": 3  },  {    "latitude": 51.3,    "longitude": 5.2,    "locid": 4  }
];