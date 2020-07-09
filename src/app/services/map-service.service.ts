import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MapServiceService {

  constructor(private http: HttpClient) { }

  getFenceDataByName(name){
      return this.http.get<any>(environment.serverUrl + 'geoCords/' + name);
  }

  getAllFenceDataName(){
    return this.http.get(environment.serverUrl + 'geoCords/name');
  }

  
  addFenceData(geofenceData) {
    return this.http.post(environment.serverUrl + 'addGeoCord', geofenceData);
  }


  updateFenceData(geofenceData,id) {
    return this.http.put(environment.serverUrl + 'geoCords/'+id, geofenceData,id);
  }

  deleteFenceData(geofenceData,id) {
    return this.http.put(environment.serverUrl + 'geoCords/'+id, geofenceData,id);
  }


}
