import { Injectable } from '@angular/core';
import {catchError, Observable} from "rxjs";
import {ApiConstant} from "../constant/api-constant";
import {ExceptionUtil} from "../util/exception-util";
import {HttpDaoService} from "./http-dao.service";

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor(private httpDaoService: HttpDaoService) { }

  getAllPosition(): Observable<any> {
    return this.httpDaoService.doGet(ApiConstant.API_GET_ALL_POSITION, {}).pipe(
      catchError(ExceptionUtil.handleError)
    );
  }

}
