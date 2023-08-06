import { Component } from '@angular/core';

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
  async presentAlertOptions(tit: any, subtit: any, message: any, rutaAcept: any, rutaCancel: any, options: any) {
    /* var titT = tit
    var subtitT = subtit
    var messageT = message

    var buttonsDefault = [
      {
        text: 'Aceptar',
        handler: () => {
          if (options.url)
            window.open(options.url, '_system', 'location=yes');

        }
      }
    ];
    var buttons = buttonsDefault//options.btn ? options.btn : buttonsDefault;
    var backdropDismiss = options.backdropDismiss
    
    const alert = await this.alertCtrl.create({
      cssClass: 'barter-custom-class',
      header: tit ? titT ? titT : tit : tit,
      subHeader: subtit ? subtitT ? subtitT : subtit : subtit,
      message: message ? messageT ? messageT : message : 'FAILED OPERATION',
      buttons,
      backdropDismiss: backdropDismiss
    });
    alert.present(); */
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
