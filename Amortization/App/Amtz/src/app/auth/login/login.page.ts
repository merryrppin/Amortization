import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";
import { AuthService } from '../auth.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private  authService:  AuthService, private  router:  Router) { }

  ngOnInit() {
  }

  login(form){
    // this.authService.login(form.value).subscribe((res)=>{
    // });
    // this.authService.login(form.value){
    //   this.router.navigateByUrl('home');
    // };
  }

  facebookLogin(): Promise<any> {
    return this.authService.facebookLogin();
  }

  gmailLogin(): Promise<any> {
    return this.authService.googleLogin();
  }
}
