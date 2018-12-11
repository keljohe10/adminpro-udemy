import { Title, Meta, MetaDefinition } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

Titulo: string;
  constructor( private _router: Router,
               private title: Title,
               private meta: Meta) {

    this.getDataRoute()
          .subscribe( data => {
              this.Titulo = data.titulo;
              this.title.setTitle( this.Titulo );

              const metaTag: MetaDefinition = {
                  name: 'description',
                  content: this.Titulo
              };

              this.meta.updateTag( metaTag );
          });
  }

  ngOnInit() {
  }

  getDataRoute() {
      return  this._router.events.pipe( filter( evento => evento instanceof ActivationEnd),
                              filter( (evento: ActivationEnd) => evento.snapshot.firstChild === null ),
                              map( (evento: ActivationEnd) => evento.snapshot.data ) );
  }

}
