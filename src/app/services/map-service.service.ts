import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MapServiceService {

  constructor(private http: HttpClient) { }

  getFenceDataByName(name){
      return this.http.get(environment.serverUrl + 'geoCords/' + name);
  }
}
