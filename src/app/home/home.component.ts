import { Component, OnInit } from '@angular/core';
import { PouchDBService } from '../pouchDb.service';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  cblData = [];
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 37.75;
  lng = -122.41;
  panelOpenState = false;
  public constructor(private database: PouchDBService) {
  }

  ngOnInit() {
    (mapboxgl as any).accessToken = environment.mapToken;
      this.map = new mapboxgl.Map({
        container: 'map',
        style: this.style,
        zoom: 13,
        center: [this.lng, this.lat]
    });
    // Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());
    
    this.database.cblData.subscribe(data => {
      this.cblData = data;      
    })
  }

}
