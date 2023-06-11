import {Injectable} from '@angular/core';
import {ApiConstant} from "../constant/api-constant";
import {catchError, Observable} from "rxjs";
import {ExceptionUtil} from "../util/exception-util";
import {HttpDaoService} from "./http-dao.service";

@Injectable({
  providedIn: 'root'
})
export class AuthorizeService {

  constructor(private httpDaoService: HttpDaoService) {
  }

  public hasPermission(role: String): Observable<any> {
    return this.httpDaoService.doGet(ApiConstant.HAS_AUTHORIZE, {role}).pipe(
      catchError(ExceptionUtil.handleError)
    );
  }
}
