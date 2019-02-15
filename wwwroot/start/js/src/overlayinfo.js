export class OverLayInfo
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