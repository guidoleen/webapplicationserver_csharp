import { JsonOnMap } from './jsononmap';
// import VectorSource from 'ol/source/Vector';

export class OsmapStart
{
    constructor()
    {
        this.map;
    }

    setupOSMap(strDiv, lat, lon, zoomf)
    {
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

          // Test
          var jsonOnMap = new JsonOnMap("jsonApi");

        var vectorSrc = new ol.source.Vector({});
        jsonOnMap.putTheJsonOnMap(vectorSrc);

        var vectorLr = new ol.layer.Vector({
            source: vectorSrc
        });
        this.map.addLayer(vectorLr);
    }

    addVectorSourceToMap(jsonApi)
    {
        var jsonOnMap = new JsonOnMap(jsonApi);

        var vectorSrc = new ol.source.Vector({});
        jsonOnMap.putTheJsonOnMap(vectorSrc);

        var vectorLr = new ol.layer.Vector({
            source: vectorSrc
        });
        this.map.addLayer(vectorLr);
    }
}