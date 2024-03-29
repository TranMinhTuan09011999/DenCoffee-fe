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

  updateBonusPayroll(payrollId: number, bonus: number): Observable<any> {
    return this.httpDaoService.doPost(ApiConstant.API_UPDATE_BONUS_PAYROLL, {}, {payrollId, bonus}).pipe(
      catchError(ExceptionUtil.handleError)
    );
  }
}
