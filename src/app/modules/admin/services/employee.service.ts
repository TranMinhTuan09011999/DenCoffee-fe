import { Injectable } from '@angular/core';
import {catchError, Observable} from "rxjs";
import {ApiConstant} from "../constant/api-constant";
import {ExceptionUtil} from "../util/exception-util";
import {HttpDaoService} from "./http-dao.service";
import {Employee} from "../models/Employee";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpDaoService: HttpDaoService) { }

  getEmployeeByUsername(username: string): Observable<any> {
    return this.httpDaoService.doGet(ApiConstant.API_GET_EMPLOYEE, {username}).pipe(
      catchError(ExceptionUtil.handleError)
    );
  }

  getAllEmployeeByStatus(status: number): Observable<any> {
    return this.httpDaoService.doGet(ApiConstant.API_GET_ALL_EMPLOYEE_BY_STATUS, {status}).pipe(
      catchError(ExceptionUtil.handleError)
    );
  }

  registerEmployee(employee: Employee): Observable<any> {
    return this.httpDaoService.doPost(ApiConstant.API_REGISTER_EMPLOYEE, employee).pipe(
      catchError(ExceptionUtil.handleError)
    );
  }

  updateStatusForEmployee(employeeId: number, status: number): Observable<any> {
    return this.httpDaoService.doPost(ApiConstant.API_UPDATE_STATUS_FOR_EMPLOYEE_ID, {},{employeeId, status}).pipe(
      catchError(ExceptionUtil.handleError)
    );
  }

  updateEmployee(employee: Employee): Observable<any> {
    return this.httpDaoService.doPost(ApiConstant.API_UPDATE_EMPLOYEE, employee).pipe(
      catchError(ExceptionUtil.handleError)
    );
  }

  getAllEmployeeNameByStatus(status: number): Observable<any> {
    return this.httpDaoService.doGet(ApiConstant.API_GET_ALL_EMPLOYEE_NAME_BY_STATUS, {status}).pipe(
      catchError(ExceptionUtil.handleError)
    );
  }
}
