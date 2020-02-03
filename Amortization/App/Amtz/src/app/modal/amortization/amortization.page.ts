import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { AmortizationCls } from 'src/app/data/models/AmortizationCls';
import { HttpClient } from '@angular/common/http';
import { URlApi } from "src/environments/environment";
import { ApiControllers } from "src/environments/environment";
import { AmortizationTypesValues } from 'src/app/data/models/AmortizationTypesValues';
import { FeeCls } from 'src/app/data/models/FeeCls';

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

  constructor( private http: HttpClient,private modalController: ModalController,
    private navParams: NavParams) { }

  ngOnInit() {
    console.table(this.navParams);
    this.amortizationName = "",
    this.amortizationId = this.navParams.data.amortizationId;
    this.modalTitle = this.navParams.data.paramTitle;
    this.listAmortizationTypesValues = this.navParams.data.listAmortizationTypesValues;
    if(this.amortizationId == -1){ //Nuevo
      this.amortizationObj = new AmortizationCls();
    }
  }

  async closeModal() {
    console.log(this.amortizationObj);
    await this.modalController.dismiss(this.amortizationObj);
  }

  async calculateAmortization() {
    debugger;
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
        (data:AmortizationCls) => { // Success
          this.amortizationObj.Fees = data.Fees;
          this.amortizationObj.InitialDate = data.InitialDate;
          this.amortizationObj.FinalDate = data.FinalDate;
          this.amortizationObj.FeeValue = data.FeeValue;
        },
        (error) =>{
          console.error(error);
        }
      );
  }

  async saveAmortizationToFirebase() {
    // this.amortizationObj
  }

}
