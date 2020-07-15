import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MapServiceService } from '../services/map-service.service';

@Component({
  selector: 'app-fence-list',
  templateUrl: './fence-list.component.html',
  styleUrls: ['./fence-list.component.scss']
})
export class FenceListComponent implements OnInit {

  constructor(private mapServiceService: MapServiceService) { }
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

  selectedFenceChanged(event) {
    this.polygons.edit = false;
    if (event.source.value === 'Add') {
      this.selectedFence = '';
    } else {
      this.selectedFence = event.source.value;
      // get call by name
      this.mapServiceService.getFenceDataByName(this.selectedFence).subscribe(res => {
        this.polygons = res[0];
      });

      this.mapServiceService.setCurrentFenceList(
        [{ 'name': '1', 'coords': "12.954612386058743,77.638535;12.954421568269561,77.63922432771683;12.953770695532927,77.63901511541367;12.953922304595407,77.63839552513123;" }]
      );
    }
    this.mapServiceService.setCurrentFence(this.selectedFence);
  }

  loadOnMap(polygonData, tableindex) {
    polygonData.name = tableindex;
    this.loadDataOnMap.emit(polygonData);
  }


  addNewFence() {
    this.mapServiceService.addFenceData(this.newRecord).subscribe((res: any) => {
      this.fenceData.splice(0, 0, res.name);
      console.log("Record added");
    });
      let currentFence = this.mapServiceService.getCurrentFence();
      let data:any = null;
      if (currentFence == this.newRecord.name) {
        data = this.mapServiceService.getCurrentFenceList();
        data.push(this.newRecord);
      }
      this.addFenceData.emit(data);
  }

  delete(tableindex) {
    this.polygons.splice(tableindex, 1);
    this.mapServiceService.setCurrentFenceList(this.polygons);
    this.deleteFenceData.emit(tableindex);
  }

}
