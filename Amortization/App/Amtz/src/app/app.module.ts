import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { Facebook } from '@ionic-native/facebook/ngx';

import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { environment } from '../environments/environment';
import { HttpClientModule} from "@angular/common/http";
import { AmortizationPageModule } from './modal/amortization/amortization.module';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { DataService } from './providers/data.service';
import { AngularFirestore } from '@angular/fire/firestore';



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,BrowserModule,
    HttpClientModule, AmortizationPageModule,
    AngularFireDatabaseModule],
  providers: [
    DataService,
    StatusBar,
    SplashScreen, 
    Facebook,
    GooglePlus,
    AngularFirestore,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
