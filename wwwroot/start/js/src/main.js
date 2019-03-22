import { OsmapStart } from './osmapstart';
import { EventsMap } from './eventsmap';
// import { UtilFindAdresBarParam } from './utilfindadresbarparam';
import { CreateHiddenInput } from './createhiddeninput';
import { InsertLocation } from './insertlocation';
import { UpdateLocation } from './updatelocation';
import { UtilConfertDecimalToString } from './utilconfertdecimaltostring';
import { Modal } from './modal';

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
         crInput.createHiddenInput("sessionid", 0);
         crInput.createHiddenInput("sessiontoken", 0);
    }

    setUpModal()
    {
        var modal = new Modal();
        modal.setDivOverallModal("Login");
    }

    IsEmpty(value)
    {
        if(value === undefined || value === "" || value === null )
            return true;
        return false;
    }
}

// Call the main class

var m = new Main(URL + KLANTID + "/1/1", C_LAT, C_LON);
m.setupOSMapOnPage();
m.setupHiddenInputs(KLANTID);
m.setUpModal();

console.log("Main: " + document.cookie + " " + KLANTID);
// http://localhost:63744/api/location/2/1/1 - POST - DISPLAY
// http://localhost:63744/api/location/2/1 - POST - LOGIN
// http://localhost:63744/api/location/2/0 - POST - LOGOUT
// http://localhost:63744/api/location/2 - POST - UPDATE
// http://localhost:63744/api/location/2 - PUT - INSERT

// https://openlayers.org/en/latest/examples/overlay.html
// https://code.lengstorf.com/learn-rollup-js/
// browserify main.js -o bundle.js