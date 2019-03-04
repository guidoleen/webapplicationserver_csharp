import { OsmapStart } from './osmapstart';
import { EventsMap } from './eventsmap';
// import { UtilFindAdresBarParam } from './utilfindadresbarparam';
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
         crInput.createHiddenInput("insert", -1);
    }
}

var m = new Main(URL + KLANTID);
m.setupOSMapOnPage();
m.setupHiddenInputs(KLANTID);

// https://openlayers.org/en/latest/examples/overlay.html
// https://code.lengstorf.com/learn-rollup-js/
// browserify main.js -o bundle.js