import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(){
  }

  /**
  * validacion de errorres por mensaje
  */
  async presentAlertOptions(title: any, subtit: any, message: any, rutaAcept: any, rutaCancel: any, options: any) {
    
    Swal.fire({
      title: title,
      text: message,
      icon: options ? 'success' : 'error',
      showCancelButton: true,
      confirmButtonText: 'Si, lo hare.',
      cancelButtonText: 'Cancelar',
    })
  }

  async presentLoading(message: string, duration: number) {

    /* let loader = await this.loadingCtrl.create({
      message: this.translate.store.translations[this.translate.store.currentLang][message] ? this.translate.store.translations[this.translate.store.currentLang][message] : message,
      duration: duration ? duration : 5000
    });
    loader.present(); */
  }

  async showLongToast(message: string) {
    /* let toast = await this.toastCtrl.create({
      message: this.translate.store.translations[this.translate.store.currentLang][message] ? this.translate.store.translations[this.translate.store.currentLang][message] : message,
      duration: 2000,
    });
    toast.present(); */
  }
}
