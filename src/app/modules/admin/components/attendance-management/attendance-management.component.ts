import { Component, OnInit } from '@angular/core';
import {DateUtil} from "../../util/date-util";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomHandleValidate} from "../../util/custom-handle-validate";
import {AttendanceService} from "../../services/attendance.service";
import {DateRequest} from "../../models/DateRequest";
import * as _ from "underscore";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-attendance-management',
  templateUrl: './attendance-management.component.html',
  styleUrls: ['./attendance-management.component.css']
})
export class AttendanceManagementComponent implements OnInit {

  public inputDateForm!: FormGroup;
  public customValidate!: CustomHandleValidate;
  attendanceList!: Array<any>;

  constructor(private formBuilder: FormBuilder,
              private attendanceService: AttendanceService) { }

  ngOnInit(): void {
    this.getInputNameForm();
    this.getAttendanceForDate(new Date());
  }

  getInputNameForm() {
    this.inputDateForm = this.formBuilder.group({
      attendanceDate: ['', Validators.required]
    });
    this.customValidate = new CustomHandleValidate(this.inputDateForm);
    this.inputDateForm.patchValue({
      attendanceDate: DateUtil.formatDateToStrWithFormat(new Date(), 'yyyy-MM-dd')
    });
  }

  getAttendanceForDate(date: any) {
    const dateRequest = new DateRequest();
    dateRequest.date = date;
    this.attendanceService.getAdminAttendanceForToday(dateRequest).subscribe(data => {
      if (data) {
        this.attendanceList = data;
      }
    }, (error) => {

    })
  }

  search() {
    if (!this.customValidate.isValidForm()) {
      return;
    }
    var date = new Date(this.inputDateForm.value.attendanceDate);
    this.getAttendanceForDate(date);
  }

  getAttendanceHour(startDateTime: any, endDateTime: any) {
    return DateUtil.getHour(startDateTime, endDateTime);
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

}
