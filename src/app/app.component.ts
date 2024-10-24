import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { MasterService } from './service/master.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'bus-ticket-booking-app';
  isLoginForm: boolean = true;

  masterSrv = inject(MasterService);
  loggedUserData : any;

  registerObj: any = {

    "userId": 0,
    "userName": "",
    "emailId": "",
    "fullName": "",
    "role": "",
    "createdDate": new Date(),
    "password": "",
    "projectName": "",
    "refreshToken": "",
    "refreshTokenExpiryTime": new Date()

  }

  openModal() {
    const modal = document.getElementById("myModal");
    if (modal != null) {
      modal.style.display = 'block'
    }
  }

  closeModal() {
    const modal = document.getElementById("myModal");
    if (modal != null) {
      modal.style.display = 'none'
    }
  }

  onRegister() {
   
    //console.log('Registering user', this.registerObj); 
    this.masterSrv.onRegisterUser(this.registerObj).subscribe((res: any) => {
       // console.log('Registration successful', res); 
        alert("User registered successfully");
        localStorage.setItem('redBusUser',JSON.stringify(res.data))
        this.loggedUserData = res.data;
      }, error=> {
       // console.error('Registration error', error);
        alert(JSON.stringify(error))
      })
  }
}
