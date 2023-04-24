import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {CustomHandleValidate} from "../../util/custom-handle-validate";
import {PayrollService} from "../../services/payroll.service";
import {DateUtil} from "../../util/date-util";
import {AttendanceService} from "../../services/attendance.service";
import {ContentDialogService} from "../../../../components/content-dialog/content-dialog.service";
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-salary-management',
  templateUrl: './salary-management.component.html',
  styleUrls: ['./salary-management.component.css']
})
export class SalaryManagementComponent implements OnInit {

  public downloadExcelModalId = 'downloadExcelModalId';
  public message = 'Thông báo';

  monthList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  yearList: Array<any> = [];

  public monthYearForm!: FormGroup;
  public customValidate!: CustomHandleValidate;

  currentMonth: any;
  currentYear: any;

  payrollList: Array<any> = [];

  constructor(private formBuilder: FormBuilder,
              private payrollService: PayrollService,
              private attendanceService: AttendanceService,
              private contentDialogService: ContentDialogService) { }

  ngOnInit(): void {
    const today = new Date();
    const currentYear = today.getFullYear();
    for (var i = 0; i < 10; i++) {
      this.yearList.push(Number(currentYear - i));
    }
    this.setEmployeeAdditionForm(today.getMonth() + 1, today.getFullYear());
    this.getPayrollForMonthYear(today.getMonth() + 1, today.getFullYear());
  }

  setEmployeeAdditionForm(month: any, year: any) {
    this.monthYearForm = this.formBuilder.group({
      month: [''],
      year: ['']
    });
    this.monthYearForm.patchValue({
      month: month,
      year: year
    })
    this.customValidate = new CustomHandleValidate(this.monthYearForm);
  }

  search() {
    if (!this.customValidate.isValidForm()) {
      return;
    }
    const month = this.monthYearForm.value.month;
    const year = this.monthYearForm.value.year;
    this.getPayrollForMonthYear(month, year);
  }

  getPayrollForMonthYear(month: any, year: any) {
    this.payrollService.getPayrollForMonthYear(month, year).subscribe(data => {
      if (data) {
        this.payrollList = data;
        this.currentMonth = month;
        this.currentYear = year;
      }
    }, (error) => {

    })
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

  getSalaryTotalForEmployee(attendanceDTOList: any, currentSalary: any) {
    return this.getHoursTotal(attendanceDTOList) * currentSalary;
  }

  downloadExcelForMonthYear() {
    const month = this.monthYearForm.value.month;
    const year = this.monthYearForm.value.year;
    this.attendanceService.downloadExcelForMonthYear(month, year).subscribe(resp => {
      const file = new File([resp.body],
        decodeURIComponent(resp.headers.get('Content-Disposition').split('filename=')[1]),
        { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=utf-8' });
      fileSaver.saveAs(file);
    }, (error) => {

    })
  }

  downloadExcelForAll() {
    this.attendanceService.downloadExcelForAll().subscribe(resp => {
      const file = new File([resp.body],
        decodeURIComponent(resp.headers.get('Content-Disposition').split('filename=')[1]),
        { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=utf-8' });
      fileSaver.saveAs(file);
    }, (error) => {

    })
  }

  exit() {
    this.contentDialogService.close(this.downloadExcelModalId);
  }

  paySalary(employeeId: any) {
    this.attendanceService.updatePayrollStatus(employeeId, this.currentMonth, this.currentYear).subscribe(data => {
      if (data) {
        this.getPayrollForMonthYear(this.currentMonth, this.currentYear);
      }
    }, (error) => {

    })
  }

  checkPayrollStatus(employeeId: any) {
    let check = false;
    if (this.payrollList != null && this.payrollList.length > 0) {
      this.payrollList.forEach(item => {
        if (item.employeeId == employeeId) {
          if (item.attendanceDTOList != null && item.attendanceDTOList.length > 0) {
            item.attendanceDTOList.forEach((item1: { payrollStatus: number; }) => {
              if (item1.payrollStatus != 1) {
                check = true;
              }
            })
          }
        }
      })
    }
    return check;
  }

  checkDisplay() {
    const selectDate = new Date(this.currentYear, this.currentMonth - 1, 1);
    const today = new Date();
    return DateUtil.isBeforeMonthYear(selectDate, today);
  }

}
