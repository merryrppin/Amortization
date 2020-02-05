import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Facebook } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { WebClientId } from "src/environments/environment";
import { MessagesService } from '../core/general/messages.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth, private google: GooglePlus, public facebook: Facebook, 
    private fireAuth: AngularFireAuth, private messagesService: MessagesService) { }

  async loginUser(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
        .then(res => {
          resolve(res);
        }).catch(err => {
          reject(err);
        });
    })
  }

  validateCurrentLogin() {
    return this.userDetails() !== null && typeof this.userDetails().email !== 'undefined';
  }

  userDetails() {
    return firebase.auth().currentUser;
  }

  doRegister(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
        .then(res => {
          resolve(res);
        }, err => {
          this.messagesService.showErrorMessage(err);
        })
    })
  }

  async facebookLogin(): Promise<any> {
    return this.facebook.login(['email'])
      .then(response => {
        debugger;
        const facebookCredential = firebase.auth.FacebookAuthProvider
          .credential(response.authResponse.accessToken);

        firebase.auth().signInWithCredential(facebookCredential)
          .then(success => {
            debugger;
            console.log("Firebase success: " + JSON.stringify(success));
          }).catch(error => {
            this.messagesService.showErrorMessage(error);
          });

      }).catch((error) => {
        this.messagesService.showErrorMessage(error);
      });
  }


  async googleLogin(): Promise<any> {
    debugger;
    let params;
    // if (this.platform.is('android')) {
    params = {
      // 'webClientId': WebClientId,
      'offline': true
    }
    // }
    // else {
    //   params = {}
    // }
    return this.google.login(params)
      .then((response) => {
        debugger;
        const { idToken, accessToken } = response;
        this.onLoginSuccess(idToken, accessToken);
      }).catch((error) => {
        this.messagesService.showErrorMessage(error);
      });
  }

  onLoginSuccess(accessToken: string, accessSecret: string) {
    debugger;
    const credential = accessSecret ? firebase.auth.GoogleAuthProvider
      .credential(accessToken, accessSecret) : firebase.auth.GoogleAuthProvider
        .credential(accessToken);
    this.fireAuth.auth.signInWithCredential(credential)
      .then((success) => {
        console.log("Firebase success: " + JSON.stringify(success));
      })

  }

  async doLogout() {
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser) {
        this.afAuth.auth.signOut()
        resolve();
      }
      else {
        reject();
      }
    });
  }
}
