import { Injectable } from '@angular/core';
import {catchError, Observable} from "rxjs";
import {ApiConstant} from "../constant/api-constant";
import {ExceptionUtil} from "../util/exception-util";
import {HttpDaoService} from "./http-dao.service";
import {AttendaceSaveRequest} from "../models/AttendaceSaveRequest";

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(private httpDaoService: HttpDaoService) { }

  saveAttendance(attendaceSaveRequest: AttendaceSaveRequest): Observable<any> {
    return this.httpDaoService.doPost(ApiConstant.API_SAVE_ATTENDANCE, attendaceSaveRequest).pipe(
      catchError(ExceptionUtil.handleError)
    );
  }

  getAttendanceForToday(): Observable<any> {
    return this.httpDaoService.doGet(ApiConstant.API_GET_ATTENDANCE_FOR_TODAY, {}).pipe(
      catchError(ExceptionUtil.handleError)
    );
  }
}
