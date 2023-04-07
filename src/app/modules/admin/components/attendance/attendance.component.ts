import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomHandleValidate} from "../../util/custom-handle-validate";
import {ContentDialogService} from "../../../../components/content-dialog/content-dialog.service";
import {EmployeeService} from "../../services/employee.service";
import * as $ from "jquery";
import {AttendaceSaveRequest} from "../../models/AttendaceSaveRequest";
import {AttendanceService} from "../../services/attendance.service";

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {

  public dropdownSingleSettings = {
    singleSelection: true,
    allowSearchFilter: true,
    idField: 'employeeId',
    textField: 'fullname',
    searchPlaceholderText: 'Tìm kiếm',
    itemsShowLimit: 1
  };

  today: { day: string, date: number, month: number, year: number} = {
    day: '',
    date: 0,
    month: 0,
    year: 0
  };

  header = '';
  public inputNameModalId = 'inputNameModalId';
  nameList!: Array<any>;
  attendanceForTodayList!: Array<any>;

  public inputNameForm!: FormGroup;
  public customValidate!: CustomHandleValidate;

  constructor(private formBuilder: FormBuilder,
              private employeeService: EmployeeService,
              private attendanceService: AttendanceService,
              private contentDialogService: ContentDialogService) { }

  ngOnInit(): void {
    var today = new Date();
    this.today = {
      day: this.getDay(today.getDay()),
      date: today.getDate(),
      month: today.getMonth() + 1,
      year: today.getFullYear(),
    }
    this.getInputNameForm();
    this.getNameList();
    this.getAttendanceForToday();
  }

  getInputNameForm() {
    this.inputNameForm = this.formBuilder.group({
      fullname: ['', Validators.required]
    });
    this.customValidate = new CustomHandleValidate(this.inputNameForm);
  }

  getNameList() {
    this.employeeService.getAllEmployeeNameByStatus(1).subscribe(data => {
      if (data) {
        this.nameList = data;
      }
    }, (error) => {

    });
  }

  showInputNameForm() {
    this.customValidate.reset();
    this.inputNameForm.patchValue({
      fullname: null
    });
    this.contentDialogService.open(this.inputNameModalId);
  }

  search() {
    if (this.attendanceForTodayList.length > 0) {
      this.attendanceForTodayList.find(item => {
        if (this.inputNameForm.value.fullname != null) {
          if (this.inputNameForm.value.fullname.length != 0) {
            if (item.employee.employeeId == this.inputNameForm.value.fullname[0].employeeId
              && item.endDateTime == null) {
              this.inputNameForm.controls['fullname'].setErrors({noCheckAttendance: true});
              return;
            }
          }
        }
      })
    }
    if (!this.customValidate.isValidForm()) {
      return;
    }

    const attendaceSaveRequest = new AttendaceSaveRequest;
    attendaceSaveRequest.employeeId = this.inputNameForm.value.fullname[0].employeeId;
    attendaceSaveRequest.startDateTime = new Date();
    this.attendanceService.saveAttendance(attendaceSaveRequest).subscribe(data => {
      if (data) {
        this.getAttendanceForToday();
        this.contentDialogService.close(this.inputNameModalId);
      }
    }, (error) => {

    });
  }

  getAttendanceForToday() {
    this.attendanceService.getAttendanceForToday().subscribe(data => {
      if (data) {
        this.attendanceForTodayList = data;
      }
    }, (error) => {

    })
  }

  hasError(key: string, errorCode: string) {
    return this.customValidate.hasError(key, errorCode);
  }

  getDay(day: any): string {
    switch (day) {
      case 0:
        return 'Chủ nhật';
      case 1:
        return 'Thứ 2';
      case 2:
        return 'Thứ 3';
      case 3:
        return 'Thứ 4';
      case 4:
        return 'Thứ 5';
      case 5:
        return 'Thứ 6';
      case 6:
        return 'Thứ 7';
      default:
        return '';
    }
  }

  onSelectEmpoyeeName($event: any) {
    $(".dropdown-multiselect__caret").trigger('click');
  }

}
