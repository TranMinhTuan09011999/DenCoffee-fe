import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RouterConstant} from "./constant/router-constant";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {AttendanceComponent} from "./components/attendance/attendance.component";
import {EmployeeComponent} from "./components/employee/employee.component";
import {AdminComponent} from "./admin.component";
import {AttendanceManagementComponent} from "./components/attendance-management/attendance-management.component";

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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
