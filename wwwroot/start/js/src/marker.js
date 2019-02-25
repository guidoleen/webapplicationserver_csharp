import { OverLayInfo } from './overlayinfo';
import { EventsMap } from './eventsmap';
import { MarkersDrag } from './markersdrag';

var evmap = new EventsMap();

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

        // Add the latlon info into attribute
        var attLatLon = document.createAttribute("data-lat");  // Create a "lat" attribute
        attLatLon.value = overLayInfo.lat;
        divMarker.setAttributeNode(attLatLon); 

        attLatLon = document.createAttribute("data-lon");  // Create a "lon" attribute
        attLatLon.value = overLayInfo.lon;
        divMarker.setAttributeNode(attLatLon); 

        divMarker.appendChild(divPopUpMarker);

        // Append the marker in the map
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

          divPopUpMarker.addEventListener("click", function(){ evmap.onMarkerClickPopUp(overLayInfo, divMarker); }); // Event Listener for popup
          new MarkersDrag().dragMarkerEventListners( overLayInfo.osMap, marker, divMarker ); // Event Listeners for dragging marker
    }
}

// https://openlayers.org/en/latest/examples/overlay.html
// https://gis.stackexchange.com/questions/153092/add-feature-manually-to-a-vector-layer-in-ol3