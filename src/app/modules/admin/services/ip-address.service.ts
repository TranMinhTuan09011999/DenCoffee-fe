import { Injectable } from '@angular/core';
import {catchError, Observable} from "rxjs";
import {ApiConstant} from "../constant/api-constant";
import {ExceptionUtil} from "../util/exception-util";
import {IpAddressRequest} from "../models/IpAddressRequest";
import {HttpDaoService} from "./http-dao.service";
import {IpAddress} from "../models/IpAddress";

@Injectable({
  providedIn: 'root'
})
export class IpAddressService {

  constructor(private httpDaoService: HttpDaoService) { }

  registerIpAddress(ipAddressRequest: IpAddressRequest): Observable<any> {
    return this.httpDaoService.doPost(ApiConstant.API_REGISTER_IP_ADDRESS, ipAddressRequest).pipe(
      catchError(ExceptionUtil.handleError)
    );
  }

  getAllIpAddress(): Observable<any> {
    return this.httpDaoService.doGet(ApiConstant.API_GET_IP_ADDRESS).pipe(
      catchError(ExceptionUtil.handleError)
    );
  }

  updateIpAddress(ipAddress: IpAddress): Observable<any> {
    return this.httpDaoService.doPost(ApiConstant.API_UPDATE_IP_ADDRESS, ipAddress).pipe(
      catchError(ExceptionUtil.handleError)
    );
  }

  checkExistIpAddress(ipAddress: string): Observable<any> {
    return this.httpDaoService.doGet(ApiConstant.API_CHECK_EXIST_IP_ADDRESS, {ipAddress}).pipe(
      catchError(ExceptionUtil.handleError)
    );
  }

  deleteIpAddress(ipAddress: IpAddress): Observable<any> {
    return this.httpDaoService.doPost(ApiConstant.API_DELETE_IP_ADDRESS, ipAddress).pipe(
      catchError(ExceptionUtil.handleError)
    );
  }

}
