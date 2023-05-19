import { Component, OnInit } from '@angular/core';
import {PayrollService} from "../../services/payroll.service";
import {ContentDialogService} from "../../../../components/content-dialog/content-dialog.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomHandleValidate} from "../../util/custom-handle-validate";
import {ValidatorsCharacters} from "../../../shared/util/validators-characters";
import {AddCommaPipe} from "../../pipe/add-comma-pipe";
import {UpdateSalaryDetail} from "../../models/UpdateSalaryDetail";
import {SalaryDetailService} from "../../services/salary-detail.service";

@Component({
  selector: 'app-salary-detail',
  templateUrl: './salary-detail.component.html',
  styleUrls: ['./salary-detail.component.css']
})
export class SalaryDetailComponent implements OnInit {

  currentSalaryDetailList = new Array();
  currentUpdateSalaryDetail!: any;

  updateCurrentPayrollHeader = 'Cập nhật thông tin lương';
  messageHeader = 'Thông báo';
  updateCurrentPayrollModalId = 'updateCurrentPayrollModalId';
  messageModalId = 'messageModalId';

  public updateCurrentSalaryDetailForm!: FormGroup;
  public customValidate!: CustomHandleValidate;

  constructor(private salaryDetailService: SalaryDetailService,
              private contentDialogService: ContentDialogService,
              private formBuilder: FormBuilder,
              private addCommaPipe: AddCommaPipe) { }

  ngOnInit(): void {
    this.getAllCurrentSalaryDetail();
    this.setUpdateCurrentSalaryDetailForm();
  }

  setUpdateCurrentSalaryDetailForm() {
    this.updateCurrentSalaryDetailForm = this.formBuilder.group({
      salary: ['', Validators.required],
      allowance: ['', Validators.required]
    });
    this.customValidate = new CustomHandleValidate(this.updateCurrentSalaryDetailForm);
  }

  getAllCurrentSalaryDetail() {
    this.salaryDetailService.getAllCurrentSalaryDetail().subscribe(data => {
      if (data) {
        this.currentSalaryDetailList = data;
      }
    }, (error) => {

    })
  }

  showUpdateCurrentPayrollModal(positionId: any) {
    this.contentDialogService.open(this.updateCurrentPayrollModalId);
    this.patchValueForUpdateCurrentSalaryDetailForm(positionId);
  }

  patchValueForUpdateCurrentSalaryDetailForm(positionId: any) {
    this.currentSalaryDetailList.forEach(item => {
      if (item.position.positionId == positionId) {
        this.currentUpdateSalaryDetail = item;
      }
    })
    this.updateCurrentSalaryDetailForm.patchValue({
      salary: this.addCommaPipe.transform(this.currentUpdateSalaryDetail.salary),
      allowance: this.addCommaPipe.transform(this.currentUpdateSalaryDetail.allowance)
    });
  }

  updateCurrentSalaryDetail() {
    if (!this.customValidate.isValidForm()) {
      return;
    }
    const updateSalaryDetail = new UpdateSalaryDetail();
    updateSalaryDetail.salaryDetailId = this.currentUpdateSalaryDetail.salaryDetailId;
    updateSalaryDetail.salary = parseFloat(this.updateCurrentSalaryDetailForm.value.salary.replace(/,/g, ''))
    updateSalaryDetail.allowance = parseFloat(this.updateCurrentSalaryDetailForm.value.allowance.replace(/,/g, ''))
    this.salaryDetailService.updateCurrentSalaryDetail(updateSalaryDetail).subscribe(data => {
      if (data) {
        this.getAllCurrentSalaryDetail();
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
