export class MarkersDrag
{
    constructor(){}
    dragMarkerEventListners(osmap, marker, divMarker, divPopUpMarker)
    {
        var lonlat;
        var lat = divPopUpMarker.dataset.lat;
        var lon = divPopUpMarker.dataset.lon;
        var dragPan;
        osmap.getInteractions().forEach(function(interaction){
            if (interaction instanceof ol.interaction.DragPan) {
                dragPan = interaction;  
        }
        });

        divMarker.addEventListener('pointerdown', function(evt) {
            dragPan.setActive(false);
            marker.set('dragging', true);
            console.info('start dragging');
            
            lonlat = ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
            lon = lonlat[0];
            lat = lonlat[1];
        });

        osmap.on('pointermove', function(evt) {
            if (marker.get('dragging') === true) {
            marker.setPosition(evt.coordinate);

            lonlat = ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
            lon = lonlat[0];
            lat = lonlat[1];
            }
        });

        osmap.on('pointerup', function(evt) 
        {
            if (marker.get('dragging') === true) 
            {
            console.info('stop dragging');
            console.log(lon + " Lat " + lat);
            console.log(evt.coordinate);

            divPopUpMarker.dataset.lon = lon; // evt.coordinate[0];
            divPopUpMarker.dataset.lat = lat; // evt.coordinate[1];

                // popUp.setPosition(evt.coordinate); // .setPopUpLatLonPosition(osmap, lat, lon);

            dragPan.setActive(true);
            marker.set('dragging', false);
            }
        });
    }
}

// http://jsfiddle.net/jonataswalker/rnzgfg89/



