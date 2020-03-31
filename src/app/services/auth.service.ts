import { Injectable } from '@angular/core';
import { Facebook } from '@ionic-native/facebook/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  logged: boolean;

  constructor(private fb: Facebook,
    private nativeStorage: NativeStorage,
    private loadingController: LoadingController,
    private router: Router,
    private angularFireAuth: AngularFireAuth) {
    this.logged = false;
  }
  async presentLoading(loading) {
    return await loading.present();
  }

  signInWithFacebook(accessToken: string): Promise<any> {
    const facebookCredential = firebase.auth.FacebookAuthProvider.credential(accessToken);
    return this.angularFireAuth.auth.signInWithCredential(facebookCredential);
  }

  async facebook() {
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    this.presentLoading(loading);
    let permissions = new Array<string>();
    permissions = ['public_profile', 'email'];
    this.fb.login(permissions)
      .then(response => {
        const userId = response.authResponse.userID;
        this.signInWithFacebook(response.authResponse.accessToken)
          this.fb.api('/me?fields=name, email', permissions)
            .then(user => {
              user.picture = 'https://graph.facebook.com/' + userId + '/picture?type=large';
              this.nativeStorage.setItem('facebook_user',
                {
                  name: user.name,
                  email: user.email,
                  picture: user.picture
                })
                .then(() => {
                  this.logged = true;
                  this.router.navigate(['/temperatura']);
                  loading.dismiss();
                }, error => {
                  console.log(error);
                  loading.dismiss();
                });
            });
      }, error => {
        console.log(error);
        loading.dismiss();
      });
  }

  async isLoggedIn(): Promise<boolean> {
    let value: boolean;
    await this.nativeStorage.getItem('facebook_user').then(() => {
      value = true;
      this.logged = true;
    }, err => {
      value = false;
      this.logged = false;
    });
    return value;
  }

  logOut() {
    this.fb.logout()
      .then(res => {
        this.logged = false;
        this.nativeStorage.remove('facebook_user');
        this.router.navigate(['/login']);
      }, error => {
        alert(error);
      })
  }
}
