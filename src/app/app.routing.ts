/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//Components
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LandingComponent } from './landing/landing.component';
import { ComprobanteComponent } from './comprobante/comprobante.component';
import { TransaccionesComponent } from './transacciones/transacciones.component';
import { ConfirmacionComponent } from './confirmacion/confirmacion.component';

export const ROUTES: Routes = [
  // { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  // { path: 'register', component: RegisterComponent },
  { path: 'landing', component: LandingComponent },
  { path: 'comprobante', component: ComprobanteComponent },
  { path: 'transacciones', component: TransaccionesComponent },
  { path: 'confirmacion', component: ConfirmacionComponent },
];

export const ROUTING: ModuleWithProviders<any> = RouterModule.forRoot(ROUTES);
