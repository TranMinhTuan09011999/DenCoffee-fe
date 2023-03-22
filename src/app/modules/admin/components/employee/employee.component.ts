import { Component, OnInit } from '@angular/core';
import {EmployeeService} from "../../services/employee.service";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
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

}
