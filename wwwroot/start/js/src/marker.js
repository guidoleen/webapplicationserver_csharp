import { OverLayInfo } from './overlayinfo';
import { EventsMap } from './eventsmap';
import { MarkersDrag } from './markersdrag';

var EV_MAP = new EventsMap(); // GLOBAL

export class Marker
{
    // Set the marker
    setNewMarker( overLayInfo ) // osMap, osMapName, iNo, lat, lon)
    {
        var mapDiv = document.getElementById(overLayInfo.osMapName);

        var divPopUpMarker = document.createElement("div");
        divPopUpMarker.id = "pop" + overLayInfo.iNo;
        divPopUpMarker.className = "map-overlay-popupmarker";

        var divMarker = document.createElement("div");
        divMarker.id = overLayInfo.iNo;
        divMarker.className = "map-overlay-marker";
        divMarker.appendChild(divPopUpMarker);

        mapDiv.appendChild(divMarker);

        var pos = ol.proj.fromLonLat([overLayInfo.lon, overLayInfo.lat]); // ol.proj.transform([lat, lon], 'EPSG:4326', 'EPSG:3857');
          var marker = new ol.Overlay({
            position: pos,
            positioning: 'center-center',
            element: document.getElementById(overLayInfo.iNo),
            stopEvent: false,
            dragging: false
          });
          overLayInfo.osMap.addOverlay(marker); // Adds the marker on the map

          divPopUpMarker.addEventListener("click", function(){ EV_MAP.onMarkerClickPopUp(overLayInfo); }); // Event Listener for popup
          new MarkersDrag().dragMarkerEventListners(overLayInfo.osMap, marker, divMarker, EV_MAP.popup); // Event Listeners for dragging marker
    }
}

// https://openlayers.org/en/latest/examples/overlay.html
// https://gis.stackexchange.com/questions/153092/add-feature-manually-to-a-vector-layer-in-ol3