import { JsonOnMap } from './jsononmap';
import { Marker } from './marker';
import { PopUp } from './popup';
import { OverLayInfo } from './overlayinfo';
import { EventsMap } from './eventsmap';

// import VectorSource from 'ol/source/Vector';

export class OsmapStart
{
    constructor()
    {
        this.map;
    }

    setupOSMap(jsonAdres, strDiv, lat, lon, zoomf)
    {
        // Create the map
        this.map = new ol.Map({
            target: strDiv,
            layers: [
              new ol.layer.Tile({
                source: new ol.source.OSM()
              })
            ],
            view: new ol.View({
              center: ol.proj.fromLonLat([lat, lon]),
              zoom: zoomf
            })
          });

          // Put the Json on the map
          var jsonMap = new JsonOnMap(jsonAdres);
          jsonMap.putTheJsonOnMap(this.map, strDiv);

          // Add the event Listeners to the map
          var eventsMap = new EventsMap( this.map, strDiv );
    }
}