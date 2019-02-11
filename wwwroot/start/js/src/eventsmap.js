import { PopUp } from './popup';
import { OverLayInfo } from './overlayinfo';

export class EventsMap
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