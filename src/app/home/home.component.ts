import { Component, OnInit } from '@angular/core';
import { PouchDBService } from '../pouchDb.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  cblData = [];
  public constructor(private database: PouchDBService) {
  }

  ngOnInit() {
    this.database.cblData.subscribe(data => {
      this.cblData = data;      
    })
  }

}
