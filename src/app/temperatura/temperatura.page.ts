import { Component, OnInit } from '@angular/core';
import { IotFirebaseService } from '../services/iot-firebase.service';

@Component({
  selector: 'app-temperatura',
  templateUrl: './temperatura.page.html',
  styleUrls: ['./temperatura.page.scss'],
})
export class TemperaturaPage implements OnInit {

  temperatura: any;
  tem : any = [];
  data: any = [];
  constructor(private temperature: IotFirebaseService) {
    this.getTemperatura();
  }

  ngOnInit() {
  }

  enviarNotificaciones(data: any) {

    let message = {
      "app_id": "6df03d95-6dc3-434a-935f-92b3678fa0eb",
      included_segments: [data.users],
      data: {
        task: 'Send throung API'
      },
      headings: {
        'en': 'Temperatura'
      },
      contents: {
        'en': 'La temperatura alcanzo los ' + this.temperatura + '°C'
      }
    };
    console.log(message);
    this.temperature.pushNotification(message).subscribe((res) => console.log(res))
  }

  async getTemperatura() {
    await this.temperature.getTempe().subscribe((res) => {
      this.temperatura = res[1];
    });
  }

}
