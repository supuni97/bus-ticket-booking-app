import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [AsyncPipe, FormsModule, CommonModule, DatePipe, RouterLink],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  locations$: Observable<any[]> = new Observable<any[]>();
  masterSrv = inject(MasterService);
  router = inject(Router);
  busList: any[] = [];

  searchObj: any = {
    fromLocation: '',
    toLocation: '',
    travelDate: ''
  };

  ngOnInit(): void {
    this.getAllLocations();
  }

  getAllLocations() {
    this.locations$ = this.masterSrv.getLocations();
  }

  onSearch() {
    const { fromLocation, toLocation, travelDate } = this.searchObj;
    this.masterSrv.searchBus(fromLocation, toLocation, travelDate).subscribe(
      (res: any) => {
        this.busList = res;
      }
    );
  }

  navigateToBooking(scheduleId: string) {
    this.router.navigate(['/booking', scheduleId]);
  }
}
