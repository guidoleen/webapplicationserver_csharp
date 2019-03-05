import { Marker } from './marker';
import { OverLayInfo } from './overlayinfo';

export class MarkersOnMap
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