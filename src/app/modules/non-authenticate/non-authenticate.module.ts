import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NonAuthenticateRoutingModule} from './non-authenticate-routing.module';
import {LoginComponent} from './components/login/login.component';
import {NonAuthenticateComponent} from "./non-authenticate.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    LoginComponent,
    NonAuthenticateComponent
  ],
  imports: [
    CommonModule,
    NonAuthenticateRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class NonAuthenticateModule {
}
