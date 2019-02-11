(function () {
    'use strict';

    class OverLayInfo
    {
        constructor(osMap, osMapName, iNo, lat, lon)
        {
            this.osMap = osMap; 
            this.osMapName = osMapName;
            this.iNo = iNo;
            this.lat = lat; 
            this.lon = lon;
        }

        get osMap()
        {
            return this._osMap;
        }
        set osMap(osMap)
        {
            this._osMap = osMap;
            return;
        }

        get osMapName()
        {
            return this._osMapName;
        }
        set osMapName(osMapName)
        {
            this._osMapName = osMapName;
            return
        }

        get iNo()
        {
            return this._iNo;
        }
        set iNo(iNo)
        {
            this._iNo = iNo;
            return;
        }

        get lat()
        {
            return this._lat;
        }
        set lat(lat)
        {
            this._lat = lat;
        }

        get lon()
        {
            return this._lon;
        }
        set lon(lon)
        {
            this._lon = lon;
            return;
        }
    }

    class PopUp
    {
        constructor(){}

        setPopUpinMap( overLayInfo, strText ) // osMap, osMapName, divPopUp, lat, lon)
        {
            var mapDiv = document.getElementById(overLayInfo.osMapName);
            var popDiv = document.getElementById(overLayInfo.iNo);

            mapDiv.appendChild( popDiv );

            var pos = ol.proj.fromLonLat([overLayInfo.lon, overLayInfo.lat]); // ol.proj.transform([lat, lon], 'EPSG:4326', 'EPSG:3857');
            var popup = new ol.Overlay({
              position: pos,
              positioning: 'center-center',
              element: document.getElementById(overLayInfo.divPopUp)
            });

            popDiv.innerHTML = strText;
            overLayInfo.osMap.addOverlay(popup);
        }
    }

    class EventsMap
    {
        constructor(map, mapId)
        {
            this.map = map;
            this.mapId = mapId;
        }

        onMarkerClick(id, pos)
        {
            var pop = new PopUp();
            pop.setPopUpinMap( new OverLayInfo( this.map, this.mapId, "popup", pos.latitude, pos.longitude ), "Blalalala" );

        }
    }

    class Marker
    {
        // Set the marker
        setNewMarker( overLayInfo ) // osMap, osMapName, iNo, lat, lon)
        {
            var mapDiv = document.getElementById(overLayInfo.osMapName);
            var divMarker = document.createElement("div");
            divMarker.id = overLayInfo.iNo;
            divMarker.className = "map-overlay-marker";

            mapDiv.appendChild(divMarker);

            var posJson = { "latitude" : overLayInfo.lon, "longitude" : overLayInfo.lat };
            var pos = ol.proj.fromLonLat([overLayInfo.lon, overLayInfo.lat]); // ol.proj.transform([lat, lon], 'EPSG:4326', 'EPSG:3857');
              var marker = new ol.Overlay({
                position: pos,
                positioning: 'center-center',
                element: document.getElementById(overLayInfo.iNo)
              });

              divMarker.addEventListener("click", function(){ new EventsMap().onMarkerClick(this.id, posJson); }); // Event Listener for popup

              overLayInfo.osMap.addOverlay(marker); // Adds the marker on the map
        }
    }

    // https://openlayers.org/en/latest/examples/overlay.html
    // https://gis.stackexchange.com/questions/153092/add-feature-manually-to-a-vector-layer-in-ol3

    class MarkersOnMap
    {
        constructor(){}

        putMarkersOnMap(osMap, osMapName, arrJson)
        {
            for (let index = 0; index < arrJson.length; index++) 
            {
                var marker = new Marker();
                marker.setNewMarker( new OverLayInfo(osMap, osMapName, arrJson[index].locid, arrJson[index].latitude, arrJson[index].longitude) );
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
        putTheJsonOnMap(osMap, osMapName)
        {
            var monmap = new MarkersOnMap();
                    
            xmlhttp.onreadystatechange = function()
            {
                if(this.readyState == 4 && this.status == 200)
                {
                    var jsonObj = JSON.parse(xmlhttp.response); // JSON.parse(xmlhttp.response);
                    jsonObj = JSON.parse(jsonObj); // Parse JSON twice

                    monmap.putMarkersOnMap(osMap, osMapName, jsonObj);
                }
            };
            xmlhttp.open("GET", this.jsonres, true);
            xmlhttp.send();
        }
    }

    // import VectorSource from 'ol/source/Vector';

    class OsmapStart
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

}());
