import { Routes } from '@angular/router';

import { Layout } from './layout/layout';
import { Home } from './features/eventos/home/home';
import { Detalle } from './features/eventos/detalle/detalle';
import { Favoritos } from './features/usuario/favoritos/favoritos';
import { Reservas } from './features/usuario/reservas/reservas';
import { Perfil } from './features/usuario/perfil/perfil';
import { Admin } from './features/admin/admin';
import { Contacto } from './features/contacto/contacto';

import { authGuard } from './core/guards/auth.guards';
import { adminGuard } from './core/guards/admin.guards';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '', component: Home },
      { path: 'eventos/:id', component: Detalle },

      //si quieres que favoritos/reservas requieran login:
      { path: 'favoritos', component: Favoritos, canActivate: [authGuard] },
      { path: 'reservas', component: Reservas, canActivate: [authGuard] },

      { path: 'perfil', component: Perfil },

      //panel admin protegido por rol admin
      { path: 'admin', component: Admin, canActivate: [adminGuard] },
      //pagina contacto
      { path: 'contacto', component: Contacto},
    ],
  },
  { path: '**', redirectTo: '' },
];