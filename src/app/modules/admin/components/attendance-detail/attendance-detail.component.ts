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
import {EmployeeService} from "../../services/employee.service";
import * as $ from "jquery";
import {AttendaceSaveRequest} from "../../models/AttendaceSaveRequest";

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
  public employeeId!: any;
  public editAttendanceId!: any;
  private dateFrom!: any;
  private dateTo!: any;
  private showAttendanceDetail = false;

  nameList!: Array<any>;
  public dropdownSingleSettings = {
    singleSelection: true,
    allowSearchFilter: true,
    idField: 'employeeId',
    textField: 'fullname',
    searchPlaceholderText: 'Tìm kiếm',
    itemsShowLimit: 1
  };

  attendanceDetailsModalId = 'attendanceDetailsModalId';
  addAttendanceModalId = 'addAttendanceModalId';
  editAttendanceModalId = 'editAttendanceModalId';
  header = 'Chi tiết điểm danh';
  addAttendanceHeader = 'Thêm điểm danh';
  editAttendanceHeader = 'Sửa điểm danh';

  public addAttendanceForm!: FormGroup;
  public addAttendanceCustomValidate!: CustomHandleValidate;

  public editAttendanceForm!: FormGroup;
  public editAttendanceCustomValidate!: CustomHandleValidate;

  constructor(private formBuilder: FormBuilder,
              private attendanceService: AttendanceService,
              private contentDialogService: ContentDialogService,
              private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.setInputDateForm();
    this.setAddAttendanceForm();
    this.setEditAttendanceForm();
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
    this.dateFrom = DateUtil.formatDateToStrWithFormat(firstDayOfMonth, 'yyyy-MM-dd');
    this.dateTo = DateUtil.formatDateToStrWithFormat(new Date(), 'yyyy-MM-dd');
    this.inputDateForm.patchValue({
      dateFrom: this.dateFrom,
      dateTo: this.dateTo
    });
    this.getAttendanceList(this.dateFrom, this.dateTo);
  }

  setAddAttendanceForm() {
    this.addAttendanceForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required]
    }, {
      validators: [
        validatorsToDateAfterFromDate('startTime', 'endTime', 'YYYY-MM-DDTHH:mm')
      ]
    });
    this.addAttendanceCustomValidate = new CustomHandleValidate(this.addAttendanceForm);
  }

  setEditAttendanceForm() {
    this.editAttendanceForm = this.formBuilder.group({
      startTime: [null, Validators.required],
      endTime: [null, Validators.required]
    }, {
      validators: [
        validatorsToDateAfterFromDate('startTime', 'endTime', 'YYYY-MM-DDTHH:mm')
      ]
    });
    this.editAttendanceCustomValidate = new CustomHandleValidate(this.editAttendanceForm);
  }

  hasError(key: string, errorCode: string) {
    return this.customValidate.hasError(key, errorCode);
  }

  hasAddAttendanceError(key: string, errorCode: string) {
    return this.addAttendanceCustomValidate.hasError(key, errorCode);
  }

  hasEditAttendanceError(key: string, errorCode: string) {
    return this.editAttendanceCustomValidate.hasError(key, errorCode);
  }

  search() {
    this.dateFrom = this.inputDateForm.value.dateFrom;
    this.dateTo = this.inputDateForm.value.dateTo;
    if (this.dateFrom == '') {
      this.inputDateForm.controls['dateFrom'].setErrors({required: true});
    }
    if (this.dateTo == '') {
      this.inputDateForm.controls['dateTo'].setErrors({required: true});
    }
    if (!this.customValidate.isValidForm()) {
      return;
    }
    this.getAttendanceList(this.dateFrom, this.dateTo);
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
        if (this.showAttendanceDetail) {
          this.showAttendanceDetails(this.employeeId, this.fullname);
          this.showAttendanceDetail = false;
        }
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
    this.employeeId = employeeId;
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

  showAddAttendaceModal() {
    this.getNameList();
    this.addAttendanceForm.patchValue({
      fullname: null,
      startTime: null,
      endTime: null
    });
    this.addAttendanceCustomValidate.reset();
    this.contentDialogService.open(this.addAttendanceModalId);
  }

  getNameList() {
    this.employeeService.getAllEmployeeNameByStatus(1).subscribe(data => {
      if (data) {
        this.nameList = data;
      }
    }, (error) => {

    });
  }

  onSelectEmpoyeeName($event: any) {
    $(".dropdown-multiselect__caret").trigger('click');
  }

  addAttendance() {
    if (!this.addAttendanceCustomValidate.isValidForm()) {
      return;
    }

    const attendaceSaveRequest = new AttendaceSaveRequest;

    const format = 'yyyy-MM-ddTHH:mm'

    let actualStartDateTime = new Date(formatDate(this.addAttendanceForm.value.startTime, format, 'en-US'));

    let startDateTime = new Date(formatDate(this.addAttendanceForm.value.startTime, format, 'en-US'));
    if (actualStartDateTime.getMinutes() < 10) {
      startDateTime.setHours(actualStartDateTime.getHours(), 0, 0);
    }

    let endDateTime = new Date(formatDate(this.addAttendanceForm.value.endTime, format, 'en-US'));

    if (this.addAttendanceForm.value.fullname && this.addAttendanceForm.value.fullname.length > 0) {
      attendaceSaveRequest.employeeId = this.addAttendanceForm.value.fullname[0].employeeId;
      attendaceSaveRequest.startDateTime = startDateTime;
      attendaceSaveRequest.actualStartDateTime = actualStartDateTime;
      attendaceSaveRequest.endDateTime = endDateTime;
    }
    this.attendanceService.saveAttendance(attendaceSaveRequest).subscribe(data => {
      if (data) {
        this.contentDialogService.close(this.addAttendanceModalId);
        this.getAttendanceList(this.dateFrom, this.dateTo);
      }
    }, (error) => {

    });

  }

  showButton(index: any) {
    $(`.btn-edit-${index}`).removeClass(`btn-display`);
  }

  hiddenButton(index: any) {
    $(`.btn-edit-${index}`).addClass(`btn-display`);
  }

  showEditModal(item: any) {
    this.editAttendanceId = item.attendanceId;
    this.contentDialogService.close(this.attendanceDetailsModalId);
    this.contentDialogService.open(this.editAttendanceModalId);
    this.setEditAttendanceForm();
    const format = 'yyyy-MM-ddTHH:mm'
    this.editAttendanceForm.patchValue({
      startTime: DateUtil.formatDateToStrWithFormat(item.actualStartDateTime, format),
      endTime: DateUtil.formatDateToStrWithFormat(item.endDateTime, format)
    })
  }

  editAttendance() {
    if (!this.editAttendanceCustomValidate.isValidForm()) {
      return;
    }

    const format = 'yyyy-MM-ddTHH:mm'
    let actualStartDateTime = new Date(formatDate(this.editAttendanceForm.value.startTime, format, 'en-US'));

    let startDateTime = new Date(formatDate(this.editAttendanceForm.value.startTime, format, 'en-US'));
    if (actualStartDateTime.getMinutes() < 10) {
      startDateTime.setHours(actualStartDateTime.getHours(), 0, 0);
    }

    let endDateTime = new Date(formatDate(this.editAttendanceForm.value.endTime, format, 'en-US'));

    const condition = {
      attendanceId: this.editAttendanceId,
      actualStartDateTime: actualStartDateTime,
      startDateTime: startDateTime,
      endDateTime: endDateTime
    }

    this.attendanceService.updateAttendance(condition).subscribe(data => {
      if (data) {
        this.contentDialogService.close(this.editAttendanceModalId);
        this.showAttendanceDetail = true;
        this.getAttendanceList(this.dateFrom, this.dateTo);
      }
    }, (error) => {

    })
  }
}
