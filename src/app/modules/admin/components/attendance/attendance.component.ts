import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomHandleValidate} from "../../util/custom-handle-validate";
import {ContentDialogService} from "../../../../components/content-dialog/content-dialog.service";
import {EmployeeService} from "../../services/employee.service";
import * as $ from "jquery";
import {AttendaceSaveRequest} from "../../models/AttendaceSaveRequest";
import {AttendanceService} from "../../services/attendance.service";
import {DateUtil} from "../../util/date-util";
import {AttendanceEndDateTimeUpdate} from "../../models/AttendanceEndDateTimeUpdate";
import {DateRequest} from "../../models/DateRequest";
import {EmployeeShiftService} from "../../services/employee-shift.service";
import {addMinutes} from "date-fns";

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

  today: { day: string, date: number, month: number, year: number } = {
    day: '',
    date: 0,
    month: 0,
    year: 0
  };

  header = 'Thông tin điểm danh';
  message = 'Thông báo';
  inputNameModalId = 'inputNameModalId';
  endAttendanceMessageModalId = 'endAttendanceMessageModalId';
  endDateTimeForToday: any;
  attendanceId: any;
  nameList!: Array<any>;
  attendanceForTodayList!: Array<any>;

  public inputNameForm!: FormGroup;
  public customValidate!: CustomHandleValidate;

  employeeShiftInfor: any;
  noteTimeInfor = {
    beforeTime: '',
    endTime: '',
    time: ''
  };

  isShiftStatus = true;
  showShiftStatusCheckBox = true;
  overShiftTime = true;

  constructor(private formBuilder: FormBuilder,
              private employeeService: EmployeeService,
              private attendanceService: AttendanceService,
              private contentDialogService: ContentDialogService,
              private employeeShiftService: EmployeeShiftService) {
  }

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
    this.showEmployeeCurrentShift();
    this.setCheckBox('inputStatusCheckBox', false);
    this.contentDialogService.open(this.inputNameModalId);
  }

  setCheckBox(id: any, status: any) {
    $(`#${id}`).prop('checked', status);
  }

  search() {
    if (this.attendanceForTodayList.length > 0) {
      this.attendanceForTodayList.find(item => {
        if (this.inputNameForm.value.fullname != null) {
          if (this.inputNameForm.value.fullname.length != 0) {
            if (item.payroll.employee.employeeId == this.inputNameForm.value.fullname[0].employeeId
              && item.endDateTime == null) {
              if (item.employeeShift == null) {
                this.inputNameForm.controls['fullname'].setErrors({noCheckAttendance: true});
                return;
              } else {
                if (this.employeeShiftInfor) {
                  if (item.employeeShift.employeeShiftId == this.employeeShiftInfor.employeeShiftId) {
                    this.inputNameForm.controls['fullname'].setErrors({ExistEmployeeShift: true});
                    return;
                  }
                }
              }
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
    if (this.isShiftStatus) {
      attendaceSaveRequest.startDateTime = this.setNewDate(attendaceSaveRequest.startDateTime, this.employeeShiftInfor.startTime);
      attendaceSaveRequest.employeeShiftId = this.employeeShiftInfor?.employeeShiftId;
    } else {
      attendaceSaveRequest.employeeShiftId = null;
    }
    attendaceSaveRequest.endDateTime = null;
    this.attendanceService.saveAttendance(attendaceSaveRequest).subscribe(data => {
      if (data) {
        this.getAttendanceForToday();
        this.contentDialogService.close(this.inputNameModalId);
      }
    }, (error) => {

    });
  }

  setNewDate(date: Date, time: any) {
    if (time) {
      const hour = parseInt(time.substring(0, 2));
      const minute = parseInt(time.substring(3, 5));
      const second = parseInt(time.substring(6, 8));
      const dateClone = new Date(date);
      return DateUtil.setNewDate(dateClone, null, null, null, hour, minute, second);
    }
    return date;
  }

  getAttendanceForToday() {
    const dateRequest = new DateRequest();
    dateRequest.date = new Date();
    this.attendanceService.getAttendanceForToday(dateRequest).subscribe(data => {
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

  showEndEttendaceModal(attendanceId: any, employeeShift: any) {
    this.overShiftTime = false;
    this.attendanceId = attendanceId;
    this.endDateTimeForToday = new Date();
    if (employeeShift != null) {
      const endShiftDateTime = this.setNewDate(this.endDateTimeForToday, employeeShift.endTime);
      const endShiftDateTimeLimit = addMinutes(endShiftDateTime, 30);
      const compare = DateUtil.between2DateTime(endShiftDateTime, endShiftDateTimeLimit, this.endDateTimeForToday);
      if (compare) {
        this.endDateTimeForToday = endShiftDateTime;
      } else {
        if (DateUtil.compare2DateTime(this.endDateTimeForToday, endShiftDateTimeLimit) == 1) {
          this.overShiftTime = true;
        }
      }
    }
    this.contentDialogService.open(this.endAttendanceMessageModalId);
  }

  acceptEndAttendace() {
    if (this.overShiftTime) {
      this.contentDialogService.close(this.endAttendanceMessageModalId);
      return;
    }
    const attendanceEndDateTimeUpdate = new AttendanceEndDateTimeUpdate;
    attendanceEndDateTimeUpdate.attendanceId = this.attendanceId;
    attendanceEndDateTimeUpdate.endDateTime = this.endDateTimeForToday;
    this.attendanceService.updateAttendanceForEndTimeDate(attendanceEndDateTimeUpdate).subscribe(data => {
      if (data) {
        this.getAttendanceForToday();
        this.contentDialogService.close(this.endAttendanceMessageModalId);
      }
    }, (error) => {

    })
  }

  formatDate(endDateTime: any) {
    return DateUtil.formatDateToStrWithFormat(endDateTime, 'HH:mm:ss');
  }

  getAttendanceHour(startDateTime: any, endDateTime: any) {
    return DateUtil.getHour(startDateTime, endDateTime);
  }

  showEmployeeCurrentShift() {
    this.employeeShiftService.getEmployeeShiftByCurrentTime().subscribe(data => {
      if (data) {
        this.showShiftStatusCheckBox = true;
        this.isShiftStatus = true;
        this.employeeShiftInfor = data;
        this.getTimeInfor(this.employeeShiftInfor.startTime);
      } else {
        this.showShiftStatusCheckBox = false;
        this.isShiftStatus = false;
      }
    }, (error) => {

    })
  }

  getTimeInfor(time: string) {
    this.noteTimeInfor.beforeTime = DateUtil.changeTimeByMinutes(time, 30, DateUtil.SUB_METHOD);
    this.noteTimeInfor.endTime = DateUtil.changeTimeByMinutes(time, 10, DateUtil.ADD_METHOD);
    this.noteTimeInfor.time = DateUtil.changeTimeByMinutes(time, 0, null);
  }

  checkShiftStatus(event: any) {
    if (event.target.checked) {
      this.isShiftStatus = false;
    } else {
      this.isShiftStatus = true;
    }
  }

}
