import { Injectable } from '@angular/core';
import { LoadingController, ToastController, AlertController, ModalController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiActionsService {

  constructor(private loadingController: LoadingController,
    private toastController: ToastController,
    private alertController: AlertController,
    private modalController: ModalController) { }

  async presentLoading(message: string, spinner?: "lines" | "bubbles" | "circles" | "circular" | "crescent" | "dots" | "lines-small" | null, duration?: number) {
    const loading = await this.loadingController.create({
      message: message,
      spinner: (spinner) ? spinner : 'lines',
      duration: (duration) ? duration : 0
    });

    return loading;
  }

  async presentToast(message: string, present: boolean, duration: number, header?: string, color?: string, position?: "bottom" | "middle" | "top") {
    const toast = await this.toastController.create({
      header: (header) ? header : null,
      message: message,
      duration: duration,
      color: color,
      position: (position) ? position : 'bottom'
    });

    if(present){
      return toast.present();
    }else{
      return toast;
    }
    
  }

  async presentAlert(message: string, buttons: string[], header?: string, ) {
    const alert = await this.alertController.create({
      header: (header) ? header : null,
      message: message,
      buttons: buttons
    });

    return await alert.present();
  }

}
