import { Component, OnInit, Inject, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { MapServiceService } from 'src/app/services/map-service.service';

@Component({
  selector: 'app-add-coords',
  templateUrl: './add-coords.component.html',
  styleUrls: ['./add-coords.component.scss'],
  
})
export class AddCoordsComponent implements OnInit {

  isAddFence = false;
  newRecord: any = { name: '', coords: '' };
  constructor(private mapServiceService: MapServiceService,
    ) {
  }
  @Input() data;
  @Output() closeDialog = new EventEmitter();
    
  fenceData = ['fence1', 'fence2'];
  ngOnInit() {
    this.data.fenceData.push('Add new fence');
    this.newRecord.coords = this.data.text;
  }

  selectedFenceChanged(event) {
    if (event.source.value === 'Add new fence') {
      this.newRecord.name = '';
      this.isAddFence = true;
    } else {
      this.isAddFence = false;
      this.newRecord.name = event.source.value;
      // this.mapServiceService.getFenceDataByName(this.selectedFence).subscribe(res => {
      //   this.tableData = res[0].coords;    
      // });
      // this.tableData = { 'name': '1', 'coords': "12.954612386058743,77.638535;12.954421568269561,77.63922432771683;12.953770695532927,77.63901511541367;12.953922304595407,77.63839552513123;"};
    }
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
    this.close(data);
  }

  close(data = null) {
    this.closeDialog.emit(data);
  }
}
