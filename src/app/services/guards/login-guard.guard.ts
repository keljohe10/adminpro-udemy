import { UsuarioService } from '../usuario/usuario.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor(public _usuarioService: UsuarioService,
              public _router: Router) { }

  canActivate() {
    if (this._usuarioService.estaLogeado()) {
      return true;
    } else {
      console.log('BLOQUEADO POR EL GUARD!!!');
      this._router.navigate(['/login']);
      return false;
    }
  }
}
