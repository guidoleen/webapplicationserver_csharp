(function () {
    'use strict';

    class OverLayInfo
    {
        constructor(osMap, osMapName, iNo, lat, lon, berTitle, berText, berId)
        {
            this.osMap = osMap; 
            this.osMapName = osMapName;
            this.iNo = iNo;
            this.lat = lat; 
            this.lon = lon;
            this.berTitle = berTitle;
            this.berText = berText;
            this.berId = berId;
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

        get berTitle()
        {
            return this._berTitle;
        }

        set berTitle(berTitle)
        {
            this._berTitle = berTitle;
        }

        get berText()
        {
            return this._berText;
        }

        set berText(berText)
        {
            this._berText = berText;
        }

        get berId()
        {
            return this._berId;
        }

        set berId(berId)
        {
            this._berId = berId;
        }
    }

    class MarkersEvents
    {
        constructor(){}
        
        markerShowPopup(id)
        {
            var popUpDiv = document.getElementById(id);
            popUpDiv.style.display = "block";
        }

        markersHidePopup(id)
        {
            var popUpDiv = document.getElementById(id);
            popUpDiv.style.display = "none";
        }
    }

    class PopUp
    {
        constructor(popupid)
        {
            this.overlay;
            this.popupdiv = this.createPopUpDiv(popupid);
            this.popupoverl = this.createPopUpOverlay();
        }

        createPopUpDiv(popupid)
        {
            return document.getElementById(popupid);
        }

        createPopUpOverlay()
        {
              return new ol.Overlay({
                element: this.popupdiv
              });
        }

        setPopUpinMap( overLayInfo ) // osMap, osMapName, divPopUp, lat, lon)
        {
            this.popupid = overLayInfo.iNo;

            var pos = ol.proj.fromLonLat([overLayInfo.lat, overLayInfo.lon]); // ol.proj.transform([overLayInfo.lat, overLayInfo.lon], 'EPSG:4326', 'EPSG:3857'); // 
            this.popupoverl.setPosition(pos);

              overLayInfo.osMap.addOverlay(this.popupoverl);
        
            this.popupdiv.innerHTML = this.setCloseX() + this.setH3(overLayInfo.berTitle) +  this.setP(overLayInfo.berText) + this.setSaveForm("strApiUrl");

            document.getElementById("popup_closer").addEventListener("click", function(){
                new MarkersEvents().markersHidePopup(overLayInfo.iNo);
            });
            return;
        }

        get getPopUp()
        {
            return this.popupoverl; // document.getElementById(this.popupid);
        }

        setCloseX()
        {
            return "<div id='popup_closer' class='ol-popup-closer'></div>";
        }

        setH3(strTitle)
        {
            return "<h3 class='ol-popup-h3'>" + strTitle + "</h3>";
        }

        setP(strText)
        {
            return "<p class='ol-popup-p'>" + strText + "</p>";
        }

        setSaveForm(strApiUrl)
        {
            var strForm = "<form method='put' action='" + strApiUrl + "'>";
            strForm += "<span class='input-span'>Titel</span>";
            strForm += "<input class='input-txt mrg-bottom' type='text' name='title'>";
            strForm += "<span class='input-span'>Bericht</span>";
            strForm += "<input class='input-txt mrg-bottom' type='text' name='bericht'>";
            strForm += "<input class='input-button' type='button' value='Save' >";
            strForm += "</form>";

            return strForm;
        }
    }

    class CreateNewMarker
    {
        constructor(){}

        putMarkerOnMap(osMap, osMapName, arrJson)
        {
            var marker = new Marker();
            marker.setNewMarker( new OverLayInfo(osMap, osMapName, arrJson.locid, arrJson.latitude, arrJson.longitude, arrJson.bertitel, arrJson.bertext, arrJson.berichtid ) );
        }
    }

    class EventsMap
    {
        constructor(map, mapId)
        {
            this.map = map;
            this.mapId = mapId;
            this.popupId = "popup";
            this.popup = new PopUp(this.popupId);
            this.lonCorr = 0.5;
        }
        
        addPopUpInMap()
        {
            this.popup.setPopUpinMap( new OverLayInfo( this.map, this.mapId, this.popupId, 5, 52 ), "Dus" ); // (osMap, osMapName, iNo, lat, lon)
            return;
        }

        onMarkerClick(overLayInfo, id)
        {
            this.popup.setPopUpinMap( new OverLayInfo( overLayInfo.osMap, overLayInfo.osMapName, this.popupId, (overLayInfo.lon - this.lonCorr), overLayInfo.lat, overLayInfo.berTitle, overLayInfo.berText ), id ); // (osMap, osMapName, iNo, lat, lon)
            new MarkersEvents().markerShowPopup(this.popupId);
            
            return;
            // console.log(this.popup.getPopUp.getElement());
        }

        // EventListeners
        // New single Marker on the map
        onNewMarkerClick( overLayInfo, osView )
        {
            document.getElementById("create_newmarker").addEventListener("click", function()
            {
                var geolocation = new ol.Geolocation({
                        projection: osView.getProjection(),
                        tracking: true
                    });

                console.log(geolocation.getPosition());

                var arrJson = {
                    "latitude": 51.1,    
                    "longitude": 5.1,
                    "locid": Math.random(),    
                    "klantid": 0,   
                    "berichtid": 2,
                    "bertitel": "Vul deze in...",    
                    "bertext": "Doe is wat...." 
                };
                new CreateNewMarker().putMarkerOnMap( overLayInfo.osMap, overLayInfo.osMapName, arrJson );
            });
        }

        // Add the EventListeners on MapStart
        addTheEventListeners( overLayInfo, osView )
        {
            this.onNewMarkerClick( overLayInfo, osView );
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

            var pos = ol.proj.fromLonLat([overLayInfo.lon, overLayInfo.lat]); // ol.proj.transform([lat, lon], 'EPSG:4326', 'EPSG:3857');
              var marker = new ol.Overlay({
                position: pos,
                positioning: 'center-center',
                element: document.getElementById(overLayInfo.iNo)
              });

              divMarker.addEventListener("click", function(){ new EventsMap().onMarkerClick(overLayInfo); }); // Event Listener for popup

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
                marker.setNewMarker( new OverLayInfo(osMap, osMapName, arrJson[index].locid, arrJson[index].latitude, arrJson[index].longitude, arrJson[index].bertitel, arrJson[index].bertext, arrJson[index].berichtid ) );
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

    class UtilFindAdresBarParam
    {
        constructor(){};

        findGetParameter(parameterName) 
        {
            var result = null,
                tmp = [];
            window.location.search
                .substr(1)
                .split("&")
                .forEach(function (item) {
                tmp = item.split("=");
                if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
                });
            return result;
        }
    }

    var xmlhttp$1 = new XMLHttpRequest();

    class UpdateLocation
    {
        constructor(){}

        updateLocation(url, klantid, berTitle, berText)
        {
            
            var params = klantid + berTitle + berText;
            
            // http.withCredentials = true;

            xmlhttp$1.onreadystatechange = function() 
            {
                console.log(xmlhttp$1.readyState);
                console.log(xmlhttp$1.status);

                if(this.readyState == 4 && this.status == 204)
                {
                    console.log(xmlhttp$1.responseText + "Bla" + params);
                }
            };

            xmlhttp$1.open('POST', url, true);
            xmlhttp$1.setRequestHeader('Content-type', 'application/x-www-form-urlencoded'); //Send the proper header information along with the request
            xmlhttp$1.send(params);

            ///
            var XHR = new XMLHttpRequest();
            XHR.withCredentials = true;
            XHR.onreadystatechange = function() {
              if (XHR.readyState == 4) {
                if(XHR.status == 201) {
                  console.log("IT WORKED!");
                } else {
                  console.log("ummm something is wrong");
                }
              }
            };
            XHR.open("POST", url);
            XHR.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            var data = "username=";
            XHR.send(data);
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

    var url = "http://localhost:63744/api/location/";
    var utilparm = new UtilFindAdresBarParam(); // Get the id from parameter in url bar
    var m = new Main(url + utilparm.findGetParameter('klantid'));
    m.setupOSMapOnPage();

    // TEST
    var updte = new UpdateLocation();
    updte.updateLocation(url + utilparm.findGetParameter('klantid'), 1, "berTitle", "berText");

    // https://openlayers.org/en/latest/examples/overlay.html
    // https://code.lengstorf.com/learn-rollup-js/
    // browserify main.js -o bundle.js

}());
