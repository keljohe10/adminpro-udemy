import { Usuario } from '../models/usuario.model';
import { UsuarioService } from '../services/service.index';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

email: string;
recuerdame = false;
auth2: any;

  constructor(public _router: Router,
              public _usuarioService: UsuarioService) { }

  ngOnInit() {

    init_plugins();
    this.googleInit();

    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 1) {
        this.recuerdame = true;
    }
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '825694138261-lf7618b4gvqrsjrgmjovus3alng9s2f1.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSingin( document.getElementById('btnGoogle'));
    });
  }

  attachSingin(element) {
    this.auth2.attachClickHandler( element, {}, (googleUser) => {
      // let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;
      this._usuarioService.loginGoogle(token)
            .subscribe( (resp) => window.location.href = '#/dashboard' );
    });
  }

  Ingresar(forma: NgForm) {

    if (forma.invalid) {
      return;
    }
    let usuario = new Usuario(null, forma.value.email, forma.value.password);

    this._usuarioService.login(usuario, forma.value.recuerdame)
                .subscribe( resp => this._router.navigate(['/dashboard']) );

  }

}
