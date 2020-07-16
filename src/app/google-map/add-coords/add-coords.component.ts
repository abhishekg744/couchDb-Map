import { Component, OnInit, Inject, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { MapServiceService } from 'src/app/services/map-service.service';
import { LoaderService } from 'src/app/services/loader.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-add-coords',
  templateUrl: './add-coords.component.html',
  styleUrls: ['./add-coords.component.scss'],
  
})
export class AddCoordsComponent implements OnInit {

  isAddFence = false;
  newRecord: any = { name: '', coords: '' };
  constructor(private mapServiceService: MapServiceService,private loaderService: LoaderService,private notificationService: NotificationService
    ) {
  }
  @Input() data;
  @Output() closeDialog = new EventEmitter();
    
  fenceData = ['fence1', 'fence2'];
  ngOnInit() {
    this.newRecord.coords = this.data.text;
  }

  selectedFenceChanged(event) {
    if (event.source.value === 'Add') {
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
      this.mapServiceService.setCurrentFenceList(data);
    }
    this.close(this.newRecord);
  }

  
  close(data = null) {
    this.closeDialog.emit(data);
  }
}
