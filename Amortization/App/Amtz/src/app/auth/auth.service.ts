import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Facebook } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth, private google: GooglePlus, public facebook: Facebook, private fireAuth: AngularFireAuth) { }

  register(form: String) {
    return true;
  }

  login(form: String) {
    return true;
  }

  doRegister(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
        .then(res => {
          resolve(res);
        }, err => reject(err))
    })
  }

  async facebookLogin(): Promise<any> {
    return this.facebook.login(['email'])
      .then(response => {
        const facebookCredential = firebase.auth.FacebookAuthProvider
          .credential(response.authResponse.accessToken);

        firebase.auth().signInWithCredential(facebookCredential)
          .then(success => {
            console.log("Firebase success: " + JSON.stringify(success));
          });

      }).catch((error) => { console.log(error) });
  }


  async googleLogin(): Promise<any> {
    let params;
    // if (this.platform.is('android')) {
    //   params = {
    //     'webClientId': '124018728460-sv8cqhnnmnf0jeqbnd0apqbnu6egkhug.apps.googleusercontent.com',
    //     'offline': true
    //   }
    // }
    // else {
    //   params = {}
    // }
    return this.google.login(params)
      .then((response) => {
        const { idToken, accessToken } = response
        this.onLoginSuccess(idToken, accessToken);
      }).catch((error) => {
        console.log(error)
        alert('error:' + JSON.stringify(error))
      });
  }
  onLoginSuccess(accessToken, accessSecret) {
    const credential = accessSecret ? firebase.auth.GoogleAuthProvider
      .credential(accessToken, accessSecret) : firebase.auth.GoogleAuthProvider
        .credential(accessToken);
    this.fireAuth.auth.signInWithCredential(credential)
      .then((success) => {
        console.log("Firebase success: " + JSON.stringify(success));
      })

  }
  onLoginError(err) {
    console.log(err);
  }

  //  async doGoogleLogin(){
  // 	const loading = await this.loadingController.create({
  // 		message: 'Please wait...'
  // 	});
  // 	this.presentLoading(loading);

  // 	this.googlePlus.login({
  // 		'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
  // 		'webClientId': 'webClientId.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
  // 		'offline': true // Optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
  // 	})
  // 	.then(user =>{
  // 		loading.dismiss();

  // 		this.nativeStorage.setItem('google_user', {
  // 			name: user.displayName,
  // 			email: user.email,
  // 			picture: user.imageUrl
  // 		})
  // 		.then(() =>{
  // 			this.router.navigate(["/user"]);
  // 		}, error =>{
  // 			console.log(error);
  // 		})
  // 		loading.dismiss();
  // 	}, err =>{
  // 		console.log(err)
  // 		loading.dismiss();
  // 	});

  // 	async presentLoading(loading) {
  // 		return await loading.present();
  // 	}
  // }

  // doGoogleLogout(){
  // 	this.googlePlus.logout()
  // 	.then(res =>{
  // 		//user logged out so we will remove him from the NativeStorage
  // 		this.nativeStorage.remove('google_user');
  // 		this.router.navigate(["/login"]);
  // 	}, err =>{
  // 		console.log(err);
  // 	})
  // }

  doLogout() {
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
