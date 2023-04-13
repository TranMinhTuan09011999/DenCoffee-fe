import { Injectable } from '@angular/core';
import {catchError, Observable} from "rxjs";
import {ApiConstant} from "../constant/api-constant";
import {ExceptionUtil} from "../util/exception-util";
import {HttpDaoService} from "./http-dao.service";
import {AttendaceSaveRequest} from "../models/AttendaceSaveRequest";
import {AttendanceEndDateTimeUpdate} from "../models/AttendanceEndDateTimeUpdate";
import {DateRequest} from "../models/DateRequest";
import {AttendanceForEmployeeRequest} from "../models/AttendanceForEmployeeRequest";

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

  getAttendanceForToday(dateRequest: DateRequest): Observable<any> {
    return this.httpDaoService.doPost(ApiConstant.API_GET_ATTENDANCE_FOR_TODAY, dateRequest).pipe(
      catchError(ExceptionUtil.handleError)
    );
  }

  getAdminAttendanceForToday(dateRequest: DateRequest): Observable<any> {
    return this.httpDaoService.doPost(ApiConstant.API_GET_ADMIN_ATTENDANCE_FOR_TODAY, dateRequest).pipe(
      catchError(ExceptionUtil.handleError)
    );
  }

  updateAttendanceForEndTimeDate(attendanceEndDateTimeUpdate: AttendanceEndDateTimeUpdate): Observable<any> {
    return this.httpDaoService.doPost(ApiConstant.API_UPDATE_END_TIME_DATE, attendanceEndDateTimeUpdate).pipe(
      catchError(ExceptionUtil.handleError)
    );
  }

  getAttendanceForEmployee(attendanceForEmployeeRequest: AttendanceForEmployeeRequest): Observable<any> {
    return this.httpDaoService.doPost(ApiConstant.API_GET_ATTENDANCE_FOR_EMPLOYEE, attendanceForEmployeeRequest).pipe(
      catchError(ExceptionUtil.handleError)
    );
  }
}
