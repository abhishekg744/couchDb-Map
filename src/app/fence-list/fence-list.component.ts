import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MapServiceService } from '../services/map-service.service';
import { NotificationService } from '../services/notification.service';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-fence-list',
  templateUrl: './fence-list.component.html',
  styleUrls: ['./fence-list.component.scss']
})
export class FenceListComponent implements OnInit {

  constructor(private mapServiceService: MapServiceService, private notificationService: NotificationService,private loaderService: LoaderService) { }
  @Input() fenceData;
  @Output() loadDataOnMap = new EventEmitter();
  @Output() deleteFenceData = new EventEmitter();
  @Output() triggerDrawing = new EventEmitter();
  @Output() addFenceData = new EventEmitter();

  polygons: any = [];
  newRecord: any = { name: '', coords: '' };
  selectedFence;
  isDrawOnMap = false;
  stepperValue = '1';
  showAddInput = false;
  inputError = false;

  ngOnInit(): void {
    this.mapServiceService.currentFencePolygonList.subscribe(data => {
      this.polygons = data;
    });
  }

  stepperChanged(data) {
    console.log(data);
    if (data.value == '2') {
      this.isDrawOnMap = true;
    } else {
      this.isDrawOnMap = false;
    }
    this.triggerDrawing.emit(this.isDrawOnMap);
  }

  fenceChangedForAdd(event) {
    if (event.source.value === 'Add') {
      this.newRecord.name = '';
      this.showAddInput = true;
    } else {
      this.showAddInput = false;
      this.newRecord.name = event.source.value 
    }
  }

  isLatLngValid(coords) {
   this.inputError = this.mapServiceService.isLatLngValid(coords);
  }

  selectedFenceChanged(event) {
    this.polygons.edit = false;
    if (event.source.value === 'Add') {
      this.selectedFence = '';
    } else {
      this.selectedFence = event.source.value;
      // get call by name
      this.mapServiceService.getFenceDataByName(this.selectedFence).subscribe(res => {
        this.polygons = res;
        this.mapServiceService.setCurrentFenceList(this.polygons);
      });
       

      // this.mapServiceService.setCurrentFenceList(
      //   [{ 'name': '1', 'placeName':'sasken', 'coords': "12.954612386058743,77.638535;12.954421568269561,77.63922432771683;12.953770695532927,77.63901511541367;12.953922304595407,77.63839552513123;" }]
      // );
    }
    this.mapServiceService.setCurrentFence(this.selectedFence);
  }

  loadOnMap(polygonData, tableindex) {
    polygonData.placeName = polygonData.name;
    polygonData.name = tableindex;
    this.loadDataOnMap.emit(polygonData);
  }


  addNewFence() {
    this.inputError= this.mapServiceService.isLatLngValid(this.newRecord.coords);
    if(!this.inputError) {
      this.loaderService.show();
      this.mapServiceService.addFenceData(this.newRecord).subscribe((res: any) => {
        this.fenceData.splice(0, 0, res.name);
        this.notificationService.openSnackBar('Geofence added', 1);
        console.log("Geofence added");
      },err => {
        this.notificationService.openSnackBar('Geofence not added', 0);
      }).add(() => {
        this.loaderService.hide();
      });
        let currentFence = this.mapServiceService.getCurrentFence();
        let data:any = null;
        if (currentFence == this.newRecord.name) {
          data = this.mapServiceService.getCurrentFenceList();
          data.push(this.newRecord);
        }
        this.addFenceData.emit(data);
    }
    
  }

  update(polygon){
    this.inputError= this.mapServiceService.isLatLngValid(polygon.coords.toString());
    if(!this.inputError){
      this.loaderService.show();
      polygon.edit = !polygon.edit
      console.log("Polygon object",JSON.stringify(polygon));
      this.mapServiceService.updateFenceData(polygon.coords.toString(),polygon.id).subscribe((res: any) => {
        this.notificationService.openSnackBar('Geofence updated', 1);
        console.log("Geofence updated");
      },err => {
        this.notificationService.openSnackBar('Geofence not updated', 0);
      }).add(() => {
        this.loaderService.hide();
      });
    }    
    // this.mapServiceService.updateFenceData()
  }

  delete(tableindex,polygon) {
    console.log("tableindex is ",tableindex);
    this.loaderService.show();
    this.mapServiceService.deleteFenceData(polygon.id).subscribe((res: any) => {
      this.notificationService.openSnackBar('Geofence deleted',1);
      console.log("Geofence deleted");
    },err => {
      this.notificationService.openSnackBar('Geofence not deleted',0);
    }).add(() => {
      this.loaderService.hide();
    });
    this.polygons.splice(tableindex, 1);
    this.mapServiceService.setCurrentFenceList(this.polygons);
    this.deleteFenceData.emit(tableindex);
  }

}
