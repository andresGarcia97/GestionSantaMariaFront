import { LaborComponent } from './component/labor/labor.component';
import { ShowcourseComponent } from './component/course/showcourse/showcourse.component';
import { ShowdeparturesComponent } from './component/departures/showdepartures/showdepartures.component';
import { GuardGuard } from './services/guard/guard.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UpdatePasswordComponent } from './component/user/update-password/update-password.component';
import { MenuComponent } from './component/core/menu/menu.component';
import { LoginComponent } from './component/security/login/login.component';
import { RegisterComponent } from './component/user/register/register.component';
import { ListComponent } from './component/user/list/list.component';
import { PagenotfoundComponent } from './component/core/pagenotfound/pagenotfound.component';
import { ShowdishwashingComponent } from './component/dishwashing/showdishwashing/showdishwashing.component';
import { BookwashingmachineComponent } from './component/washingmachine/bookwashingmachine/bookwashingmachine.component';
import { ManagespacesComponent } from './component/spaces/managespaces/managespaces.component';
import { ProfileComponent } from './component/user/profile/profile.component';


const routes: Routes = [
  { path: 'actualizarcontrasena', component: UpdatePasswordComponent, canActivate: [GuardGuard]},
  { path: 'menu', component: MenuComponent, canActivate: [GuardGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'registrousuario', component: RegisterComponent, canActivate: [GuardGuard]},
  { path: 'listarusuarios', component: ListComponent, canActivate: [GuardGuard]},
  { path: 'labor', component: LaborComponent, canActivate: [GuardGuard]},
  { path: 'mostrarplanilla', component: ShowdeparturesComponent, canActivate: [GuardGuard]},
  { path: 'mostrarmaterias', component: ShowcourseComponent, canActivate: [GuardGuard]},
  { path: 'lavado_loza', component: ShowdishwashingComponent, canActivate: [GuardGuard]},
  { path: 'reservas_lavadora', component: BookwashingmachineComponent, canActivate: [GuardGuard]},
  { path: 'espacios', component: ManagespacesComponent, canActivate: [GuardGuard]},
  { path: 'perfil', component: ProfileComponent, canActivate: [GuardGuard]},
  { path: '', redirectTo: '', pathMatch: 'full'},
  { path: '**', component: PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
