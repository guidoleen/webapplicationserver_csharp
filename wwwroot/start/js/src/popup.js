import { OverLayInfo } from './overlayinfo';

export class PopUp
{
    constructor(){}

    setPopUpinMap( overLayInfo, strText ) // osMap, osMapName, divPopUp, lat, lon)
    {
        var mapDiv = document.getElementById(overLayInfo.osMapName);
        var popDiv = document.getElementById(overLayInfo.iNo);

        mapDiv.appendChild( popDiv );

        var pos = ol.proj.fromLonLat([overLayInfo.lon, overLayInfo.lat]); // ol.proj.transform([lat, lon], 'EPSG:4326', 'EPSG:3857');
        var popup = new ol.Overlay({
          position: pos,
          positioning: 'center-center',
          element: document.getElementById(overLayInfo.divPopUp)
        });

        popDiv.innerHTML = strText;
        overLayInfo.osMap.addOverlay(popup);

        return popup;
    }
}