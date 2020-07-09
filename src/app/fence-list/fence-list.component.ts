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
  @Output() selectedFenceData = new EventEmitter();
  tableData: any = {};
  newRecord: any = {name:'', coords:''};
  selectedFence;
  isAddFence = false;
  
  ngOnInit(): void {
  }

  selectedFenceChanged(event) {
    this.tableData.edit = false;
    if(event.source.value === 'Add new fence'){
      this.selectedFence = '';
      this.isAddFence = true;
    } else {
      this.isAddFence = false;
      this.selectedFence = event.source.value;
      // get call by name
      this.mapServiceService.getFenceDataByName(this.selectedFence).subscribe(res => {
        this.tableData = res[0].coords;    
      });
      this.tableData = { 'name': '1', 'coords': "12.954612386058743,77.638535;12.954421568269561,77.63922432771683;12.953770695532927,77.63901511541367;12.953922304595407,77.63839552513123;"};
    }
  }

  loadOnMap() {
    this.selectedFenceData.emit(this.tableData);
  }
 

  addNewFence() {

  }

}
