import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomHandleValidate} from "../../util/custom-handle-validate";
import {DateUtil} from "../../util/date-util";
import {validatorsToDateAfterFromDate} from "../../../../util/validators-from-to-date";
import {AttendanceService} from "../../services/attendance.service";
import {AttendanceForEmployeeRequest} from "../../models/AttendanceForEmployeeRequest";
import {DatePipe, formatDate} from "@angular/common";
import {ContentDialogService} from "../../../../components/content-dialog/content-dialog.service";
import * as _ from "underscore";

@Component({
  selector: 'app-attendance-detail',
  templateUrl: './attendance-detail.component.html',
  styleUrls: ['./attendance-detail.component.css']
})
export class AttendanceDetailComponent implements OnInit {

  public inputDateForm!: FormGroup;
  public customValidate!: CustomHandleValidate;
  public employeeList!: Array<any>;
  public attendanceList!: Array<any>;
  public fullname!: any;

  attendanceDetailsModalId = 'attendanceDetailsModalId';
  header = 'Chi tiết điểm danh';

  constructor(private formBuilder: FormBuilder,
              private attendanceService: AttendanceService,
              private contentDialogService: ContentDialogService) { }

  ngOnInit(): void {
    this.setInputDateForm();
  }

  setInputDateForm() {
    this.inputDateForm = this.formBuilder.group({
      dateFrom: ['', Validators.required],
      dateTo: ['', Validators.required]
    }, {
        validators: [
          validatorsToDateAfterFromDate('dateFrom', 'dateTo', 'YYYY-MM-DD')
        ]
    });
    this.customValidate = new CustomHandleValidate(this.inputDateForm);
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const dateFrom = DateUtil.formatDateToStrWithFormat(firstDayOfMonth, 'yyyy-MM-dd');
    const dateTo = DateUtil.formatDateToStrWithFormat(new Date(), 'yyyy-MM-dd');
    this.inputDateForm.patchValue({
      dateFrom: dateFrom,
      dateTo: dateTo
    });
    this.getAttendanceList(dateFrom, dateTo);
  }

  hasError(key: string, errorCode: string) {
    return this.customValidate.hasError(key, errorCode);
  }

  search() {
    if (!this.customValidate.isValidForm()) {
      return;
    }
    const dateFrom = this.inputDateForm.value.dateFrom;
    const dateTo = this.inputDateForm.value.dateTo;
    this.getAttendanceList(dateFrom, dateTo);
  }

  getAttendanceList(dateFrom: any, dateTo: any) {
    const dateFromString = dateFrom + ' 00:00:00';
    const dateToString = dateTo + ' 23:59:59';
    const format = 'yyyy-MM-dd HH:mm:ss';
    const attendanceForEmployeeRequest = new AttendanceForEmployeeRequest();
    attendanceForEmployeeRequest.dateFrom = new Date(formatDate(dateFromString, format, 'en-US'));
    attendanceForEmployeeRequest.dateTo = new Date(formatDate(dateToString, format, 'en-US'));
    this.attendanceService.getAttendanceForEmployee(attendanceForEmployeeRequest).subscribe(data => {
      if (data) {
        this.employeeList = data;
      }
    }, (error) => {

    });
  }

  getHoursTotal(attendanceDTOList: Array<any>) {
    let hourTotal = 0;
    if (attendanceDTOList != null && attendanceDTOList != undefined) {
      attendanceDTOList.forEach(item => {
        const hour = DateUtil.getHour(item.startDateTime, item.endDateTime);
        if (hour !== null) {
          hourTotal = hourTotal + hour;
        }
      });
    }
    return hourTotal;
  }

  showAttendanceDetails(employeeId: any, fullname: any) {
    this.fullname = fullname;
    this.employeeList.find(item => {
      if (item.employeeId == employeeId) {
        this.attendanceList = item.attendanceDTOList;
        return;
      }
    });
    this.contentDialogService.open(this.attendanceDetailsModalId);
  }

  exist() {
    this.contentDialogService.close(this.attendanceDetailsModalId);
  }

  getDateOrTime(dateTime: any, type: any) {
    let arrDt = [];
    if (!_.isEmpty(dateTime)) {
      arrDt = dateTime.split(' ');
      if (type == 'D') {
        const date = new Date(arrDt[0]);
        const datePipe = new DatePipe('en-US');
        const formattedDate = datePipe.transform(date, 'dd-MM-yyyy');
        return formattedDate;
      } else if (type == 'T') {
        return arrDt[1];
      }
    }
    return null;
  }

  getAttendanceHour(startDateTime: any, endDateTime: any) {
    return DateUtil.getHour(startDateTime, endDateTime);
  }

}
