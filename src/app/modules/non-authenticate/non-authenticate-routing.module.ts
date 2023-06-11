import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RouterConstant} from "../admin/constant/router-constant";
import {NonAuthenticateComponent} from "./non-authenticate.component";
import {LoginComponent} from "./components/login/login.component";

const routes: Routes = [
  {
    path: RouterConstant.DEN_COFFEE.path,
    component: NonAuthenticateComponent,
    children: [
      {
        path: RouterConstant.LOGIN.path,
        component: LoginComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NonAuthenticateRoutingModule {
}
