import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {RouterConstant} from "../../constant/router-constant";
import {AuthorizeService} from "../../services/authorize.service";
import {Role} from "../../constant/role.enum";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public hasAdminRole: any;
  public hasUserRole: any;

  constructor(private router: Router,
              private authorizeService: AuthorizeService) {
  }

  async ngOnInit() {
    this.hasAdminRole = await this.authorizeService.hasPermission(Role.ADMIN).toPromise();
    this.hasUserRole = await this.authorizeService.hasPermission(Role.USER).toPromise();
  }

  toDashboardPage() {
    this.router.navigate([RouterConstant.DEN_COFFEE.path, RouterConstant.DASHBOARD.path]).then();
  }

  toAttendancePage() {
    this.router.navigate([RouterConstant.DEN_COFFEE.path, RouterConstant.ATTENDANCE.path]).then();
  }

  toEmployeePage() {
    this.router.navigate([RouterConstant.DEN_COFFEE.path, RouterConstant.EMPLOYEE.path]).then();
  }

  toAttendanceDetailPage() {
    this.router.navigate([RouterConstant.DEN_COFFEE.path, RouterConstant.ATTENDANCE_DETAIL.path]).then();
  }

  toSalaryManagementPage() {
    this.router.navigate([RouterConstant.DEN_COFFEE.path, RouterConstant.SALARY_MANAGEMENT.path]).then();
  }

  toSalaryDetailPage() {
    this.router.navigate([RouterConstant.DEN_COFFEE.path, RouterConstant.SALARY_DETAIL.path]).then();
  }

}
