import { JsonOnMap } from './jsononmap';
import { OsmapStart } from './osmapstart';
import { MarkersFeature } from './markersfeature';
import { MarkersOnMap } from './markersonmap';


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
        osmap.setupOSMap("osmap", 5, 52, 10);
        // osmap.addVectorSourceToMap(this.jsonAdres);
    }
}

var m = new Main("http://localhost:63744/api/location");
m.setupOSMapOnPage();



// https://code.lengstorf.com/learn-rollup-js/
// browserify main.js -o bundle.js