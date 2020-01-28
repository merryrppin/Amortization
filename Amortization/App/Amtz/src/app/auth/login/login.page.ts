import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { LoadingController, NavController } from '@ionic/angular';
import { MessagesService } from 'src/app/core/general/messages.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authService: AuthService, private navCtrl: NavController, private messagesService: MessagesService) { }

  ngOnInit() {
    this.validateCurrentLogin();
  }

  validateCurrentLogin() {
    if (this.authService.validateCurrentLogin()) {
      this.navCtrl.navigateRoot(["/home"]);
    }
  }

  async login(form) {
    var loginPromise = this.authService.loginUser(form.value).then(res => {
      this.validateCurrentLogin();
    }).catch(err => {
      this.messagesService.showErrorMessage(err);
    });
  }

  facebookLogin(): Promise<any> {
    return this.authService.facebookLogin();
  }

  gmailLogin(): Promise<any> {
    return this.authService.googleLogin();
  }
}
