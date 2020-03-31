import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IotFirebaseService {

  headers = new Headers();

  constructor(private tempe: AngularFireDatabase, private http: HttpClient) { }

  url = 'https://onesignal.com/api/v1/notifications';

  pushNotification(data: any): Observable<any> {
    let json = JSON.stringify(data);
    let params = json;
    return this.http.post(this.url, params, {
      headers: (
        {
          "Content-Type": "application/json; charset=utf=8",
          "Authorization": "Basic ZWVkMjg3YmYtOTBlZS00NWFiLTg0N2QtMDRmZTQ4MjUxZjdi"
        }
      )
    });
  }


  getTemperatura(): Promise<any> {
    return this.tempe.database.ref('/casa').child('temperatura').once('value',
      function (snapshot) {
        snapshot.val();
      });

  }

  getTempe(): Observable<any> {
    return this.tempe.list('casa').valueChanges();
  }


}
