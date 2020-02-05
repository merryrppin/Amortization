import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { AmortizationCls } from 'src/app/data/models/AmortizationCls';
import { HttpClient } from '@angular/common/http';
import { URlApi } from "src/environments/environment";
import { ApiControllers } from "src/environments/environment";
import { DataBaseCollections } from "src/environments/environment";
import { AmortizationTypesValues } from 'src/app/data/models/AmortizationTypesValues';
import { FeeCls } from 'src/app/data/models/FeeCls';
import { DataService } from 'src/app/providers/data.service';
import * as firebase from 'firebase/app';
import { firestore } from 'firebase/app';

@Component({
  selector: 'app-amortization',
  templateUrl: './amortization.page.html',
  styleUrls: ['./amortization.page.scss'],
})
export class AmortizationPage implements OnInit {

  amortizationObj: AmortizationCls;
  modalTitle: string;
  amortizationName: string;
  amortizationId: number;
  public listAmortizationTypesValues: Array<AmortizationTypesValues>;

  lastOrder: number;
  constructor(private http: HttpClient, private modalController: ModalController,
    private navParams: NavParams, private dataService: DataService) { }

  ngOnInit() {
    console.table(this.navParams);
    this.lastOrder = 0 + 1;//Obtener último ordenamiento y sumarle 1
    this.amortizationName = "",
      this.amortizationId = this.navParams.data.amortizationId;
    this.modalTitle = this.navParams.data.paramTitle;
    this.listAmortizationTypesValues = this.navParams.data.listAmortizationTypesValues;
    if (this.amortizationId == -1) { //Nuevo
      this.amortizationObj = new AmortizationCls();
      this.amortizationObj.UserId = firebase.auth().currentUser.uid;
      this.amortizationObj.Order = this.lastOrder;
      this.amortizationObj.AmortizationType = this.listAmortizationTypesValues.length == 1 ? this.listAmortizationTypesValues[0] : null;
    }
  }

  async closeModal() {
    console.log(this.amortizationObj);
    await this.modalController.dismiss(this.amortizationObj);
  }

  async calculateAmortization() {
    this.http.post(URlApi + ApiControllers.AmortizationController,
      {
        "TotalDebt": this.amortizationObj.TotalDebt,
        "Interest": this.amortizationObj.Interest,
        "NumberOfFee": this.amortizationObj.NumberOfFee,
        "InitialDate": this.amortizationObj.InitialDate,
        "AmortizationType": this.amortizationObj.AmortizationType.AmortizationType
      },
      {
        headers: { 'Content-Type': 'application/json' }
      }).subscribe(
        (data: AmortizationCls) => { // Success
          this.amortizationObj.Fees = data.Fees;
          this.amortizationObj.InitialDate = data.InitialDate;
          this.amortizationObj.FinalDate = data.FinalDate;
          this.amortizationObj.FeeValue = data.FeeValue;
          this.saveAmortizationToFirebase();
        },
        (error) => {
          console.error(error);
        }
      );
  }

  async saveAmortizationToFirebase() {
    // var addObjectPromise = this.dataService.addObject("/"+DataBaseCollections.amortizations, this.amortizationObj).then(res => {
    var addObjectPromise = this.dataService.addObject(this.amortizationObj, firebase.auth().currentUser.uid).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    });
    // this.amortizationObj
  }

}
