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

  seatArray:number[]=[];

  constructor(private activedRoute: ActivatedRoute, private masterSrv: MasterService) {
    this.activedRoute.params.subscribe((res: any) => {
      this.scheduleId = res.id;
      this.getScheduleDetailsById();
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

}
