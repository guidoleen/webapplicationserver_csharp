import { OsmapStart } from './osmapstart';
import { EventsMap } from './eventsmap';
// import { UtilFindAdresBarParam } from './utilfindadresbarparam';
import { CreateHiddenInput } from './createhiddeninput';
import { InsertLocation } from './insertlocation';
import { UpdateLocation } from './updatelocation';
import { UtilConfertDecimalToString } from './utilconfertdecimaltostring';

class Main
{
    constructor(jsonAdres, C_lat, C_lon)
    {
        this.jsonAdres = jsonAdres;
        this.C_lon = C_lon;
        this.C_lat = C_lat;
    }

    // Open Street Map class and put markers there
    setupOSMapOnPage()
    {
        var c_lat = this.IsEmpty(this.C_lat) ? 52 : this.C_lat;
        var c_lon = this.IsEmpty(this.C_lon) ? 5 : this.C_lon;

        var osmap = new OsmapStart(); 
        osmap.setupOSMap(this.jsonAdres, "osmap", parseFloat(c_lon), parseFloat(c_lat), 8);
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
         crInput.createHiddenInput("C_HLAT", 0);
         crInput.createHiddenInput("C_HLON", 0);
    }

    IsEmpty(value)
    {
        if(value === undefined || value === "" || value === null )
            return true;
        return false;
    }
}

var m = new Main(URL + KLANTID, C_LAT, C_LON);
m.setupOSMapOnPage();
m.setupHiddenInputs(KLANTID);

// https://openlayers.org/en/latest/examples/overlay.html
// https://code.lengstorf.com/learn-rollup-js/
// browserify main.js -o bundle.js