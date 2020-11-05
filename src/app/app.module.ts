import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/security/login/login.component';
import { ListComponent } from './component/user/list/list.component';
import { MenuComponent } from './component/core/menu/menu.component';
import { RegisterComponent } from './component/user/register/register.component';
import { UpdatePasswordComponent } from './component/user/update-password/update-password.component';
import { CarouselComponent } from './component/core/carousel/carousel.component';
import { FooterComponent } from './component/core/footer/footer.component';
import { HeaderComponent } from './component/core/header/header.component';
import { NavbarComponent } from './component/core/navbar/navbar.component';
import { PagenotfoundComponent } from './component/core/pagenotfound/pagenotfound.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShowdeparturesComponent } from './component/departures/showdepartures/showdepartures.component';
import { ShowdishwashingComponent } from './component/dishwashing/showdishwashing/showdishwashing.component';
import { BookwashingmachineComponent } from './component/washingmachine/bookwashingmachine/bookwashingmachine.component';
import { ManagespacesComponent } from './component/spaces/managespaces/managespaces.component';
import { ProfileComponent } from './component/user/profile/profile.component';
import { UpdateComponent } from './component/user/update/update.component';
import { ShowcourseComponent } from './component/course/showcourse/showcourse.component';
import { LaborComponent } from './component/labor/labor.component';
import { ReservationComponent } from './component/reservation/reservation.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListComponent,
    MenuComponent,
    RegisterComponent,
    UpdatePasswordComponent,
    CarouselComponent,
    FooterComponent,
    HeaderComponent,
    NavbarComponent,
    PagenotfoundComponent,
    ShowdeparturesComponent,
    ShowdishwashingComponent,
    BookwashingmachineComponent,
    ManagespacesComponent,
    ProfileComponent,
    UpdateComponent,
    ShowcourseComponent,
    LaborComponent,
    ReservationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
