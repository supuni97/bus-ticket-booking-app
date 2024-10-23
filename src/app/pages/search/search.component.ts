import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [AsyncPipe, FormsModule, CommonModule,DatePipe], // Ensure CommonModule is imported
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'] // Ensure this is styleUrls, not styleUrl
})
export class SearchComponent implements OnInit {

  locations$: Observable<any[]> = new Observable<any[]>();
  masterSrv = inject(MasterService);
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
    const { fromLocation, toLocation, travelDate } = this.searchObj; // Correct destructuring for an object
    //console.log('Search parameters:', fromLocation, toLocation, travelDate); // Debugging log
    this.masterSrv.searchBus(fromLocation, toLocation, travelDate).subscribe(
      (res: any) => {
        this.busList = res;
       // console.log('Search results:', res); // Debugging log
        //   },
        //   (error: any) => {
        //     console.error('Search error:', error); // Debugging log
      }
    );

  }
}
