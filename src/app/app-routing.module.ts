import { AdminguardGuard } from './services/guard/adminguard.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LicencesComponent } from './component/core/licences/licences.component';
import { MenuComponent } from './component/core/menu/menu.component';
import { PagenotfoundComponent } from './component/core/pagenotfound/pagenotfound.component';
import { ShowcourseComponent } from './component/course/showcourse/showcourse.component';
import { ShowdeparturesComponent } from './component/departures/showdepartures/showdepartures.component';
import { ShowdishwashingComponent } from './component/dishwashing/showdishwashing/showdishwashing.component';
import { LaborComponent } from './component/labor/labor.component';
import { LoginComponent } from './component/security/login/login.component';
import { ManagespacesComponent } from './component/spaces/managespaces/managespaces.component';
import { ListComponent } from './component/user/list/list.component';
import { ProfileComponent } from './component/user/profile/profile.component';
import { RegisterComponent } from './component/user/register/register.component';
import { UpdatePasswordComponent } from './component/user/update-password/update-password.component';
import { BookwashingmachineComponent } from './component/washingmachine/bookwashingmachine/bookwashingmachine.component';
import { GuardGuard } from './services/guard/guard.guard';
import { ListFirmComponent } from './component/user/list-firm/list-firm.component';

const routes: Routes = [
  { path: 'listarfirmas', component: ListFirmComponent, canActivate: [GuardGuard, AdminguardGuard] },
  { path: 'licenses', component: LicencesComponent },
  { path: 'actualizarcontrasena', component: UpdatePasswordComponent, canActivate: [GuardGuard] },
  { path: 'menu', component: MenuComponent, canActivate: [GuardGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'registrousuario', component: RegisterComponent, canActivate: [GuardGuard, AdminguardGuard] },
  { path: 'listarusuarios', component: ListComponent, canActivate: [GuardGuard, AdminguardGuard] },
  { path: 'labor', component: LaborComponent, canActivate: [GuardGuard] },
  { path: 'mostrarplanilla', component: ShowdeparturesComponent, canActivate: [GuardGuard] },
  { path: 'mostrarmaterias', component: ShowcourseComponent, canActivate: [GuardGuard] },
  { path: 'lavado_loza', component: ShowdishwashingComponent, canActivate: [GuardGuard] },
  { path: 'reservas_lavadora', component: BookwashingmachineComponent, canActivate: [GuardGuard] },
  { path: 'espacios', component: ManagespacesComponent, canActivate: [GuardGuard] },
  { path: 'perfil', component: ProfileComponent, canActivate: [GuardGuard] },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
