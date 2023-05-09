import { Injectable } from '@angular/core';
import {HttpDaoService} from "./http-dao.service";
import {catchError, Observable} from "rxjs";
import {ApiConstant} from "../constant/api-constant";
import {ExceptionUtil} from "../util/exception-util";

@Injectable({
  providedIn: 'root'
})
export class SalaryAdvanceService {

  constructor(private httpDaoService: HttpDaoService) { }

  saveSalaryAdvance(condition: any): Observable<any> {
    return this.httpDaoService.doPost(ApiConstant.API_SAVE_SALARY_ADVANCE, condition).pipe(
      catchError(ExceptionUtil.handleError)
    );
  }

  getSalaryAdvance(month: any, year: any, employeeId: any): Observable<any> {
    return this.httpDaoService.doGet(ApiConstant.API_GET_SALARY_ADVANCE, {employeeId, month, year}).pipe(
      catchError(ExceptionUtil.handleError)
    );
  }
}
