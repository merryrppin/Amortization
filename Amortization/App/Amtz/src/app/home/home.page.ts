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
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { File } from '@ionic-native/file';
import * as pdfmake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public listAmortization: Array<AmortizationCls>;//AmortizationCls
  public listAmortizationTypesValues: Array<AmortizationTypesValues>;
  public listAmortizationId: AmortizationCls;
  public pdfObj = null;
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
    this.listAmortization = [];
    this.dataService.getListAmortizations().subscribe((res) => {
      res.forEach((result) => {
        this.listAmortization.push(<AmortizationCls>result.payload.toJSON())
      });
      console.log(this.listAmortization);
    });
  }
 
  async loadAmortizationTypesValues(){
      this.listAmortizationTypesValues = [];
      this.http.get(URlApi + ApiControllers.AmortizationController).subscribe(
        (data:Array<AmortizationTypesValues>) => { // Success
          this.listAmortizationTypesValues = data;
        },
        (error) =>{
          console.error(error);
        }
      );
  }

  async loadListAmortizationIdpdf(name){
    debugger;
    this.listAmortizationId=this.listAmortization.find(x=>x.AmortizationName==name);
    console.log(this.listAmortizationId);
    let self = this;
pdfmake.vfs = pdfFonts.pdfMake.vfs;
let namedoc = this.listAmortizationId.AmortizationName; 
var docDefinition = {
content: [
{
columns: [
{
},
[
{ text: 'Amortizacion', style: 'header' },
{ text: this.listAmortizationId.AmortizationName, style: 'sub_header' },
{ text: 'WEBSITE: https://aqdlsolutons.azurewebsites.net/', style: 'url' },
{ text: 'Capital:'+this.listAmortizationId.TotalDebt,style:"url"},
{ text: 'Cuotas:'+this.listAmortizationId.NumberOfFee,style:"url"},
{ text: 'total a capital:'+this.listAmortizationId.FeeValue,style:"url"}
]
]
}
],
styles: {
header: {
bold: true,
fontSize: 20,
alignment: 'right'
},
sub_header: {
fontSize: 18,
alignment: 'right'
},
url: {
fontSize: 16,
alignment: 'right'
}
},
pageSize: 'A4',
pageOrientation: 'portrait'
};
pdfmake.createPdf(docDefinition).getBuffer(function (buffer) {
let utf8 = new Uint8Array(buffer);
let binaryArray = utf8.buffer;
self.saveToDevice(binaryArray, namedoc+".pdf")
});
}
saveToDevice(data:any,savefile:any){
let self = File;
self.writeFile(self.externalDataDirectory, savefile, data, {replace:false});
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
