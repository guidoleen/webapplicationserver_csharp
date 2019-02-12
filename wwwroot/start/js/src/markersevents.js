export class MarkersEvents
{
    constructor(){}
    
    markerShowPopup(id)
    {
        var popUpDiv = document.getElementById(id);
        popUpDiv.style.display = "block";
    }

    markersHidePopup(id)
    {
        var popUpDiv = document.getElementById(id);
        popUpDiv.style.display = "none";
    }
}
  