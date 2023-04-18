import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RouterConstant} from "./constant/router-constant";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {AttendanceComponent} from "./components/attendance/attendance.component";
import {EmployeeComponent} from "./components/employee/employee.component";
import {AdminComponent} from "./admin.component";
import {AttendanceManagementComponent} from "./components/attendance-management/attendance-management.component";
import {IpAddressComponent} from "./components/ip-address/ip-address.component";
import {AttendanceDetailComponent} from "./components/attendance-detail/attendance-detail.component";
import {SalaryManagementComponent} from "./components/salary-management/salary-management.component";

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
        path: RouterConstant.ATTENDANCE_MANAGEMENT.path,
        component: AttendanceManagementComponent
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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
