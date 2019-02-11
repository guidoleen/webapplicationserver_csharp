import { MarkersOnMap } from './markersonmap';

var xmlhttp = new XMLHttpRequest();

export class JsonOnMap
{
    constructor(jsonres)
    {
        this.jsonres = jsonres;
    }
    putTheJsonOnMap(vectorsource)
    {
        xmlhttp.onreadystatechange = function()
        {
            if(this.readyState == 4 && this.status == 200)
            {
                // var jsonObj = JSON.parse(xmlhttp.responseText);

                var monmap = new MarkersOnMap();
                monmap.putMarkerOnMap(vectorsource, OBJWEG);
                // divobj.innerHTML = OBJWEG[0].latitude;
            }
        }
        xmlhttp.open("GET", this.jsonres, true);
        xmlhttp.send();
    }
}

var OBJWEG = [
    {    "latitude": 52.072,    "longitude": 5.184,    "locid": 1  },  {    "latitude": 52.3,    "longitude": 2.2,    "locid": 3  },  {    "latitude": 52.3,    "longitude": 2.2,    "locid": 4  }
];

// 52.072852, 5.184728