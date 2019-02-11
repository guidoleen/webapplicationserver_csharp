import { OsmapStart } from './osmapstart';
import { EventsMap } from './eventsmap';

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

var m = new Main("http://localhost:63744/api/location");
m.setupOSMapOnPage();

// https://openlayers.org/en/latest/examples/overlay.html
// https://code.lengstorf.com/learn-rollup-js/
// browserify main.js -o bundle.js