(function () {
    'use strict';

    class MarkersFeature
    {
        getNewFeature(iNo, lat, lon)
        {
            var iconFeature = new Feature({
                geometry: new Point([lat, lon]),
                name: 'Marker' + iNo,
                id: iNo
              });

              var iconStyle = new Style({
                image: new Icon(/** @type {module:ol/style/Icon~Options} */ ({
                  anchor: [0.5, 46],
                  anchorXUnits: 'fraction',
                  anchorYUnits: 'pixels',
                  src: '../img/marker.png'
                }))
              });

              iconFeature.setStyle(iconStyle);
            return iconFeature;
        }
    }

    // https://gis.stackexchange.com/questions/153092/add-feature-manually-to-a-vector-layer-in-ol3

    class MarkersOnMap
    {
         putMarkerOnMap(_vectorsource, _jsonObj)
         {
            //Loop through the markers array

            for (var i=0; i<_jsonObj.length; i++) {
           
                var lat = _jsonObj[i].latitude;
                var lon = _jsonObj[i].longitude;

                var feature  = new MarkersFeature(i, lat, lon);
                            
                _vectorsource.addFeatures(feature);
             }                        
         }
    }

    var xmlhttp = new XMLHttpRequest();

    class JsonOnMap
    {
        constructor(jsonres)
        {
            this.jsonres = jsonres;
        }
        putTheJsonOnMap(vectorsource)
        {
            xmlhttp.onreadystatechange = function()
            {
                if(this.readyState == 4 && this.status == 200)
                {
                    // var jsonObj = JSON.parse(xmlhttp.responseText);

                    var monmap = new MarkersOnMap();
                    monmap.putMarkerOnMap(vectorsource, OBJWEG);
                    // divobj.innerHTML = OBJWEG[0].latitude;
                }
            };
            xmlhttp.open("GET", this.jsonres, true);
            xmlhttp.send();
        }
    }

    var OBJWEG = [
        {    "latitude": 52.072,    "longitude": 5.184,    "locid": 1  },  {    "latitude": 52.3,    "longitude": 2.2,    "locid": 3  },  {    "latitude": 52.3,    "longitude": 2.2,    "locid": 4  }
    ];

    // 52.072852, 5.184728

    // import VectorSource from 'ol/source/Vector';

    class OsmapStart
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

}());
