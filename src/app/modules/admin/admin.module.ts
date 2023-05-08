import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { EmployeeComponent } from './components/employee/employee.component';
import {SharedModule} from '../shared/shared.module';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NullHyphenPipe} from "./pipe/null-hyphen.pipe";
import {NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";
import { AttendanceManagementComponent } from './components/attendance-management/attendance-management.component';
import { IpAddressComponent } from './components/ip-address/ip-address.component';
import { AttendanceDetailComponent } from './components/attendance-detail/attendance-detail.component';
import { SalaryManagementComponent } from './components/salary-management/salary-management.component';
import {AddCommaPipe} from "./pipe/add-comma-pipe";
import { AddCommaDirective } from './directive/add-comma.directive';
import { SalaryDetailComponent } from './components/salary-detail/salary-detail.component';

@NgModule({
    declarations: [
        AdminComponent,
        HeaderComponent,
        FooterComponent,
        SidebarComponent,
        DashboardComponent,
        AttendanceComponent,
        EmployeeComponent,
        NullHyphenPipe,
        AttendanceManagementComponent,
        IpAddressComponent,
        AttendanceDetailComponent,
        SalaryManagementComponent,
        AddCommaPipe,
        AddCommaDirective,
        SalaryDetailComponent
    ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [AddCommaPipe]
})
export class AdminModule { }
