import { UsuariosComponent } from './usuarios/usuarios.component';
import { LoginGuardGuard } from '../services/service.index';
import { RxjsComponent } from './rxjs/rxjs.component';
import { NgModule } from '@angular/core';
import { PromesasComponent } from './promesas/promesas.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
   {
    path: '',
    component: PagesComponent,
    canActivate: [ LoginGuardGuard],
    children: [
       { path: 'dashboard', component: DashboardComponent, data: {titulo: 'Dashboard'} },
       { path: 'progress', component: ProgressComponent, data: {titulo: 'Progreso'} },
       { path: 'graficas1', component: Graficas1Component, data: {titulo: 'Graficas'} },
       { path: 'accout-settings', component: AccoutSettingsComponent, data: {titulo: 'Ajustes de tema'} },
       { path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas'} },
       { path: 'rxjs', component: RxjsComponent, data: {titulo: 'Observables'} },
       { path: 'perfil', component: ProfileComponent, data: {titulo: 'Perfil'} },
       // Mantenimiento
       { path: 'usuarios', component: UsuariosComponent, data: {titulo: 'Mantenimiento de usuarios'} },
       { path: '', redirectTo: '/dashboard', pathMatch: 'full'}
    ]
   }
];

export const PAGES_ROUTES = RouterModule.forChild( routes );
