import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {RouterConstant} from "../../constant/router-constant";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
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

}
