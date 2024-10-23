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

  //get search bus
   searchBus(from:number, to:number,travelDate:string): Observable<any[]>{
    return this.http.get<any[]>(`${this.apiURl}searchBus?fromLocation=${from}&toLocation=${to}&travelDate=${travelDate}`)
   }

   //get bus schedule by id
   getScheduleById(id: number){
    return this.http.get<any[]>(this.apiURl + "GetBusScheduleById?id="+id);

   }

   //get booked seats
   getBookedSeats(id: number){
    return this.http.get<any[]>(this.apiURl + "getBookedSeats?shceduleId="+id);

   }


}
