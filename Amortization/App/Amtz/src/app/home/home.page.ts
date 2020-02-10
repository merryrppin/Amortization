import { Pipe,Component } from '@angular/core';
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
import { FeeCls } from '../data/models/FeeCls';
import { DatePipe,CurrencyPipe } from '@angular/common';
import {ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public listAmortization: Array<AmortizationCls>;//AmortizationCls
  public listAmortizationTypesValues: Array<AmortizationTypesValues>;
  public listAmortizationId: AmortizationCls;
  public listdetails:Array<FeeCls>;
  public pdfObj = null;
  constructor(private authService: AuthService, private navCtrl: NavController, private http: HttpClient,
    public modalCtrl: ModalController, private dataService: DataService,public toastController: ToastController) {
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
    let date = new DatePipe('en-us');
    this.listAmortizationId = this.listAmortization.find(x => x.AmortizationName == name);
    console.log(this.listAmortizationId);
    let self = this;
    pdfmake.vfs = pdfFonts.pdfMake.vfs;
    let namedoc = this.listAmortizationId.AmortizationName;
    this.listdetails = this.listAmortizationId.Fees;
    let item = [];
    let row = new Array();
    row.push('Balance');
    row.push('Intereses');
    row.push('Abono a Capital');
    row.push('Fecha Cuota');
    row.push('Interes Cuota');
    row.push('Numero Cuota');
    row.push('Valor de la cuota');
    row.push('Deuda');
    item.push(row);
    for (var key in this.listdetails) {
        let values = new Array();
        values.push(this.formatMoney(this.listdetails[key].Balance.toFixed(2)));
        values.push(this.formatMoney(this.listdetails[key].BankInterest.toFixed(2)));
        values.push(this.formatMoney(this.listdetails[key].CapitalPayment.toFixed(2)));
        values.push(date.transform(this.listdetails[key].FeeDate, 'yyyy/MM/dd'));
        values.push(this.listdetails[key].FeeInterest);
        values.push(this.listdetails[key].FeeNumber);
        values.push(this.formatMoney(this.listdetails[key].FeeValuePerFee.toFixed(2)));
        values.push(this.formatMoney(this.listdetails[key].MissingDebt.toFixed(2)));
        item.push(values);
    }
    let docDefinition = {
        content: [
            { text: 'Amortizacion ' + this.listAmortizationId.AmortizationName, style: 'header' },
            { text: 'Fecha Inicio: ' + date.transform(this.listAmortizationId.InitialDate, 'yyyy/MM/dd') + ' Fecha Final: ' + date.transform(this.listAmortizationId.FinalDate, 'yyyy/MM/dd'), style: 'sub_header' },
            { text: 'Valor Credito: ' + this.formatMoney(this.listAmortizationId.TotalDebt.toFixed(2)) + ' Cuotas:' + this.listAmortizationId.NumberOfFee, style: 'url' },
            {
                table: {
                    widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
                    body: item
                }
            }
        ],
        styles: {
            header: {
                bold: true,
                fontSize: 20,
                alignment: 'left'
            },
            sub_header: {
                fontSize: 18,
                alignment: 'left'
            },
            url: {
                fontSize: 16,
                alignment: 'left'
            }
        },
        pageSize: 'A4',
        pageOrientation: 'portrait'
    };
    pdfmake.createPdf(docDefinition).getBuffer(function (buffer) {
        let utf8 = new Uint8Array(buffer);
        let binaryArray = utf8.buffer;
        self.saveToDevice(binaryArray, namedoc + ".pdf");
    });
    let toast = this.toastController.create({
        message: 'Archivo descargado correctamente.',
        duration: 2000,
        color: 'success'
    });
    (await toast).present();
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

  formatMoney(value) {
    let currency = new CurrencyPipe('en-us');
    const temp = `${value}`.replace(/\./g, "");
    return currency.transform(temp).replace("$", "");
  }
}
