import { Component, OnInit } from '@angular/core';
import { PouchDBService } from '../../service/pouchDb-service/pouchDb.service';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { MapService } from 'src/service/map-service/map.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  cblData = [];
  map: mapboxgl.Map;
  // style = 'mapbox://styles/mapbox/streets-v11';
  // lat = 12.977481;
  // lng = 77.572729;
  panelOpenState = true;
  fromLocation = '';
  toLocation = '';
  selectedLocation = '';
  public constructor(private database: PouchDBService, private mapService: MapService) {
  }

  async ngOnInit() {
    let currentCoords = await this.getCurrentLocation();
    this.loadMap(currentCoords);
    this.database.cblData.subscribe(data => {
      this.cblData = data;
      this.cblData.push(...data);
    })
  }

  closePanel() {
    this.panelOpenState = false;
    this.mapService.resizeMap();
  }

  getCurrentLocation() {
    return new Promise(resolve => {
      navigator.geolocation.getCurrentPosition((position) => {
        resolve(position.coords);
      });
    });
  }


  loadMap(coords) {
    this.map = this.mapService.getMapObject(coords.longitude, coords.latitude);

    // this.map = this.mapService.setMarker(77.572729, 12.977481);  
    // let bounds:any[] = [];
    // bounds.push([position.coords.longitude, position.coords.latitude]);
    // bounds.push([77.572729, 12.977481]);
    // this.map = this.mapService.applyBounds(bounds);  
    // let factor = this.mapService.getZoom();
    // console.log(factor);
    //this.map = this.mapService.setZoom(factor-0.5);
    // factor = this.mapService.getZoom();
    // console.log(factor);
  }

  load(data) {
    console.log(data);
    this.selectedLocation = data;
    this.fromLocation = data.fromLocation.location;
    let fromLocationCoords = data.fromLocation.geoJson.features[0].geometry.coordinates;
    this.toLocation = data.toLocation.location;
    let toLocationCoords = data.toLocation.geoJson.features[0].geometry.coordinates;
    this.mapService.removeAllMarkers();
    this.mapService.setMarker(fromLocationCoords[1], fromLocationCoords[0]);
    this.mapService.setMarker(toLocationCoords[1], toLocationCoords[0]);

    let bounds: any[] = [];
    bounds.push([fromLocationCoords[1], fromLocationCoords[0]]);
    bounds.push([toLocationCoords[1], toLocationCoords[0]]);
    this.map = this.mapService.applyBounds(bounds);
    let factor = this.mapService.getZoom();
    console.log('zoom ', factor);
    this.panelOpenState = false;

  }

  report() {
    this.clearData();
  }

  async clearData() {
    this.selectedLocation = '';
    this.fromLocation = '';
    this.toLocation = '';
    this.fromLocation = '';
    this.toLocation = '';
    this.mapService.removeAllMarkers();
    let currentCoords: any = await this.getCurrentLocation();
    console.log(currentCoords);
    this.mapService.setMarker(currentCoords.longitude, currentCoords.latitude);
    this.mapService.setCenter(currentCoords.longitude, currentCoords.latitude);
  }

}
