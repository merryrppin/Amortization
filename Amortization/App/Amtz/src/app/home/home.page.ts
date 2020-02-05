import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { NavController, MenuController, ModalController } from '@ionic/angular';
import { AmortizationCls } from '../data/models/AmortizationCls';
import { WebapiService } from '../core/services/api/webapi.service';
import { DataResponse } from '../data/Data';
import { HttpClient } from '@angular/common/http';
import { AmortizationTypesValues } from '../data/models/AmortizationTypesValues';
import { AmortizationPage } from '../modal/amortization/amortization.page';
import { URlApi } from "src/environments/environment";
import { ApiControllers } from "src/environments/environment";
import { DataBaseCollections } from "src/environments/environment";
import * as firebase from 'firebase/app';
import { DataService } from 'src/app/providers/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public listAmortization: Array<AmortizationCls>;
  public listAmortizationTypesValues: Array<AmortizationTypesValues>;
  
  constructor(private authService: AuthService, private navCtrl: NavController, private http: HttpClient,
    public modalCtrl: ModalController, private dataService: DataService) {
      this.listAmortization = new Array<AmortizationCls>();
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
    debugger;
    var addObjectPromise = this.dataService.getListAmortizations(DataBaseCollections.amortizations,firebase.auth().currentUser.uid).then(res => {
      debugger;
      this.listAmortization = res;
      console.log(res);
    }).catch(err => {
      console.log(err);
    });

  }
 
  async loadAmortizationTypesValues(){
      this.http.get(URlApi + ApiControllers.AmortizationController).subscribe(
        (data:Array<AmortizationTypesValues>) => { // Success
          this.listAmortizationTypesValues = data;
        },
        (error) =>{
          console.error(error);
        }
      );
  }

  amortizationReturned:AmortizationCls;

  async openAmortizationModal(amortizationId:number) {
    const modal = await this.modalCtrl.create({
      component: AmortizationPage,
      componentProps: {
        "amortizationId": amortizationId,
        "paramTitle": amortizationId == -1 ? "Crear amortización" : "Editar amortización",
        "listAmortizationTypesValues":this.listAmortizationTypesValues //Este valor ya debio haberse cargado, validar con promesas para que no este vacio si se abre muy pronto la modal
      }
    });
 
    modal.onDidDismiss().then((dataReturned) => {
      console.log(dataReturned);
      if (dataReturned !== null) {
        this.amortizationReturned = dataReturned.data;
      }
    });
 
    return await modal.present();
  }
}
