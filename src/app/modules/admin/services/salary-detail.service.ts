import { Injectable } from '@angular/core';
import {HttpDaoService} from "./http-dao.service";
import {catchError, Observable} from "rxjs";
import {ApiConstant} from "../constant/api-constant";
import {ExceptionUtil} from "../util/exception-util";

@Injectable({
  providedIn: 'root'
})
export class SalaryDetailService {

  constructor(private httpDaoService: HttpDaoService) { }

  getAllCurrentSalaryDetail(): Observable<any> {
    return this.httpDaoService.doGet(ApiConstant.API_GET_ALL_CURRENT_SALARY_DETAIL,{}).pipe(
      catchError(ExceptionUtil.handleError)
    );
  }

  updateCurrentSalaryDetail(updateInfor: any): Observable<any> {
    return this.httpDaoService.doPost(ApiConstant.API_UPDATE_CURRENT_SALARY_DETAIL, updateInfor).pipe(
      catchError(ExceptionUtil.handleError)
    );
  }

}
