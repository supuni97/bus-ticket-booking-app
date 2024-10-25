import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MasterService } from '../../service/master.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent {

  scheduleId: number = 0;
  scheduleData: any;

  seatArray: number[] = [];
  bookedSeatsArray: number[] = [];
  userSelectedSeatArray: any[] = [];

  constructor(private activedRoute: ActivatedRoute, private masterSrv: MasterService) {
    this.activedRoute.params.subscribe((res: any) => {
      this.scheduleId = res.id;
      this.getScheduleDetailsById();
      this.getBookedSeats();
    })

  }

  getScheduleDetailsById() {
    this.masterSrv.getScheduleById(this.scheduleId).subscribe((res: any) => {
      debugger;
      this.scheduleData = res;
      for (let index = 1; index <= this.scheduleData.totalSeats; index++) {
        this.seatArray.push(index)

      }
    })
  }

  getBookedSeats() {
    this.masterSrv.getBookedSeats(this.scheduleId).subscribe((res: any) => {
      debugger;
      this.scheduleData = res;

    })
  }

  checkIfSeatBooked(seatNo: number) {
    return this.bookedSeatsArray.indexOf(seatNo);
  }

  selectSeat(seatNo: number) {

    const obj = {
      "passengerId": 0,
      "bookingId": 0,
      "passengerName": "",
      "age": 0,
      "gender": "",
      "seatNo": 0
    }
    obj.seatNo = seatNo;
    this.userSelectedSeatArray.push(obj);
  }

  checkIfSeatSelected(seatNo: number) {
    return this.userSelectedSeatArray.findIndex(m => m.seatNo == seatNo);
  }

  bookNow(){
    debugger;
    const loggedUserData = localStorage.getItem('redBusUser');
    if(loggedUserData){
      const loggedData = JSON.parse(loggedUserData);
      const obj= {
        "bookingId": 0,
        "custId": loggedData.userId,
        "bookingDate": new Date(),
        "scheduleId": this.scheduleId,
        "BusBookingPassengers": this.userSelectedSeatArray
      }
      this.masterSrv.onBooking(obj).subscribe((res:any)=>{
        alert("Booking success")
      },error=>{

      })
    }
    else{
      alert("Please login")
    }
  
  }

}
