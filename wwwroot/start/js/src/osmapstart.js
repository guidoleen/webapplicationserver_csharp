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
        this.view;
    }

    setupOSMap(jsonAdres, strDiv, lat, lon, zoomf)
    {
        // Create the map
        // Create view first into the map
        this.view = new ol.View({
          // projection: "EPSG:4326",
          center: ol.proj.fromLonLat([lat, lon]),
          zoom: zoomf
        });
        // The Map
        this.map = new ol.Map({
            target: strDiv,
            layers: [
              new ol.layer.Tile({
                source: new ol.source.OSM()
              })
            ],
            view: this.view
          });

          // Put the Json on the map
          var jsonMap = new JsonOnMap(jsonAdres);
          jsonMap.putTheJsonOnMap(this.map, strDiv);

          // Add the popup and event Listeners to the map
          var eventsMap = new EventsMap( this.map, strDiv );
          eventsMap.addPopUpInMap();

          // Add the eventlisteners
          eventsMap.addTheEventListeners( new OverLayInfo( this.map, strDiv ), this.view );
    }
}