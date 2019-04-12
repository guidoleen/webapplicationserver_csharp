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

        putMarkerOnMap(osMap, osMapName, arrJson, evMap, insertNo, markerCss)
        {
            var marker = new Marker();
            marker.setNewMarker( new OverLayInfo(osMap, osMapName, arrJson.locid, arrJson.latitude, arrJson.longitude, arrJson.bertitel, arrJson.bertext, arrJson.berichtid ), 
                                evMap, insertNo, markerCss );
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
                                                        new EventsMap( overLayInfo.osMap, overLayInfo.osMapName, popU ), 1, // 1 => Insert nummer == true
                                                        "map-overlay-newmarker" ); 
            });
        }

        onMapDragging( overLayInfo )
        {
            var crInput = new CreateHiddenInput("hiddeninput");
            var position;

                overLayInfo.osMap.on('moveend', function(ev) {
                position = ol.proj.transform( this.getView().getCenter(), 'EPSG:3857', 'EPSG:4326' );

                crInput.setHiddenInput("C_HLAT", position[1]);
                crInput.setHiddenInput("C_HLON", position[0]);
              });
        }

        // Add the EventListeners on MapStart
        addTheEventListeners( overLayInfo, osView, popU )
        {
            this.onNewMarkerClick( overLayInfo, osView, popU );
            this.onMapDragging( overLayInfo );
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
        setNewMarker( overLayInfo, evMap, insertNo, markerCss ) // osMap, osMapName, iNo, lat, lon)
        {
            var mapDiv = document.getElementById(overLayInfo.osMapName);

            var divPopUpMarker = document.createElement("div");
            divPopUpMarker.id = "pop" + overLayInfo.iNo;
            divPopUpMarker.className = "map-overlay-popupmarker";

            var divMarker = document.createElement("div");
            divMarker.id = overLayInfo.iNo;
            divMarker.className = markerCss; // "map-overlay-marker";

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
                marker.setNewMarker( new OverLayInfo(osMap, osMapName, arrJson[index].locid, arrJson[index].latitude, arrJson[index].longitude, arrJson[index].bertitel, arrJson[index].bertext, arrJson[index].berichtid ), 
                evMap, 0, "map-overlay-marker" );
            }
        }
    }

    class Cookie$1
    {
         setCookie(cname,cvalue,exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays*24*60*60*1000));
            var expires = "expires=" + d.toGMTString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
          }
          
        getCookie(cname) {
            var name = cname + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for(var i = 0; i < ca.length; i++) {
              var c = ca[i];
              while (c.charAt(0) == ' ') {
                c = c.substring(1);
              }
              if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
              }
            }
            return "";
          }

          deleteCookie()
          {
            document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          }
    }

    class CreatePostDataString
        {
            createPostDataString(key, value, amp)
            {
                return key + "=" + value + amp;
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

            // Data from cookie to c#
            var sessionId = new Cookie$1().getCookie("sessionid");
            var sessionToken = new Cookie$1().getCookie("sessiontoken");

            var strdata = new CreatePostDataString().createPostDataString("sessionid", sessionId, "&");
            strdata += new CreatePostDataString().createPostDataString("sessiontoken", sessionToken, "");

            xmlhttp$1.open("POST", this.jsonres, true); // http://localhost:63744/api/location/2/1/1
            xmlhttp$1.setRequestHeader('Content-type','application/x-www-form-urlencoded; charset=utf-8');

            xmlhttp$1.onload = function()
            {
                if(this.readyState == xmlhttp$1.DONE && xmlhttp$1.status == "200")
                {
                    var jsonObj = JSON.parse(xmlhttp$1.response); // JSON.parse(xmlhttp.response);
                    jsonObj = JSON.parse(jsonObj); // Parse JSON twice

                    monmap.putMarkersOnMap(osMap, osMapName, jsonObj, evMap);
                }
            };
            xmlhttp$1.send(strdata);
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

    class Navigation
    {
        constructor(navInfo)
        {
            this.navInfo = navInfo;
        }
        setNavigationBar()
        {
            var objEl = document.getElementById(this.navInfo.El);
            objEl.innerHTML = this.createLogo() + this.createNavList();
        }
        createLogo()
        {
            return "<div class='logo'>" + this.navInfo.logo + "</div>";
        }
        createNavList()
        {
            var arrUl = this.navInfo.NavList;
            var strNavList = "<ul class='nav-list'>";
            for (var index = 0; index < arrUl.length; index++) 
            {
                strNavList += this.createLi(arrUl[index].val, arrUl[index].call);
            }
            strNavList += "</ul>";
            return strNavList;
        }
        createLi(strVal, jsCall)
        {
            return "<li class='nav-list-item'><div onclick='" + jsCall + "'>" + strVal + "</div></li>";
        }
    }

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

        setUpNavigation()
        {
            var checkId = new Cookie().getCookie("klantid");
            var objLogo = "WhereAreYouNow?";

            if( parseInt(checkId) == 0 || checkId == undefined || checkId == '' ) // Logged out
            {
                var navigate = new Navigation({
                    El: "nav",
                    logo: objLogo,
                    NavList: [{val: "LogIn", call: "logInModalThis();"}]
                });
                navigate.setNavigationBar();
            }
            else // Logged in...
            {
                var navigate = new Navigation({
                    El: "nav",
                    logo: objLogo,
                    NavList: [{val: "LogOut", call: "logOutThis();"}]
                });
                navigate.setNavigationBar();
            }
        }

        IsEmpty(value)
        {
            if(value === undefined || value === "" || value === null )
                return true;
            return false;
        }
    }

    // Call the main class and setup the different elements
    KLANTID = new Cookie().getCookie("klantid");
    var m = new Main(URL + KLANTID + "/1/1", C_LAT, C_LON);
    m.setupOSMapOnPage();
    m.setupHiddenInputs(KLANTID);
    m.setUpNavigation();

    console.log("Main: " + document.cookie + " KlantID: " + KLANTID);
    // http://localhost:63744/api/location/2/1/1 - POST - DISPLAY
    // http://localhost:63744/api/location/2/1 - POST - LOGIN
    // http://localhost:63744/api/location/2/0 - POST - LOGOUT
    // http://localhost:63744/api/location/2 - POST - UPDATE
    // http://localhost:63744/api/location/2 - PUT - INSERT

    // https://openlayers.org/en/latest/examples/overlay.html
    // https://code.lengstorf.com/learn-rollup-js/
    // browserify main.js -o bundle.js

}());
