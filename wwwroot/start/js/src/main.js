import { OsmapStart } from './osmapstart';
import { EventsMap } from './eventsmap';
import { UtilFindAdresBarParam } from './utilfindadresbarparam';
import { UpdateLocation } from './updatelocation';

class Main
{
    constructor(jsonAdres)
    {
        this.jsonAdres = jsonAdres;
    }

    // Open Street Map class and put markers there
    setupOSMapOnPage()
    {
        var osmap = new OsmapStart(); 
        osmap.setupOSMap(this.jsonAdres, "osmap", 5, 52, 8);
    }
}

var url = "http://localhost:63744/api/location/";
var utilparm = new UtilFindAdresBarParam(); // Get the id from parameter in url bar
var m = new Main(url + utilparm.findGetParameter('klantid'));
m.setupOSMapOnPage();

// TEST UPDATE LOCATION
// var updte = new UpdateLocation();
// updte.updateLocation(url + utilparm.findGetParameter('klantid'), 1, "berTitle", "berText");

// https://openlayers.org/en/latest/examples/overlay.html
// https://code.lengstorf.com/learn-rollup-js/
// browserify main.js -o bundle.js