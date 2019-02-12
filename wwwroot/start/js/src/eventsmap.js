import { PopUp } from './popup';
import { OverLayInfo } from './overlayinfo';
import { MarkersEvents } from './markersevents';

export class EventsMap
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

    onMarkerClick(overLayInfo, id, pos)
    {
        this.popup.setPopUpinMap( new OverLayInfo( overLayInfo.osMap, overLayInfo.osMapName, this.popupId, (overLayInfo.lon - this.lonCorr), overLayInfo.lat ), id ); // (osMap, osMapName, iNo, lat, lon)
        new MarkersEvents().markerShowPopup(this.popupId);
        
        return;
        // console.log(this.popup.getPopUp.getElement());
    }
    // EventListeners
}