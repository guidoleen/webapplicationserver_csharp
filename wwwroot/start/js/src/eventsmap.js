import { PopUp } from './popup';
import { OverLayInfo } from './overlayinfo';
import { MarkersEvents } from './markersevents';
import { CreateNewMarker } from './createnewmarker';

export class EventsMap
{
    constructor(map, mapId, popUp)
    {
        this.map = map;
        this.mapId = mapId;
        this.popupId = "popup";
        this.popup = new PopUp(this.popupId);
        this.lonCorr = 0.5;
    }
    
    addPopUpInMap() // Init popup in de map
    {
        this.popup.setPopUpinMap( new OverLayInfo( this.map, this.mapId, this.popupId, 5, 52 ), "Dus" ); // (osMap, osMapName, iNo, lat, lon)
        return;
    }

    onMarkerClickPopUp(overLayInfo, divMarker, id)
    {
        // OLD STUFF // this.popup.setPopUpinMap( new OverLayInfo( overLayInfo.osMap, overLayInfo.osMapName, this.popupId, (overLayInfo.lon - this.lonCorr), overLayInfo.lat, overLayInfo.berTitle, overLayInfo.berText ), id ); // (osMap, osMapName, iNo, lat, lon)
        this.popup.setPopUpinMap( new OverLayInfo( overLayInfo.osMap, overLayInfo.osMapName, this.popupId, parseFloat(divMarker.dataset.lon), parseFloat(divMarker.dataset.lat), overLayInfo.berTitle, overLayInfo.berText ), id ); // (osMap, osMapName, iNo, lat, lon)
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

            // console.log(geolocation.getPosition());

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