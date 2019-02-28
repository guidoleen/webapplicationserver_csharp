import { OsmapStart } from './osmapstart';
import { EventsMap } from './eventsmap';
import { UtilFindAdresBarParam } from './utilfindadresbarparam';
import { CreateHiddenInput } from './createhiddeninput';
import { InsertLocation } from './insertlocation';
import { UpdateLocation } from './updatelocation';
import { UtilConfertDecimalToString } from './utilconfertdecimaltostring';

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

    setupHiddenInputs(klantid)
    {
         // Create hidden inputs for the popup info
         var crInput = new CreateHiddenInput("hiddeninput");
        
         crInput.createHiddenInput("locid", 0);
         crInput.createHiddenInput("latitude", 0);
         crInput.createHiddenInput("longitude", 0);
         crInput.createHiddenInput("bertitel", "");
         crInput.createHiddenInput("bertext", "");
         crInput.createHiddenInput("berichtid", 0);
         crInput.createHiddenInput("klantid", klantid);
    }
}

var utilparm = new UtilFindAdresBarParam(); // Get the id from parameter in url bar
var url = "http://localhost:63744/api/location/";
var klantId = utilparm.findGetParameter('klantid');

var m = new Main(url + klantId);
m.setupOSMapOnPage();
m.setupHiddenInputs(klantId);

// TEST UPDATE LOCATION
// var updte = new UpdateLocation();

// locid=42&latitude=52%2C3&longitude=4&bertitel=Dit+is+een+nieuwe+titel&bertext=Dit+is+een+text+over+deze+locatie&berichtid=2&klantid
// (url, locid, latitude, longitude, berTitle, berText, berichtid, klantid)

// updte.updateLocation(url + utilparm.findGetParameter('klantid'),
//                     42,
//                     new UtilConfertDecimalToString().convertdecimalstring(52.36586),
//                     new UtilConfertDecimalToString().convertdecimalstring(4.36586),
//                     "Dit is een nieuwe koffiekop", 
//                     "zo ist maar net dus dat dan weer wel",
//                     2,
//                     utilparm.findGetParameter('klantid')
//                     );

// https://openlayers.org/en/latest/examples/overlay.html
// https://code.lengstorf.com/learn-rollup-js/
// browserify main.js -o bundle.js