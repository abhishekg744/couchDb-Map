import { Component, OnInit, ViewChild } from '@angular/core';
import { isPointInPolygon } from 'geolib';
import { DrawingManager } from '@ngui/map';
import { MapConfig, positions } from './google-map-config';
import { MatDialog } from '@angular/material/dialog';
import { AddCoordsComponent } from './add-coords/add-coords.component';
import { MapServiceService } from '../services/map-service.service';
import { async } from '@angular/core/testing';
import { NotificationService } from '../services/notification.service';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit {

  constructor(public dialog: MatDialog, private mapServiceService: MapServiceService,
    private notificationService: NotificationService, private loaderService: LoaderService) { }

  selectedOverlay: any;
  @ViewChild(DrawingManager) drawingManager: DrawingManager;  
  fenceData = ['fence1', 'fence2'];
  mapCenter = MapConfig.Map_Center;
  drawOptions = {
    position: 2,
    drawingModes: MapConfig.Drawing_Manager.Modes,
  };
  polygonOptions = MapConfig.Drawing_Manager.polygonOptions;

  coords = [];
  positions = positions;
  positionIndex = -0;
  position: any = this.positions[this.positionIndex];
  private map: google.maps.Map;
  boundary = [];
  dialogData:any;
  showDialog = false;
  enableDrawing = false;
  loading=false;
  positionOcupiedPolygons = [];

  ngOnInit(): void {
    this.mapServiceService.getAllFenceDataName().subscribe((res: any) => {
      this.fenceData = res;
    }, err => {
      console.log("Error Response", err);
    }); 
    this.loaderService.loaderState.subscribe((res: any) => {
      this.loading=res;
    });
  }

  deleteSelectedOverlay() {
    if (this.selectedOverlay) {
      this.selectedOverlay.setMap(null);
      delete this.selectedOverlay;
    }
  }

  triggerDrawing(isDrawEnabled) {
    this.enableDrawing = isDrawEnabled;    
  }

  onMapReady(map) {
    this.map = map;
    console.log('map', map);
    this.initializeDrawingManager();
  }

  initializeDrawingManager() {
    this.drawingManager['initialized$'].subscribe(dm => {
      google.maps.event.addListener(dm, 'overlaycomplete',  event => {
        if (event.type !== google.maps.drawing.OverlayType.MARKER) {
          dm.setDrawingMode(null);
          google.maps.event.addListener(event.overlay, 'click', e => {
            this.selectedOverlay = event.overlay;
            this.selectedOverlay.setEditable(true);
          });
          this.selectedOverlay = event.overlay;
          this.selectedOverlay.setEditable(true);
           this.alertData(event.overlay.getPath().getArray())
        }
      });
    });
  }

  alertData(data) {
    let text = '';
    data.forEach(item => {
      text += item.lat() + ',' + item.lng() + ';';
    });
    this.dialogData = {
      text: text,
      fenceData: this.fenceData
    }
    this.showDialog = true;    
  }

  setPosition() {
    this.positionIndex++;
    if (this.positionIndex <= this.positions.length - 1) {
      var pos = this.positions[this.positionIndex];
      this.position = { 'lat': pos[0], 'lng': pos[1] };
      console.log('position', this.position);
      console.log('Inside', isPointInPolygon(this.position, this.boundary));
      this.coords.forEach(polygon => {
        //let index = this.positionOcupiedPolygons.indexOf(polygon.placeName);
        if (isPointInPolygon(this.position, this.boundary)) {
         // this.positionOcupiedPolygons.push(name);
          if(polygon.entered != true) {
            this.notificationService.openSnackBar("Entered inside " + polygon.placeName, 1);
            polygon.entered = true;
          }
        } else {         
          if (polygon.entered == true && polygon.left != true) {
            polygon.left = true;
            this.notificationService.openSnackBar("Left" + polygon.placeName, 1);
          }
        }
      });
    }
  }

  listenToLocation() {
    setInterval(() =>
      this.setPosition(), 1000
    );
  }

  loadDataOnMap(data) {
    console.log(data);
    let convertedData = this.convertToMapPolygons(data.coords);  
    this.coords.push({name: data.name, polygonCoords: convertedData, placeName: data.placeName});
  }

  deleteFenceData(index) {
    console.log(this.coords, index);
    this.coords = this.coords.splice((this.coords.findIndex(c => c.name == index), 1));
  }

  convertToMapPolygons(latLngValues) {
    if (latLngValues[latLngValues.length - 1] == ';') {
      latLngValues = latLngValues.substring(0, latLngValues.length - 1);
    }
    let eachValue = latLngValues.split(';');
    this.mapCenter = eachValue[0].split(',');
    this.map.setCenter({ lat: parseFloat(this.mapCenter[0]), lng: parseFloat(this.mapCenter[1]) });
    let data = eachValue.map(value => {
      value = value.split(',');
      let modifiedValue = { lat: parseFloat(value[0]), lng: parseFloat(value[1]) };
      value = modifiedValue;
      return value;
    });
    this.boundary = data;
    return data;
  }

  closeDialog(result) {

    if (result != null && result != 'clear') {
      if (this.fenceData.indexOf(result.name) == -1) {
        this.fenceData.splice(0, 0, result.name);
      }
    }
    if(this.selectedOverlay != undefined) {
      this.deleteSelectedOverlay(); 
    }
    this.showDialog = false;
  }

}
