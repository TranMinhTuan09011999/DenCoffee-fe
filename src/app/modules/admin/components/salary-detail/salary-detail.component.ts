import { Component, OnInit } from '@angular/core';
import {PayrollService} from "../../services/payroll.service";
import {ContentDialogService} from "../../../../components/content-dialog/content-dialog.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomHandleValidate} from "../../util/custom-handle-validate";
import {ValidatorsCharacters} from "../../../shared/util/validators-characters";
import {AddCommaPipe} from "../../pipe/add-comma-pipe";
import {UpdatePayroll} from "../../models/UpdatePayroll";

@Component({
  selector: 'app-salary-detail',
  templateUrl: './salary-detail.component.html',
  styleUrls: ['./salary-detail.component.css']
})
export class SalaryDetailComponent implements OnInit {

  currentPayrollList!: any;
  currentUpdatePayroll!: any;

  updateCurrentPayrollHeader = 'Cập nhật thông tin lương';
  messageHeader = 'Thông báo';
  updateCurrentPayrollModalId = 'updateCurrentPayrollModalId';
  messageModalId = 'messageModalId';

  public updateCurrentPayrollForm!: FormGroup;
  public customValidate!: CustomHandleValidate;

  constructor(private payrollService: PayrollService,
              private contentDialogService: ContentDialogService,
              private formBuilder: FormBuilder,
              private addCommaPipe: AddCommaPipe) { }

  ngOnInit(): void {
    this.getAllCurrentPayroll();
    this.setUpdateCurrentPayrollForm();
  }

  setUpdateCurrentPayrollForm() {
    this.updateCurrentPayrollForm = this.formBuilder.group({
      salary: ['', Validators.required],
      allowance: ['', Validators.required],
      bonus: ['', Validators.required]
    });
    this.customValidate = new CustomHandleValidate(this.updateCurrentPayrollForm);
  }

  getAllCurrentPayroll() {
    this.payrollService.getAllCurrentPayroll().subscribe(data => {
      if (data) {
        this.currentPayrollList = data;
      }
    }, (error) => {

    })
  }

  showUpdateCurrentPayrollModal(payrollId: any) {
    this.customValidate.reset();
    this.contentDialogService.open(this.updateCurrentPayrollModalId);
    this.patchValueForUpdateCurrentPayrollForm(payrollId);
  }

  patchValueForUpdateCurrentPayrollForm(payrollId: any) {
    this.currentUpdatePayroll = this.currentPayrollList.find((item: { payrollId: any; }) => item.payrollId = payrollId);
    this.updateCurrentPayrollForm.patchValue({
      salary: this.addCommaPipe.transform(this.currentUpdatePayroll.salary),
      allowance: this.addCommaPipe.transform(this.currentUpdatePayroll.allowance),
      bonus: this.addCommaPipe.transform(this.currentUpdatePayroll.bonus)
    });
  }

  updateCurrentPayroll() {
    if (!this.customValidate.isValidForm()) {
      return;
    }
    const updatePayroll = new UpdatePayroll();
    updatePayroll.payrollId = this.currentUpdatePayroll.payrollId;
    updatePayroll.salary = parseFloat(this.updateCurrentPayrollForm.value.salary.replace(/,/g, ''))
    updatePayroll.allowance = parseFloat(this.updateCurrentPayrollForm.value.allowance.replace(/,/g, ''))
    updatePayroll.bonus = parseFloat(this.updateCurrentPayrollForm.value.bonus.replace(/,/g, ''))
    console.log(updatePayroll);
    this.payrollService.updateCurrentPayroll(updatePayroll).subscribe(data => {
      if (data) {
        this.getAllCurrentPayroll();
        this.contentDialogService.close(this.updateCurrentPayrollModalId);
        this.contentDialogService.open(this.messageModalId);
      }
    }, (error) => {

    })
  }

  hasError(key: string, errorCode: string) {
    return this.customValidate.hasError(key, errorCode);
  }

  numericOnly(event: any): boolean {
    const pattern = ValidatorsCharacters.NumericOnly;
    if (event.key.match(pattern)) {
      return true;
    } else {
      return false;
    }
  }
  exit() {
    this.contentDialogService.close(this.messageModalId);
  }

}
