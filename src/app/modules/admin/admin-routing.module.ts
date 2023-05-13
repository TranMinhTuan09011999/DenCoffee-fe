import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RouterConstant} from "./constant/router-constant";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {AttendanceComponent} from "./components/attendance/attendance.component";
import {EmployeeComponent} from "./components/employee/employee.component";
import {AdminComponent} from "./admin.component";
import {IpAddressComponent} from "./components/ip-address/ip-address.component";
import {AttendanceDetailComponent} from "./components/attendance-detail/attendance-detail.component";
import {SalaryManagementComponent} from "./components/salary-management/salary-management.component";
import {SalaryDetailComponent} from "./components/salary-detail/salary-detail.component";

const routes: Routes = [
  {
    path: RouterConstant.DEN_COFFEE.path,
    component: AdminComponent,
    children: [
      {
        path: RouterConstant.DASHBOARD.path,
        component: DashboardComponent
      },
      {
        path: RouterConstant.ATTENDANCE.path,
        component: AttendanceComponent
      },
      {
        path: RouterConstant.EMPLOYEE.path,
        component: EmployeeComponent
      },
      {
        path: RouterConstant.IP_ADDRESS.path,
        component: IpAddressComponent
      },
      {
        path: RouterConstant.ATTENDANCE_DETAIL.path,
        component: AttendanceDetailComponent
      },
      {
        path: RouterConstant.SALARY_MANAGEMENT.path,
        component: SalaryManagementComponent
      },
      {
        path: RouterConstant.SALARY_DETAIL.path,
        component: SalaryDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
