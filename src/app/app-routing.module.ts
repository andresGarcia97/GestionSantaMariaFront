import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UpdatePasswordComponent } from './component/user/update-password/update-password.component';
import { MenuComponent } from './component/user/menu/menu.component';
import { LoginComponent } from './component/security/login/login.component';
import { RegisterComponent } from './component/user/register/register.component';
import { ListComponent } from './component/user/list/list.component';
import { PagenotfoundComponent } from './component/core/pagenotfound/pagenotfound.component';


const routes: Routes = [
  { path: 'actualizarcontrasena', component: UpdatePasswordComponent},
  { path: 'menu', component: MenuComponent},
  { path: 'login', component: LoginComponent},
  { path: 'registrousuario', component: RegisterComponent},
  { path: 'listarusuarios', component: ListComponent},
  { path: '', redirectTo: '', pathMatch: 'full'},
  { path: '**', component: PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
