import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { NavController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private authService: AuthService, private navCtrl: NavController) {
  }
  ngOnInit() {
    if (!this.authService.validateCurrentLogin()) {
      this.navCtrl.navigateRoot(["/login"]);
    }
  }

}
