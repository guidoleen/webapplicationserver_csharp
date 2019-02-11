export class MarkersFeature
{
    getNewFeature(iNo, lat, lon)
    {
        var iconFeature = new Feature({
            geometry: new Point([lat, lon]),
            name: 'Marker' + iNo,
            id: iNo
          });

          var iconStyle = new Style({
            image: new Icon(/** @type {module:ol/style/Icon~Options} */ ({
              anchor: [0.5, 46],
              anchorXUnits: 'fraction',
              anchorYUnits: 'pixels',
              src: '../img/marker.png'
            }))
          });

          iconFeature.setStyle(iconStyle);
        return iconFeature;
    }
}

// https://gis.stackexchange.com/questions/153092/add-feature-manually-to-a-vector-layer-in-ol3