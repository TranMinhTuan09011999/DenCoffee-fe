import { Injectable } from '@angular/core';
import {JwtRequestDTO} from "../models/JwtRequestDTO";
import {catchError, Observable} from "rxjs";
import {ApiConstant} from "../constant/api-constant";
import {ExceptionUtil} from "../util/exception-util";
import {HttpDaoService} from "./http-dao.service";

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
}