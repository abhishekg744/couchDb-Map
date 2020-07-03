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
