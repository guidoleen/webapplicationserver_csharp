import { OverLayInfo } from './overlayinfo';
import { MarkersEvents } from './markersevents';

export class PopUp
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

        var pos = ol.proj.fromLonLat([overLayInfo.lat, overLayInfo.lon]); // ol.proj.transform([overLayInfo.lat, overLayInfo.lon], 'EPSG:4326', 'EPSG:3857'); // 
        this.popupoverl.setPosition(pos);

          overLayInfo.osMap.addOverlay(this.popupoverl);
    
        this.popupdiv.innerHTML = this.setCloseX() + this.setH3(overLayInfo.berTitle) +  this.setP(overLayInfo.berText) + this.setSaveForm("strApiUrl");

        document.getElementById("popup_closer").addEventListener("click", function(){
            new MarkersEvents().markersHidePopup(overLayInfo.iNo);
        });
        return;
    }

    get getPopUp()
    {
        return this.popupoverl; // document.getElementById(this.popupid);
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
        strForm += "<input class='input-txt mrg-bottom' type='text' name='title'>";
        strForm += "<span class='input-span'>Bericht</span>";
        strForm += "<input class='input-txt mrg-bottom' type='text' name='bericht'>";
        strForm += "<input class='input-button' type='button' value='Save' >";
        strForm += "</form>";

        return strForm;
    }
}