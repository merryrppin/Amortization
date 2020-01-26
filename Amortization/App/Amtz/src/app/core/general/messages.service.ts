import { Injectable } from '@angular/core';
import {
  LoadingController,
  ToastController,
  AlertController
} from "@ionic/angular";
import { ToastOptions } from "@ionic/core";

export interface IOptionLoading {
  message: string;
  keyboardClose: boolean;
}

interface IOptionToast {
  position?: "top" | "bottom" | "middle";
  duration?: number;
}

interface IOptionAlert {
  message: string;
}

interface IOptionAlertInfo extends IOptionAlert {
  buttonText?: string;
}

interface IOptionAlertConfirm extends IOptionAlert {
  buttonTextYes?: string;
  buttonTextNo?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private _toast: HTMLIonToastElement;
  readonly limitToast: number = 3000;

  constructor(
    private loadingController: LoadingController,
    private toastCtrl: ToastController,
    public alertController: AlertController
  ) {}

  throwErrorPermissionMessage() {
    this.showInfoMessage(
      "Info"
    );
  }

  toastDissmiss() {
    setTimeout(() => {
      if (this._toast) this._toast.dismiss();
    });
  }

  async presentLoading(opts: IOptionLoading): Promise<HTMLIonLoadingElement> {
    const loading = await this.loadingController.create({
      message: opts.message,
      backdropDismiss: false,
      spinner: "crescent",
      mode: "ios",
      keyboardClose: opts.keyboardClose
    });

    await loading.present();
    return loading;
  }

  async showMessage(
    message: string,
    showButtonDismiss: boolean = false,
    opt: IOptionToast = { position: "top" }
  ): Promise<HTMLIonToastElement> {
    return this.toastMessage(message, showButtonDismiss, "toast-none", opt);
  }

  async showErrorMessage(
    message: string,
    showButtonDismiss: boolean = false,
    opt: IOptionToast = { position: "top" }
  ): Promise<HTMLIonToastElement> {
    return this.toastMessage(message, showButtonDismiss, "toast-error", opt);
  }

  async showInfoMessage(
    message: string,
    showButtonDismiss: boolean = false,
    opt: IOptionToast = { position: "top" }
  ): Promise<HTMLIonToastElement> {
    return this.toastMessage(message, showButtonDismiss, "toast-info", opt);
  }

  async showWarningMessage(
    message: string,
    showButtonDismiss: boolean = false,
    opt: IOptionToast = { position: "top" }
  ): Promise<HTMLIonToastElement> {
    return this.toastMessage(message, showButtonDismiss, "toast-warning", opt);
  }

  async showSuccessMessage(
    message: string,
    showButtonDismiss: boolean = false,
    opt: IOptionToast = { position: "top" }
  ): Promise<HTMLIonToastElement> {
    return this.toastMessage(message, showButtonDismiss, "toast-success", opt);
  }

  async showConfirmedMessage(opt: IOptionAlertConfirm) {
    return new Promise<boolean>(async (resolve, reject) => {
      let confirm = await this.alertController.create({
        message: opt.message,
        mode: "ios",
        backdropDismiss: false,
        buttons: [
          {
            text: opt.buttonTextYes ? opt.buttonTextYes : "Yes",
            handler: () => {
              resolve(true);
            }
          },
          {
            text: opt.buttonTextNo ? opt.buttonTextNo : "No",
            handler: () => {
              resolve(false);
            }
          }
        ]
      });
      await confirm.present();
    });
  }

  async showAlertMessage(opt: IOptionAlertInfo): Promise<HTMLIonAlertElement> {
    let message = await this.alertController.create({
      message: opt.message,
      mode: "ios",
      backdropDismiss: false,
      buttons: [
        {
          text: opt.buttonText ? opt.buttonText : "OK"
        }
      ]
    });
    await message.present();
    return message;
  }

  private async toastMessage(
    message: string,
    showButtonDismiss: boolean = false,
    cssClass: string,
    opt: IOptionToast
  ): Promise<HTMLIonToastElement> {
    let options: ToastOptions = {
      message: message,
      duration: !showButtonDismiss
        ? opt.duration
          ? opt.duration
          : this.limitToast
        : null,
      showCloseButton: showButtonDismiss,
      closeButtonText: showButtonDismiss ? "X" : null,
      cssClass: cssClass,
      position: opt.position ? opt.position : "top"
    };
    this._toast = await this.toastCtrl.create(options);
    this._toast.present();
    return this._toast;
  }
}
