import { Marker } from './marker';
import { OverLayInfo } from './overlayinfo';

export class CreateNewMarker
{
    constructor(){}

    putMarkerOnMap(osMap, osMapName, arrJson)
    {
        var marker = new Marker();
        marker.setNewMarker( new OverLayInfo(osMap, osMapName, arrJson.locid, arrJson.latitude, arrJson.longitude, arrJson.bertitel, arrJson.bertext, arrJson.berichtid ) );
    }
}