import { OverLayInfo } from './overlayinfo';
import { EventsMap } from './eventsmap';

export class Marker
{
    // Set the marker
    setNewMarker( overLayInfo ) // osMap, osMapName, iNo, lat, lon)
    {
        var mapDiv = document.getElementById(overLayInfo.osMapName);
        var divMarker = document.createElement("div");
        divMarker.id = overLayInfo.iNo;
        divMarker.className = "map-overlay-marker";

        mapDiv.appendChild(divMarker);

        var pos = ol.proj.fromLonLat([overLayInfo.lon, overLayInfo.lat]); // ol.proj.transform([lat, lon], 'EPSG:4326', 'EPSG:3857');
          var marker = new ol.Overlay({
            position: pos,
            positioning: 'center-center',
            element: document.getElementById(overLayInfo.iNo)
          });

          divMarker.addEventListener("click", function(){ new EventsMap().onMarkerClick(overLayInfo); }); // Event Listener for popup

          overLayInfo.osMap.addOverlay(marker); // Adds the marker on the map
    }
}

// https://openlayers.org/en/latest/examples/overlay.html
// https://gis.stackexchange.com/questions/153092/add-feature-manually-to-a-vector-layer-in-ol3