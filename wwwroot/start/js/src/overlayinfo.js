export class OverLayInfo
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