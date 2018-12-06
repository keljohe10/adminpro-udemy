import { SettingsService } from '../../services/service.index';
import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-accout-settings',
  templateUrl: './accout-settings.component.html',
  styles: []
})
export class AccoutSettingsComponent implements OnInit {


  constructor( private _ajuste: SettingsService) {}

  ngOnInit() {
    this.ColocarCheck();
  }

  cambiarColor(color: string, link: any ) {

    this.cambiarTema(link);
    this._ajuste.aplicarTema(color);
  }

  cambiarTema(link: any) {
    let selectores: any = document.getElementsByClassName('selector');

    for (let ref of selectores) {
      ref.classList.remove('working');
    }

    link.classList.add('working');
  }

  ColocarCheck() {
    let selectores: any = document.getElementsByClassName('selector');
    let tema = this._ajuste.Ajustes.tema;

    for (let ref of selectores) {
      if (ref.getAttribute('data-theme') === tema) {
        ref.classList.add('working');
        break;
      }
    }

  }

}


