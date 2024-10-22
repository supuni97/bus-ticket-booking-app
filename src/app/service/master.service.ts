import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  apiURl: string ='https://projectapi.gerasim.in/api/BusBooking/';

  constructor(private http:HttpClient) { }

  //get all locations
  getLocations(): Observable<any[]>{
    return this.http.get<any[]>(this.apiURl + "GetBusLocations")
  }



}
