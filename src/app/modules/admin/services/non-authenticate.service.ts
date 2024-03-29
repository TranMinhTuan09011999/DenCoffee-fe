import {Injectable} from '@angular/core';
import {catchError, Observable} from "rxjs";
import {ApiConstant} from "../constant/api-constant";
import {HttpDaoService} from "./http-dao.service";
import {ExceptionUtil} from "../util/exception-util";
import {JwtRequestDTO} from "../models/JwtRequestDTO";
import {ResponseLoginDTO} from "../models/ResponseLoginDTO";

@Injectable({
  providedIn: 'root'
})
export class NonAuthenticateService {

  constructor(private httpDaoService: HttpDaoService) {
  }

  login(jwtRequestDTO: JwtRequestDTO): Observable<ResponseLoginDTO> {
    return this.httpDaoService.doPost(ApiConstant.LOGIN, jwtRequestDTO).pipe(
      catchError(ExceptionUtil.handleError)
    );
  }

  checkToken(token: string) {
    return this.httpDaoService.doGet(ApiConstant.CHECK_TOKEN, {token}).pipe(
      catchError(ExceptionUtil.handleError)
    );
  }

  logout() {
    return this.httpDaoService.doGet(ApiConstant.LOGOUT).pipe(
      catchError(ExceptionUtil.handleError)
    );
  }
}
