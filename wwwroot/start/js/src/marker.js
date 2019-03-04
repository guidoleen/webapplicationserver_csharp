import { OverLayInfo } from './overlayinfo';
import { EventsMap } from './eventsmap';
import { MarkersDrag } from './markersdrag';

export class Marker
{
    setNewMarker( overLayInfo, evMap, insertNo ) // osMap, osMapName, iNo, lat, lon)
    {
        var mapDiv = document.getElementById(overLayInfo.osMapName);

        var divPopUpMarker = document.createElement("div");
        divPopUpMarker.id = "pop" + overLayInfo.iNo;
        divPopUpMarker.className = "map-overlay-popupmarker";

        var divMarker = document.createElement("div");
        divMarker.id = overLayInfo.iNo;
        divMarker.className = "map-overlay-marker";

        // Add the latlon info into attribute
        this.createAnAttribute(divPopUpMarker, "lat", parseFloat(overLayInfo.lat));
        this.createAnAttribute(divPopUpMarker, "lon", parseFloat(overLayInfo.lon));
        this.createAnAttribute(divMarker, "insert", insertNo);
        this.createAnAttribute(divMarker, "berichtid", overLayInfo.berId);

        // Append the popup button to the marker
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

          divPopUpMarker.addEventListener("click", function()
          { 
              evMap.onMarkerClickPopUp(overLayInfo, divMarker, divPopUpMarker, divMarker.id); 
          }); // Event Listener for popup
          new MarkersDrag().dragMarkerEventListners( overLayInfo.osMap, marker, divMarker, divPopUpMarker ); // Event Listeners for dragging marker
    }

    createAnAttribute(divMarker, attrName, value)
    {
          var att = document.createAttribute("data-" + attrName);  // Create a "lat" attribute
          att.value = value;
          divMarker.setAttributeNode(att); 
    }
}

// https://openlayers.org/en/latest/examples/overlay.html
// https://gis.stackexchange.com/questions/153092/add-feature-manually-to-a-vector-layer-in-ol3