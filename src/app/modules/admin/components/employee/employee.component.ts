import { Component, OnInit } from '@angular/core';
import {EmployeeService} from "../../services/employee.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  items: any[] = [];
  pageOfItems?: Array<any>;
  sortProperty: string = 'id';
  sortOrder = 1;
  loading = false;

  constructor(private employeeService: EmployeeService, private http: HttpClient) { }

  ngOnInit(): void {
    this.loading = true;
    this.employeeService.getAllEmployee().subscribe(data => {
      if (data) {
        console.log(data);
        this.items = data;
        this.loading = false;
      }
    }, (error) => {

    });
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

  addEmployee() {
    const username = 'minhtuan123';
    this.employeeService.getEmployeeByUsername(username).subscribe(data => {
      if (data) {
        console.log(data);
      }
    }, (error) => {

    });
  }

  setGender(status: number) {
    return status == 1 ? 'Nam' : 'Nữ';
  }

  setStatus(status: number) {
    return status == 1 ? 'Đang làm' : 'Đã nghỉ';
  }

  setBirthday() {

  }

}
