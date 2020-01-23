import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth){}

  register(form: String) {
    return true;
  }
  
  login(form: String) {
    return true;
  }

  doRegister(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
   }

//   doFacebookLogin(){
//     return new Promise<FirebaseUserModel>((resolve, reject) => {
//       if (this.platform.is('cordova')) {
//         //["public_profile"] is the array of permissions, you can add more if you need
//         this.fb.login(["public_profile"]).then((response) => {
//           const facebookCredential = firebase.auth.FacebookAuthProvider.credential(response.authResponse.accessToken);
//           firebase.auth().signInWithCredential(facebookCredential)
//           .then((user) => {
//             resolve()
//           });
//         },(err) => {
//           reject(err);
//         });
//       }
//       else{
//         this.afAuth.auth
//         .signInWithPopup(new firebase.auth.FacebookAuthProvider())
//        .then((user) => {
//           resolve()
//        })
//      }
//    })
//  }

 doLogout(){
  return new Promise((resolve, reject) => {
    if(firebase.auth().currentUser){
      this.afAuth.auth.signOut()
      resolve();
    }
    else{
      reject();
    }
  });
}
}
