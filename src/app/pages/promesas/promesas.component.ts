import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {


  constructor() {

    this.contarhastatres().then(
      (boolean) => console.log('Ha funcionado', boolean)
    )
    .catch( (error) => console.log('ha ocurrido un error', error));

}

  ngOnInit() {
  }

  contarhastatres(): Promise<boolean> {
    return new Promise( (resolve, reject) => {

      let contador = 0;

      let Intervalo = setInterval( () => {
          contador += 1;
          console.log(contador);

          if ( contador === 3) {

            resolve(true);
            // reject('Paro!!');
            clearInterval(Intervalo);

          }
      }, 1000);
    });

  }

}
