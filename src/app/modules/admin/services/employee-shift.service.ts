import {Injectable} from '@angular/core';
import {catchError, Observable} from "rxjs";
import {ApiConstant} from "../constant/api-constant";
import {ExceptionUtil} from "../util/exception-util";
import {HttpDaoService} from "./http-dao.service";

@Injectable({
  providedIn: 'root'
})
export class EmployeeShiftService {

  constructor(private httpDaoService: HttpDaoService) {
  }

  getEmployeeShiftByCurrentTime(): Observable<any> {
    return this.httpDaoService.doGet(ApiConstant.API_GET_EMPLOYEE_SHIFT_CURRENT_TIME, {}).pipe(
      catchError(ExceptionUtil.handleError)
    );
  }

}
