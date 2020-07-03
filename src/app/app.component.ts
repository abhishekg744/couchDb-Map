import { Component} from '@angular/core';
import { PouchDBService } from '../service/pouchDb-service/pouchDb.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'demoApp';
  public cblData: Array<any> = [];  
  public constructor(private database: PouchDBService) {
  }

  public ngOnInit() {

    this.database.sync();

    this.database.getChangeListener().subscribe(data => {
      for (let i = 0; i < data.change.docs.length; i++) {      
          this.updateToCBL(data.change.docs[i]);
      }
      this.database.cblData.next(this.cblData);
    });

    this.database.fetch().then(result => {
      this.cblData = [];
      for (let i = 0; i < result.rows.length; i++) {
        this.updateToCBL(result.rows[i].doc);
      }
      this.database.cblData.next(this.cblData);
    }, error => {
      console.error(error);
    });
    //this.database.deleteAllDocs();
  }

  updateToCBL(doc) {
    if(doc.assetId !== undefined && doc.assetId !== '' ) {
      var data:any = this.cblData.findIndex(data => data._id === doc._id);
      if(data !== -1) {
        this.cblData[data] = doc;
      } else {
        this.cblData.push(doc);
      }
      
      this.database.cblData.next(this.cblData);
    }
  }

}
