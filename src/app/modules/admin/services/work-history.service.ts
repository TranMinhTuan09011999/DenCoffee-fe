import { Injectable } from '@angular/core';
import {catchError, Observable} from "rxjs";
import {ApiConstant} from "../constant/api-constant";
import {ExceptionUtil} from "../util/exception-util";
import {HttpDaoService} from "./http-dao.service";

@Injectable({
  providedIn: 'root'
})
export class WorkHistoryService {

  constructor(private httpDaoService: HttpDaoService) { }

  getWorkHistoryByEmployeeId(employeeId: number): Observable<any> {
    return this.httpDaoService.doGet(ApiConstant.API_GET_WORK_HISTORY_BY_EMPLOYEE_ID, {employeeId}).pipe(
      catchError(ExceptionUtil.handleError)
    );
  }
}
