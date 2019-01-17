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

constructor(public http: HttpClient, public _router: Router) {
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
}
