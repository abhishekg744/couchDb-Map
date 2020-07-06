import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat;
  lng;
  markers = [];

  constructor() { }

  getMapObject(longitude=0, latitude=0) {
    if (this.map === undefined) {
      (mapboxgl as any).accessToken = environment.mapToken;
      this.map = new mapboxgl.Map({
        container: 'map',
        style: this.style,
        zoom: 13,
        center: [longitude, latitude]
      });

      this.map.on('load', () => {
        this.map.addSource('Blr-source', {
             type: 'vector',
             url: 'mapbox://rohith17.sampleTileset_1593775707'
        });

        this.map.addLayer({
            'id': 'blr-boundary',
            'type': 'fill',
            'source': 'Blr-source',
            'source-layer': 'sourceTileset',
            'paint': {
                'fill-color': '#888888',
                'fill-opacity': 0.4
            },
            'filter': ['==', '$type', 'Polygon']
        });
        this.map.addLayer({
          'id': 'blr-points',
          'type': 'symbol',
          'source': 'Blr-source',
          'source-layer': 'sourceTileset',
          'layout': {
              'text-field': ["get","name"],
              'text-font': [
              'Open Sans Bold',
              'Arial Unicode MS Bold'
              ],
              'text-size': 11,
              'text-transform': 'uppercase',
              'text-letter-spacing': 0.05,
              'text-offset': [0, 1.5]
              },
              'paint': {
              'text-color': '#202',
              'text-halo-color': '#fff',
              'text-halo-width': 1
              },
               'filter': ['==', '$type', 'Point']
          });
      });  
    
      // Add map controls
      // this.map.addControl(new mapboxgl.NavigationControl());
      this.map = this.setMarker(longitude, latitude);
    }
    return this.map;
  }

  setCenter(longitude, latitude) {
    this.map.setCenter([longitude, latitude]);
  }
  
  setMarker(longitude, latitude) {
    var marker = new mapboxgl.Marker()
      .setLngLat([longitude, latitude])
      .addTo(this.map);
    this.markers.push(marker);
    return this.map;
  }

  applyBounds(bounds) {
    var bbox = [[-79, 43], [-73, 45]];
    this.map.fitBounds(bounds, {
      padding: { top: 10, bottom: 25, left: 15, right: 5 }
    });
    return this.map;
  }

  getZoom() {
    return this.map.getZoom();
  }

  setZoom(factor) {
    this.map.setZoom(factor);
    return this.map;
  }

  removeAllMarkers() {
    this.markers.forEach((marker: mapboxgl.Marker) => {
      marker.remove();
    });
  }

  resizeMap(){
    setTimeout(() => {
      this.map.resize();  
    }, 1000);
  }

}
