import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomHandleValidate} from "../../util/custom-handle-validate";
import {ContentDialogService} from "../../../../components/content-dialog/content-dialog.service";
import {EmployeeService} from "../../services/employee.service";

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

  public inputNameForm!: FormGroup;
  public customValidate!: CustomHandleValidate;

  constructor(private formBuilder: FormBuilder,
              private employeeService: EmployeeService,
              private contentDialogService: ContentDialogService) { }

  ngOnInit(): void {
    var today = new Date('2023-04-06');
    this.today = {
      day: this.getDay(today.getDay()),
      date: today.getDate(),
      month: today.getMonth(),
      year: today.getFullYear(),
    }
    this.getInputNameForm();
    this.getNameList();
    console.log(this.today);
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
    this.getInputNameForm();
    this.contentDialogService.open(this.inputNameModalId);
  }

  search() {
    if (!this.customValidate.isValidForm()) {
      return;
    }
  }

  hasError(key: string, errorCode: string) {
    return this.customValidate.hasError(key, errorCode);
  }

  getDay(day: any): string {
    switch (day) {
      case 0:
        return 'Thứ 2';
      case 1:
        return 'Thứ 3';
      case 2:
        return 'Thứ 4';
      case 3:
        return 'Thứ 5';
      case 4:
        return 'Thứ 6';
      case 5:
        return 'Thứ 7';
      case 6:
        return 'Chủ nhật';
      default:
        return '';
    }
  }

}
