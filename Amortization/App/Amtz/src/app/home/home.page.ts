import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { NavController, MenuController } from '@ionic/angular';
import { AmortizationCls } from '../data/models/AmortizationCls';
import { WebapiService } from '../core/services/api/webapi.service';
import { DataResponse } from '../data/Data';
import { HttpClient } from '@angular/common/http';
import { AmortizationTypesValues } from '../data/models/AmortizationTypesValues';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public listAmortization: Array<AmortizationCls>;
  public listAmortizationTypesValues: Array<AmortizationTypesValues>;
  private UrlWebApi : string = "https://amortization.azurewebsites.net";
  // private UrlWebApi : string = "http://localhost:50070";
  
  private AmortizationController : string = "/api/Amortization";
  constructor(private authService: AuthService, private navCtrl: NavController, private http: HttpClient) {
  }
  ngOnInit() {
    if (!this.authService.validateCurrentLogin()) {
      this.navCtrl.navigateRoot(["/login"]);
    } else {
      this.loadListAmortization();
      this.loadAmortizationTypesValues();
    }
  }

  async loadListAmortization() {
    this.listAmortization = new Array<AmortizationCls>();
  }

  async addAmortization() {
    this.http.post(this.UrlWebApi + this.AmortizationController,
      {
        "TotalDebt": 107000000,
        "Interest": 0.008545,
        "NumberOfFee": 180,
        "InitialDate": "2020-01-18",
        "AmortizationType": 1
      },
      {
        headers: { 'Content-Type': 'application/json' }
      }).subscribe(
        (data) => { // Success
          console.log(data);
        },
        (error) =>{
          console.error(error);
        }
      );

  }

  async loadAmortizationTypesValues(){
      this.http.get(this.UrlWebApi + this.AmortizationController).subscribe(
        (data) => { // Success
          this.listAmortizationTypesValues = data['results'];
          console.log(this.listAmortizationTypesValues);
        },
        (error) =>{
          console.error(error);
        }
      );
  }

}
