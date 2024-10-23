import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MasterService } from '../../service/master.service';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent {

  scheduleId: number = 0;
  scheduleData: any;

  seatArray: number[] = [];
  bookedSeatsArray: number[] = [];
  userSelectedSeatArray: number[] = [];

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
    this.userSelectedSeatArray.push(seatNo);
  }

  checkIfSeatSelected(seatNo: number) {
    return this.userSelectedSeatArray.indexOf(seatNo);
  }

}
