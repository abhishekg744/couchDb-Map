import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MapServiceService {

  constructor(private http: HttpClient) { }

  public currentFencePolygonList = new BehaviorSubject([]);
  private currentFence = '';

  setCurrentFenceList(fenceList) {
    this.currentFencePolygonList.next(fenceList);
  }

  getCurrentFenceList() {
    return this.currentFencePolygonList.value;
  }

  setCurrentFence(fence) {
    this.currentFence = fence;
  }

  getCurrentFence() {
    return this.currentFence;
  }

  isLatLngValid(coords) {
    if (coords != undefined && coords.length > 0) {
      let length = coords.length;
      if (coords[length - 1] == ";") {
        coords = coords.substring(0, (length - 1));
      }
      let valuesCount = (coords.split(';')).length;
      if (valuesCount == (coords.split(',')).length -1) {
        return false;
      } else {
        return true;
      }
    }
  }

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
    return this.http.put(environment.serverUrl + 'geoCords/'+id, {"coords":geofenceData});
  }

  deleteFenceData(id) {
    return this.http.delete(environment.serverUrl + 'geoCords/'+id);
  }


}
