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

            if(this.popupdiv !== null)
            {
                var pos = ol.proj.fromLonLat([overLayInfo.lat, overLayInfo.lon]); // ol.proj.transform([overLayInfo.lat, overLayInfo.lon], 'EPSG:4326', 'EPSG:3857'); // 
                this.popupoverl.setPosition(pos);

                    overLayInfo.osMap.addOverlay(this.popupoverl);
            
                this.popupdiv.innerHTML = this.setCloseX() + this.setH3(overLayInfo.berTitle) +  this.setP(overLayInfo.berText) + this.setSaveForm("strApiUrl");

                document.getElementById("popup_closer").addEventListener("click", function(){
                    new MarkersEvents().markersHidePopup(overLayInfo.iNo);
                });
            }
            
            return;
        }

        setPopUpLatLonPosition(osMap, lat, lon)
        {
            var pos = ol.proj.fromLonLat([lat, lon]); // ol.proj.transform([overLayInfo.lat, overLayInfo.lon], 'EPSG:4326', 'EPSG:3857'); // 
            this.popupoverl.setPosition(pos);

            osMap.addOverlay(this.popupoverl);
        }

        get getPopUp()
        {
            return this._popupoverl; // document.getElementById(this.popupid);
        }

        set setPopUp(popupoverl)
        {
            this._popupoverl = popupoverl;
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
            strForm += "<input id='form_title' class='input-txt mrg-bottom' type='text' name='title'>";
            strForm += "<span class='input-span'>Bericht</span>";
            strForm += "<input id='form_bertext' class='input-txt mrg-bottom' type='text' name='bericht'>";
            strForm += "<div id='save' class='input-button mrg-bottom' type='button' value='Save' onclick='save();' >Save</div>";
            strForm += "<div id='delete' class='input-button delete-button' type='button' value='Save' onclick='deleteThis();' >Delete</div>";
            strForm += "</form>";

            return strForm;
        }
    }

    class CreateNewMarker
    {
        constructor(){}

        putMarkerOnMap(osMap, osMapName, arrJson, evMap, insertNo)
        {
            var marker = new Marker();
            marker.setNewMarker( new OverLayInfo(osMap, osMapName, arrJson.locid, arrJson.latitude, arrJson.longitude, arrJson.bertitel, arrJson.bertext, arrJson.berichtid ), evMap, insertNo );
        }
    }

    var xmlhttp = new XMLHttpRequest();

    class CreateHiddenInput
    {
        constructor(divname)
        {
            this.divname = divname;
        }
        createHiddenInput(name, value)
        {
            var input = document.createElement("input");
            input.setAttribute("type", "hidden");
            input.setAttribute("id", name);
            input.setAttribute("name", name);
            input.setAttribute("value", value);

            document.getElementById(this.divname).appendChild(input);
        }
        setHiddenInput(name, value)
        {
            var inputdoc = document.getElementById(name);
            inputdoc.value = value;
        }
        getInputValue(name)
        {
            var inputdoc = document.getElementById(name);
            return inputdoc.value;
        }
    }

    class EventsMap
    {
        constructor(map, mapId, popUp)
        {
            this.map = map;
            this.mapId = mapId;
            this.popupId = "popup";
            this.popup = popUp; // new PopUp(this.popupId);
            this.lonCorr = 0.5;
        }
        
        addPopUpInMap() // Init popup in de map
        {
            // constructor(osMap, osMapName, iNo, lat, lon, berTitle, berText, berId)
            this.popup.setPopUpinMap( new OverLayInfo( this.map, this.mapId, this.popupId, 5, 52, "Dus", "Dus",  0) ); // (osMap, osMapName, iNo, lat, lon)
            return;
        }

        onMarkerClickPopUp(overLayInfo, divMarker, divPopUpMarker, markerid)
        {
            // OLD STUFF // this.popup.setPopUpinMap( new OverLayInfo( overLayInfo.osMap, overLayInfo.osMapName, this.popupId, (overLayInfo.lon - this.lonCorr), overLayInfo.lat, overLayInfo.berTitle, overLayInfo.berText ), id ); // (osMap, osMapName, iNo, lat, lon)
            var lat = parseFloat(divPopUpMarker.dataset.lat);
            var lon = parseFloat(divPopUpMarker.dataset.lon);

            this.popup.setPopUpinMap( new OverLayInfo( overLayInfo.osMap, overLayInfo.osMapName, this.popupId, lon, 
                lat, overLayInfo.berTitle, overLayInfo.berText ), markerid ); // (osMap, osMapName, iNo, lat, lon)
            
            // Pass info to the hidden input types after popup clicked
            var crInput = new CreateHiddenInput("hiddeninput");
            
             crInput.setHiddenInput("locid", overLayInfo.iNo);
             crInput.setHiddenInput("latitude", lat);
             crInput.setHiddenInput("longitude", lon);
             crInput.setHiddenInput("bertitel", overLayInfo.berTitle);
             crInput.setHiddenInput("bertext", overLayInfo.berText);
             crInput.setHiddenInput("berichtid", divMarker.dataset.berichtid);
             crInput.setHiddenInput("insert", markerid);

             // Show popup in osmap
            new MarkersEvents().markerShowPopup(this.popupId);
            
            return;
            // console.log(this.popup.getPopUp.getElement());
        }

        // EventListeners
        // New single Marker on the map
        onNewMarkerClick( overLayInfo, osView, popU )
        {
            document.getElementById("create_newmarker").addEventListener("click", function()
            {
                var position = ol.proj.transform( overLayInfo.osMap.getView().getCenter(), 'EPSG:3857', 'EPSG:4326' );

                var arrJson = {
                    "latitude": position[1],    
                    "longitude": position[0],
                    "locid": Math.random(),
                    "klantid": 0,   
                    "berichtid": 2,
                    "bertitel": "Vul deze in...",    
                    "bertext": "Doe is wat...." 
                };
                // putMarkerOnMap(osMap, osMapName, arrJson, evMap, insertNo)
                new CreateNewMarker().putMarkerOnMap( overLayInfo.osMap, overLayInfo.osMapName, arrJson, 
                                                        new EventsMap( overLayInfo.osMap, overLayInfo.osMapName, popU ), 1 );
            });
        }

        // Add the EventListeners on MapStart
        addTheEventListeners( overLayInfo, osView, popU )
        {
            this.onNewMarkerClick( overLayInfo, osView, popU );
        }
    }

    class MarkersDrag
    {
        constructor(){}
        dragMarkerEventListners(osmap, marker, divMarker, divPopUpMarker)
        {
            var lonlat;
            var lat = divPopUpMarker.dataset.lat;
            var lon = divPopUpMarker.dataset.lon;
            var dragPan;
            osmap.getInteractions().forEach(function(interaction){
                if (interaction instanceof ol.interaction.DragPan) {
                    dragPan = interaction;  
            }
            });

            divMarker.addEventListener('pointerdown', function(evt) {
                dragPan.setActive(false);
                marker.set('dragging', true);
                console.info('start dragging');
                
                lonlat = ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
                lon = lonlat[0];
                lat = lonlat[1];
            });

            osmap.on('pointermove', function(evt) {
                if (marker.get('dragging') === true) {
                marker.setPosition(evt.coordinate);

                lonlat = ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
                lon = lonlat[0];
                lat = lonlat[1];
                }
            });

            osmap.on('pointerup', function(evt) 
            {
                if (marker.get('dragging') === true) 
                {
                console.info('stop dragging');
                console.log(lon + " Lat " + lat);
                console.log(evt.coordinate);

                divPopUpMarker.dataset.lon = lon; // evt.coordinate[0];
                divPopUpMarker.dataset.lat = lat; // evt.coordinate[1];

                    // popUp.setPosition(evt.coordinate); // .setPopUpLatLonPosition(osmap, lat, lon);

                dragPan.setActive(true);
                marker.set('dragging', false);
                }
            });
        }
    }

    // http://jsfiddle.net/jonataswalker/rnzgfg89/

    class Marker
    {
        setNewMarker( overLayInfo, evMap, insertNo ) // osMap, osMapName, iNo, lat, lon)
        {
            var mapDiv = document.getElementById(overLayInfo.osMapName);

            var divPopUpMarker = document.createElement("div");
            divPopUpMarker.id = "pop" + overLayInfo.iNo;
            divPopUpMarker.className = "map-overlay-popupmarker";

            var divMarker = document.createElement("div");
            divMarker.id = overLayInfo.iNo;
            divMarker.className = "map-overlay-marker";

            // Add the latlon info into attribute
            this.createAnAttribute(divPopUpMarker, "lat", parseFloat(overLayInfo.lat));
            this.createAnAttribute(divPopUpMarker, "lon", parseFloat(overLayInfo.lon));
            this.createAnAttribute(divMarker, "insert", insertNo);
            this.createAnAttribute(divMarker, "berichtid", overLayInfo.berId);

            // Append the popup button to the marker
            divMarker.appendChild(divPopUpMarker);

            // Append the marker in the map
            mapDiv.appendChild(divMarker);

            var pos = ol.proj.fromLonLat([overLayInfo.lon, overLayInfo.lat]); // ol.proj.transform([lat, lon], 'EPSG:4326', 'EPSG:3857');
              var marker = new ol.Overlay({
                position: pos,
                positioning: 'center-center',
                element: document.getElementById(overLayInfo.iNo),
                stopEvent: false,
                dragging: false
              });
              overLayInfo.osMap.addOverlay(marker); // Adds the marker on the map

              divPopUpMarker.addEventListener("click", function()
              { 
                  evMap.onMarkerClickPopUp(overLayInfo, divMarker, divPopUpMarker, divMarker.id); 
              }); // Event Listener for popup
              new MarkersDrag().dragMarkerEventListners( overLayInfo.osMap, marker, divMarker, divPopUpMarker ); // Event Listeners for dragging marker
        }

        createAnAttribute(divMarker, attrName, value)
        {
              var att = document.createAttribute("data-" + attrName);  // Create a "lat" attribute
              att.value = value;
              divMarker.setAttributeNode(att); 
        }
    }

    // https://openlayers.org/en/latest/examples/overlay.html
    // https://gis.stackexchange.com/questions/153092/add-feature-manually-to-a-vector-layer-in-ol3

    class MarkersOnMap
    {
        constructor(){}

        putMarkersOnMap(osMap, osMapName, arrJson, evMap)
        {
            for (let index = 0; index < arrJson.length; index++) 
            {
                var marker = new Marker();
                marker.setNewMarker( new OverLayInfo(osMap, osMapName, arrJson[index].locid, arrJson[index].latitude, arrJson[index].longitude, arrJson[index].bertitel, arrJson[index].bertext, arrJson[index].berichtid ), evMap, 0 );
            }
        }
    }

    var xmlhttp$1 = new XMLHttpRequest();

    class JsonOnMap
    {
        constructor(jsonres)
        {
            this.jsonres = jsonres;
        }
        putTheJsonOnMap(osMap, osMapName, evMap)
        {
            var monmap = new MarkersOnMap();
                    
            xmlhttp$1.onreadystatechange = function()
            {
                if(this.readyState == 4 && this.status == 200)
                {
                    var jsonObj = JSON.parse(xmlhttp$1.response); // JSON.parse(xmlhttp.response);
                    jsonObj = JSON.parse(jsonObj); // Parse JSON twice

                    monmap.putMarkersOnMap(osMap, osMapName, jsonObj, evMap);
                }
            };
            xmlhttp$1.open("GET", this.jsonres, true);
            xmlhttp$1.send();
        }
    }

    // import VectorSource from 'ol/source/Vector';
    var evmap;

    class OsmapStart
    {
        constructor()
        {
            this.map;
            this.view;
            this.popUp;
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

              // Firt create EventsMap and popup
              // Add the popup and event Listeners to the map
              var popU = new PopUp("popup"); // popU.setPopUpinMap( new OverLayInfo(this.map, strDiv, "popup", 0,0,"","",0) );
              
              evmap = new EventsMap( this.map, strDiv, popU );
              evmap.addPopUpInMap();

              // Put the Json on the map
              var jsonMap = new JsonOnMap(jsonAdres);
              jsonMap.putTheJsonOnMap(this.map, strDiv, evmap);
           
              // Add the eventlisteners
              evmap.addTheEventListeners( new OverLayInfo( this.map, strDiv ), this.view, popU );
        }
    }

    var xmlhttp$2 = new XMLHttpRequest();

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
        }
    }

    var m = new Main(URL + KLANTID);
    m.setupOSMapOnPage();
    m.setupHiddenInputs(KLANTID);

    // https://openlayers.org/en/latest/examples/overlay.html
    // https://code.lengstorf.com/learn-rollup-js/
    // browserify main.js -o bundle.js

}());
