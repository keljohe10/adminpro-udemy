import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { UsuarioService } from '../../services/service.index';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
declare var swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

usuarios: Usuario[] = [];
desde = 0;
totalRegistros = 0;
cargando = true;

  constructor(public _usuarioServices: UsuarioService,
              public _modalUploadServices: ModalUploadService) { }

  ngOnInit() {
    this.cargarUsuarios();
    this._modalUploadServices.notificacion
           .subscribe( resp => this.cargarUsuarios());
  }
  mostrarModal(id: string) {
    this._modalUploadServices.mostrarModal('usuarios', id);
  }

  buscarUsuarios( termino: string ) {
    if (termino.length <= 0) {
      this.cargarUsuarios();
      return;
    }
    this.cargando = true;
    this._usuarioServices.buscarUsuario( termino)
          .subscribe( (usuarios: Usuario[]) => {
              this.usuarios = usuarios;
              this.cargando = false;
          });
  }
  cargarUsuarios() {
   this.cargando = true;
   this._usuarioServices.cargarUsuarios(this.desde)
         .subscribe( (resp: any) => {
           this.usuarios = resp.usuarios;
           this.totalRegistros = resp.conteo;
           this.cargando = false;
         });
  }
  paginarUsuario( valor) {
    let pagina = this.desde + valor;

    if (pagina >= this.totalRegistros || pagina < 0) {
      return;
    }
    this.desde += valor;
    this.cargarUsuarios();
  }
  borrarUsuario( usuario: Usuario) {
    if (this._usuarioServices.usuario._id === usuario._id) {
      swal('No puede borrar usuario', 'No se puede borrar asi mismo', 'error');
      return;
    }
    swal({
      title: '¿Esta seguro?',
      text: 'Esta a punto de borrar a ' + usuario.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then( borrar => {
      if (borrar) {
         this._usuarioServices.borrarUsuario(usuario._id)
               .subscribe( (resp: boolean) => {
                 console.log(resp);
                 this.cargarUsuarios();
               });
      }
    });
  }
  actualizarRole(usuario: Usuario) {
    this._usuarioServices.actualizarUsuario( usuario )
          .subscribe();
  }
}
