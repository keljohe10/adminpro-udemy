import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {
  @Input() progreso = 50;
  // tslint:disable-next-line:no-input-rename
  @Input('NombreLeyenda') leyenda = 'Leyenda';
  @Output() UpdateValor: EventEmitter<number> =  new EventEmitter;

  @ViewChild('txtProgress') txtProgress: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  onChanges(event: number) {

    if (event >= 100) {
      this.progreso = 100;
    } else if (event <= 0 ) {
      this.progreso = 0;
    } else {
      this.progreso = event;
    }

    this.txtProgress.nativeElement.value = this.progreso;
    this.UpdateValor.emit(this.progreso);

  }

  CambiarValor( valor: number) {
    if (this.progreso >= 100 && valor > 0) {
      this.progreso = 100;
      return;
    }
    if (this.progreso <= 0 && valor < 0) {
      this.progreso = 0;
      return;
    }
    this.progreso += valor;
    this.UpdateValor.emit(this.progreso);
    this.txtProgress.nativeElement.focus();

  }

}
