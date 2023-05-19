import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomHandleValidate} from "../../util/custom-handle-validate";
import {PayrollService} from "../../services/payroll.service";
import {DateUtil} from "../../util/date-util";
import {AttendanceService} from "../../services/attendance.service";
import {ContentDialogService} from "../../../../components/content-dialog/content-dialog.service";
import * as fileSaver from 'file-saver';
import {ValidatorsCharacters} from "../../../shared/util/validators-characters";
import {SalaryAdvanceService} from "../../services/salary-advance.service";
import {AddCommaPipe} from "../../pipe/add-comma-pipe";

@Component({
  selector: 'app-salary-management',
  templateUrl: './salary-management.component.html',
  styleUrls: ['./salary-management.component.css']
})
export class SalaryManagementComponent implements OnInit {

  public downloadExcelModalId = 'downloadExcelModalId';
  public salaryAdvanceInfoModalId = 'salaryAdvanceInfoModalId';
  public bonusModalId = 'bonusModalId';
  public message = 'Thông báo';
  public salaryAdvanceInfo = 'Thông tin ứng lương';
  public bonusInfo = 'Thưởng';

  public salaryAdvanceForm!: FormGroup;
  public salaryAdvanceCustomValidate!: CustomHandleValidate;

  public bonusForm!: FormGroup;
  public bonusCustomValidate!: CustomHandleValidate;

  selectedEmployee: {payrollId: number, employeeName: string, salaryAdvance: number} = {
    payrollId: 0,
    employeeName: '',
    salaryAdvance: 0
  };

  monthList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  yearList: Array<any> = [];
  salaryAdvanceList!: any;

  public monthYearForm!: FormGroup;
  public customValidate!: CustomHandleValidate;

  currentMonth: any;
  currentYear: any;

  payrollList: Array<any> = [];

  constructor(private formBuilder: FormBuilder,
              private payrollService: PayrollService,
              private attendanceService: AttendanceService,
              private contentDialogService: ContentDialogService,
              private salaryAdvanceService: SalaryAdvanceService,
              private addCommaPipe: AddCommaPipe) { }

  ngOnInit(): void {
    const today = new Date();
    const currentYear = today.getFullYear();
    for (var i = 0; i < 10; i++) {
      this.yearList.push(Number(currentYear - i));
    }
    this.setEmployeeAdditionForm(today.getMonth() + 1, today.getFullYear());
    this.setSalaryAdvanceForm();
    this.setBonusForm();
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

  setSalaryAdvanceForm() {
    this.salaryAdvanceForm = this.formBuilder.group({
      salaryAdvance: ['', Validators.required]
    });
    this.salaryAdvanceCustomValidate = new CustomHandleValidate(this.salaryAdvanceForm);
  }

  setBonusForm() {
    this.bonusForm = this.formBuilder.group({
      bonus: ['', Validators.required]
    });
    this.bonusCustomValidate = new CustomHandleValidate(this.bonusForm);
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

  paySalary(payrollId: any) {
    this.attendanceService.updatePayrollStatus(payrollId).subscribe(data => {
      if (data) {
        this.getPayrollForMonthYear(this.currentMonth, this.currentYear);
      }
    }, (error) => {

    })
  }

  checkDisplay() {
    const selectDate = new Date(this.currentYear, this.currentMonth - 1, 1);
    const today = new Date();
    return DateUtil.isBeforeMonthYear(selectDate, today);
  }

  showSalaryAdvanceModal(payrollId: any, fullname: any, salaryAdvance: any) {
    this.setSalaryAdvanceForm();
    this.salaryAdvanceCustomValidate.reset();
    this.selectedEmployee = {
      payrollId: payrollId,
      employeeName: fullname,
      salaryAdvance: Number(salaryAdvance)
    };
    this.salaryAdvanceService.getSalaryAdvance(payrollId).subscribe(data => {
      if (data) {
        this.salaryAdvanceList = data;
        this.contentDialogService.open(this.salaryAdvanceInfoModalId);
      }
    }, (error) => {

    })
  }

  numericOnly(event: any): boolean {
    const pattern = ValidatorsCharacters.NumericOnly;
    if (event.key.match(pattern)) {
      return true;
    } else {
      return false;
    }
  }

  hasError(key: string, errorCode: string) {
    return this.salaryAdvanceCustomValidate.hasError(key, errorCode);
  }

  hasBonusFormError(key: string, errorCode: string) {
    return this.bonusCustomValidate.hasError(key, errorCode);
  }

  advance() {
    if (!this.salaryAdvanceCustomValidate.isValidForm()) {
      return;
    }
    const condition = {
      payrollId: this.selectedEmployee.payrollId,
      salaryAdvanceAmount: parseFloat(this.salaryAdvanceForm.value.salaryAdvance.replace(/,/g, ''))
    }
    this.salaryAdvanceService.saveSalaryAdvance(condition).subscribe(data => {
      if (data) {
        this.getPayrollForMonthYear(this.currentMonth, this.currentYear);
        this.contentDialogService.close(this.salaryAdvanceInfoModalId);
      }
    }, (error) => {

    })
  }

  exitSalaryAdvanceModal() {
    this.contentDialogService.close(this.salaryAdvanceInfoModalId);
  }

  showBonusModal(payrollId: any, fullname: any, bonus: any) {
    this.contentDialogService.open(this.bonusModalId);
    this.setBonusForm();
    this.selectedEmployee = {
      payrollId: payrollId,
      employeeName: fullname,
      salaryAdvance: 0
    };
    this.bonusForm.patchValue({
      bonus: this.addCommaPipe.transform(bonus)
    })
  }

  bonus() {
    if (!this.bonusCustomValidate.isValidForm()) {
      return;
    }
    const payrollId = this.selectedEmployee.payrollId;
    const bonus = parseFloat(this.bonusForm.value.bonus.replace(/,/g, ''))
    this.payrollService.updateBonusPayroll(payrollId, bonus).subscribe(data => {
      if (data) {
        this.getPayrollForMonthYear(this.currentMonth, this.currentYear);
        this.contentDialogService.close(this.bonusModalId);
      }
    }, (error) => {

    })
  }

  exitBonusModal() {
    this.contentDialogService.close(this.bonusModalId);
  }

}
