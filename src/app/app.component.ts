import { Component, OnInit } from '@angular/core';

import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { OneSignal } from '@ionic-native/onesignal/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'User',
      url: 'user',
      icon: 'person'
    },
    {
      title: 'Temperatura',
      url: 'temperatura',
      icon: 'thermometer'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private oneSignal: OneSignal,
    private alertCtrl: AlertController,
    protected auth: AuthService,
    private authService: AuthService
    
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.auth.isLoggedIn().finally(() => {
        this.router.navigate(['/user']);
      }).catch(() => {
        this.router.navigate(['/login']);
      });

      this.statusBar.styleDefault();
      if (this.platform.is('cordova')){
        this.setUpPush()
      }
    });
  }

  setUpPush(){
    this.oneSignal.startInit('6df03d95-6dc3-434a-935f-92b3678fa0eb','670747637403');
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.None);
    this.oneSignal.handleNotificationReceived().subscribe((data: any) =>{
      let msg = data.payload.body;
      let title = data.payload.title;
      let additionalData = data.payload.additionalData;
      this.showAlert(title, msg, additionalData);
    });
    this.oneSignal.handleNotificationOpened().subscribe((data: any) =>{
      let additionalData = data.notification.payload.additionalData;
      this.showAlert('Notification opened', 'You already read this before', additionalData);
    });
    this.oneSignal.endInit();
  }

  async showAlert(title, msg, task){
    let alert = await this.alertCtrl.create({
      header: title,
      subHeader:msg,
      buttons: [
        {
          text: `Action: ${task}`,
          handler: () =>{

          }
        }
      ]
    });
    alert.present();
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
}
