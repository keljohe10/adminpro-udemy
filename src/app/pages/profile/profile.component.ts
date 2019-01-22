import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

usuario: Usuario;
archivoSubir: File;
imgTemp: string;
@ViewChild('searchInput') searchInput: ElementRef;

  constructor( public _usuarioService: UsuarioService) {
    this.usuario = this._usuarioService.usuario;
   }

  ngOnInit() {

  }

  guardar(usuario: Usuario) {
    this.usuario.nombre = usuario.nombre;
    if ( !this.usuario.google) {
         this.usuario.email = usuario.email;
    }
    this._usuarioService.actualizarUsuario( this.usuario)
          .subscribe();
  }

  subirArchivo( archivo: File ) {
    if (!archivo) {
      this.archivoSubir = null;
      return;
    }
    if (archivo.type.indexOf('image') < 0) {
      this.archivoSubir = null;
      swal('Solo imagenes', 'El archivo seleccionado no es una imagen', 'error');
      return;
    }
    this.archivoSubir = archivo;

    let reader = new FileReader();
    let urlTemporal = reader.readAsDataURL( archivo );

    reader.onloadend = () => this.imgTemp = reader.result.toString();

  }

  cambiarImagen() {
    this._usuarioService.cambiarImagen( this.archivoSubir, this.usuario._id);
    this.searchInput.nativeElement.value = '';
  }

}
