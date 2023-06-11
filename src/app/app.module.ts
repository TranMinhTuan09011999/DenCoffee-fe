import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AdminModule} from "./modules/admin/admin.module";
import {HttpInterceptorProviders} from "./interceptors/auth.interceptor";
import {NgxLoadingModule} from "ngx-loading";
import {NonAuthenticateModule} from "./modules/non-authenticate/non-authenticate.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    NonAuthenticateModule,
    NgxLoadingModule.forRoot({})
  ],
  providers: [HttpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
}
