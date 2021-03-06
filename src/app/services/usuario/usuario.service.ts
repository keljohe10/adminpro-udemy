import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

usuario: Usuario;
token: string;

constructor(public http: HttpClient, public _router: Router, public _subirArchivoServices: SubirArchivoService) {
  this.cargarStorage();
}

  estaLogeado() {
   return ( this.token.length > 5) ? true : false;
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  guardaStorage(id: string, token: string, usuario: Usuario) {
     localStorage.setItem('id', id);
     localStorage.setItem('token', token);
     localStorage.setItem('usuario', JSON.stringify(usuario));

     this.usuario = usuario;
     this.token = token;
  }

  logout() {
    this.token = '';
    this.usuario = null;
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this._router.navigate(['/login']);
  }

  loginGoogle(token) {
    let url = URL_SERVICIOS + '/login/google';

    return this.http.post( url, {token})
              .pipe( map( (resp: any) => {
                        this.guardaStorage(resp.id, resp.token, resp.usuario);
                        return true;
                   })
              );
  }

  login( usuario: Usuario, recuerdame: boolean = false) {
       let url = URL_SERVICIOS + '/login';

       if (recuerdame) {
         localStorage.setItem('email', usuario.email);
       } else {
         localStorage.removeItem('email');
       }

       return this.http.post( url, usuario)
                 .pipe( map( (resp: any) => {
                      this.guardaStorage(resp.id, resp.token, resp.usuario);
                      return true;
                 })
                );
  }

  crearUsuario( usuario: Usuario ) {

      let url = URL_SERVICIOS + '/usuario';

      return this.http.post( url, usuario)
                  .pipe( map( (resp: any) => {
                            swal('Usuario creado', usuario.email, 'success');
                            return resp.usuario;
                         })
                  );
  }

  actualizarUsuario( usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;

    return this.http.put( url, usuario)
                .pipe( map( (resp: any) => {

                if (usuario._id === this.usuario._id) {
                  let usuarioBD: Usuario = resp.usuarios;
                  this.guardaStorage(usuarioBD._id, this.token, usuarioBD);
                }
                    swal('Usuario actualizado', usuario.nombre, 'success');
                    return true;
                 })
                );
  }

  cambiarImagen( archivo: File, id: string) {
    this._subirArchivoServices.subirArchivo( archivo, 'usuarios', id)
        .then( (resp: any) => {
          this.usuario.img = resp.usuario.img;
          swal('Imagen de usuario actualizada', this.usuario.nombre, 'success');
          this.guardaStorage( id, this.token, this.usuario);
        })
        .catch( resp => {
          console.log(resp);
        });
  }

  cargarUsuarios( desde: number = 0) {
    let url = URL_SERVICIOS + '/usuario?desde=' + desde;
    return this.http.get( url);
  }

  buscarUsuario( termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
    return this.http.get(url)
                .pipe( map( (resp: any) => resp.usuarios) );
  }

  borrarUsuario( id: string) {
    let url = URL_SERVICIOS + '/usuario/' + id + '?token=' + this.token;
    return this.http.delete(url)
                .pipe( map( resp => {
                    swal('Usuario borrado', 'El usuario ha sido eliminado correctamente', 'success');
                    return true;
                 })
                );
  }
}
