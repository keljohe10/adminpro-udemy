import { Usuario } from '../../models/usuario.model';
import { SidebarService, UsuarioService } from '../../services/service.index';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

usuario: Usuario;

  constructor(public _sidebar: SidebarService,
              public _usuarioServices: UsuarioService) {  }

  ngOnInit() {
    this.usuario = this._usuarioServices.usuario;
  }

}
