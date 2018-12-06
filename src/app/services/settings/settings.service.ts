import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

Ajustes: any = {
  url: 'assets/css/colors/default.css',
  tema: 'default'
};

  constructor() {
     this.ObtenerInstancia();
  }

  GuardarInstancia() {
    localStorage.setItem('ajuste', JSON.stringify(this.Ajustes));
  }

  ObtenerInstancia() {
    if (localStorage.getItem('ajuste')) {
      this.Ajustes = JSON.parse(localStorage.getItem('ajuste'));
      this.aplicarTema(this.Ajustes.tema);
    } else {
      this.aplicarTema(this.Ajustes.tema);
    }
  }

  aplicarTema(tema: string) {

    let url = `assets/css/colors/${tema}.css`;
    document.getElementById('theme').setAttribute('href', url );

    this.Ajustes.tema = tema;
    this.Ajustes.url = url;

    this.GuardarInstancia();
  }

}
