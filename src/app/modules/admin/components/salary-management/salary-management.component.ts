import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {CustomHandleValidate} from "../../util/custom-handle-validate";
import {PayrollService} from "../../services/payroll.service";
import {DateUtil} from "../../util/date-util";
import {AttendanceService} from "../../services/attendance.service";
import {ContentDialogService} from "../../../../components/content-dialog/content-dialog.service";

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

  downloadExcel() {
    const month = this.monthYearForm.value.month;
    const year = this.monthYearForm.value.year;
    this.currentMonth = month;
    this.currentYear = year;
    this.attendanceService.downloadExcel(month, year).subscribe(data => {
      if (!data) {
        this.contentDialogService.open(this.downloadExcelModalId);
      }
    }, (error) => {

    })
  }

  exit() {
    this.contentDialogService.close(this.downloadExcelModalId);
  }
}
