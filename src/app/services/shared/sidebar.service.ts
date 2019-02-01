import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        {titulo: 'Dashboard', url: '/dashboard' },
        {titulo: 'Progress', url: '/progress' },
        {titulo: 'Graficas1', url: '/graficas1' },
        {titulo: 'Settings', url: '/accout-settings' },
        {titulo: 'Promesas', url: '/promesas' },
        {titulo: 'Rxjs', url: '/rxjs' }
      ]
    },
    {
      titulo: 'Mantenimientos',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        {titulo: 'Usuarios', url: '/usuarios' },
        {titulo: 'Medicos', url: '/medicos' },
        {titulo: 'Hospitales', url: '/Hospitales' }
      ]
    }

  ];

  constructor() { }
}
