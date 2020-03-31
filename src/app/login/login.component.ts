import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { IotFirebaseService } from '../services/iot-firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
 temperatura: any;

  constructor(private authService: AuthService) {

  }

  ngOnInit() { }


}
