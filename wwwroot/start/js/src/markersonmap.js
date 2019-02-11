import { MarkersFeature } from './markersfeature';

export class MarkersOnMap
{
     putMarkerOnMap(_vectorsource, _jsonObj)
     {
        //Loop through the markers array

        for (var i=0; i<_jsonObj.length; i++) {
       
            var lat = _jsonObj[i].latitude;
            var lon = _jsonObj[i].longitude;

            var feature  = new MarkersFeature(i, lat, lon);
                        
            _vectorsource.addFeatures(feature);
         }                        
     }
}