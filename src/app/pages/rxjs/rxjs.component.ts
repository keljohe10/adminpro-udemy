import { Component, OnDestroy, OnInit } from '@angular/core';
import {Observable, Subscriber, Subscription} from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

subscription: Subscription;
  constructor() {

   this.subscription = this.regresaObservable().pipe( retry(3)).subscribe(
      numero => console.log('Subs', numero),
      error => console.log('Error en obs', error),
      () => console.log('termino el obs')
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log('Saliste de la pagina');
    this.subscription.unsubscribe();
  }

  regresaObservable(): Observable<any> {
    return new Observable( (observer: Subscriber<any>) => {

        let contador = 0;
        let intervalo = setInterval( () => {
          contador += 1;

          let salida = {
            valor: contador
          };

          observer.next(salida);

         // if (contador === 3) {
           // clearInterval(intervalo);
           // observer.complete();
         // }
         // if (contador === 2) {
            // clearInterval(intervalo);
           // observer.error('Llego a dos');
         // }

        }, 1000);

    }).pipe( map( resp => resp.valor),
             filter( ( value, index) => {
                 if ( ( value % 2) === 1) {
                     return true;
                 } else {
                   return false;
                 }
             })
             );


  }

}
