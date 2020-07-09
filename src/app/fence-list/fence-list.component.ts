import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-fence-list',
  templateUrl: './fence-list.component.html',
  styleUrls: ['./fence-list.component.scss']
})
export class FenceListComponent implements OnInit {

  constructor() { }
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
      this.tableData = { 'name': '1', 'coords': "12.954615167713982,77.63853529426154;12.954442647529259,77.63924071523246;12.95424660171983,77.63919779988822;12.954419122040278,77.63849640223083;12.95441650809697,77.63849477130759;12.954330247950807,77.63881395418036;12.954027030230158,77.63874421674598;12.954104141668257,77.63842235166419;12.954100220748229,77.63841162282813;12.953951225742294,77.63906876403678;12.95377347719768,77.63902584869254;12.953915937438358,77.63837675411094;"};
      this.selectedFenceData.emit(this.tableData);
    }
   
  }

  addNewFence() {

  }

}
