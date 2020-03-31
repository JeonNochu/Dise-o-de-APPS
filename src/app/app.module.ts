import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';



var firebaseConfig = {
  apiKey: "AIzaSyDZvhnm-_hYm321u8bPXRTMJwfcWPaF6xw",
  authDomain: "apptemp-99f46.firebaseapp.com",
  databaseURL: "https://apptemp-99f46.firebaseio.com",
  projectId: "apptemp-99f46",
  storageBucket: "apptemp-99f46.appspot.com",
  messagingSenderId: "670747637403",
  appId: "1:670747637403:web:22a3d59df21d9b472db83e"
};

@NgModule({
  declarations: [AppComponent, LoginComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Facebook,
    NativeStorage,
    OneSignal,
    AngularFireAuth
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
