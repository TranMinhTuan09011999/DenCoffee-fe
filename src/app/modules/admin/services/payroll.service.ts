import { Injectable } from '@angular/core';
import {HttpDaoService} from "./http-dao.service";
import {catchError, Observable} from "rxjs";
import {ApiConstant} from "../constant/api-constant";
import {ExceptionUtil} from "../util/exception-util";

@Injectable({
  providedIn: 'root'
})
export class PayrollService {

  constructor(private httpDaoService: HttpDaoService) { }

  getPayrollForMonthYear(month: number, year: number): Observable<any> {
    return this.httpDaoService.doGet(ApiConstant.API_GET_PAYROLL_FOR_MONTH_YEAR, {month, year}).pipe(
      catchError(ExceptionUtil.handleError)
    );
  }

  getAllCurrentPayroll(): Observable<any> {
    return this.httpDaoService.doGet(ApiConstant.API_GET_ALL_CURRENT_PAYROLL,{}).pipe(
      catchError(ExceptionUtil.handleError)
    );
  }

  updateCurrentPayroll(updateInfor: any): Observable<any> {
    return this.httpDaoService.doPost(ApiConstant.API_UPDATE_CURRENT_PAYROLL, updateInfor).pipe(
      catchError(ExceptionUtil.handleError)
    );
  }
}
