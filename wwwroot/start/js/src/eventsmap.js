import { PopUp } from './popup';
import { OverLayInfo } from './overlayinfo';
import { MarkersEvents } from './markersevents';
import { CreateNewMarker } from './createnewmarker';
import { UpdateLocation } from './updatelocation';
import { CreateHiddenInput } from './createhiddeninput';

export class EventsMap
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