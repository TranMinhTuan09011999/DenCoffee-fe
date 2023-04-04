import {Component, forwardRef, OnInit, ViewChild} from '@angular/core';
import {EmployeeService} from "../../services/employee.service";
import {ContentDialogService} from "../../../../components/content-dialog/content-dialog.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomHandleValidate} from "../../util/custom-handle-validate";
import {ValidatorsCharacters} from "../../../shared/util/validators-characters";
import {Employee} from "../../models/Employee";
import {PaginationComponent} from "../../../../components/pagination/pagination.component";
import {WorkHistoryService} from "../../services/work-history.service";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  items: any[] = [];
  workHistoryListByEmployeeId: any[] = [];
  pageOfItems?: Array<any>;
  selectedGender = 1;
  workingStatus = 1;
  notWorkingStatus = 0;
  title!: string;
  employeeIdForChangeStatus: any;
  statusForChangeStatus: any;
  currentStatus: any;

  public employeeAdditionForm!: FormGroup;
  public customValidate!: CustomHandleValidate;

  public employeeAdditionModalId = 'employeeAdditionModalId';
  public successAddModalId = 'successAddModalId';
  public workHistoryModalId = 'workHistoryModalId';
  public changeStatusModalId = 'changeStatusModalId';
  public header = 'Thêm nhân viên';
  public message = 'Thông báo';
  public workHistory = 'Lịch sử làm việc';
  public messageError!: string;

  @ViewChild(
    forwardRef(() => PaginationComponent), { static: false }
  ) paginationComponent!: PaginationComponent;

  constructor(private employeeService: EmployeeService,
              private workHistoryService: WorkHistoryService,
              private contentDialogService: ContentDialogService,
              private formBuilder: FormBuilder,
              ) { }

  ngOnInit(): void {
    this.setEmployeeAdditionForm();
    this.getAllEmployeeByStatus(this.workingStatus);
  }

  getAllEmployeeByStatus(status: any) {
    this.employeeService.getAllEmployeeByStatus(status).subscribe(data => {
      if (data) {
        this.items = data;
        if (status === this.workingStatus) {
          this.title = "Nhân viên đang làm"
        } else if (status === this.notWorkingStatus) {
          this.title = "Nhân viên đã nghỉ"
        }
      }
    }, (error) => {

    });
  }

  setEmployeeAdditionForm() {
    this.employeeAdditionForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      gender: ['1'],
      birthday: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      address: ['', Validators.required]
    });
    this.customValidate = new CustomHandleValidate(this.employeeAdditionForm);
  }

  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

  addEmployee() {
    if (!this.customValidate.isValidForm()) {
      return;
    }
    const employeeInfor = this.employeeAdditionForm.value;
    const employee = new Employee();
    employee.fullname = employeeInfor.fullname;
    employee.gender = employeeInfor.gender;
    employee.birthday = employeeInfor.birthday;
    employee.phoneNumber = employeeInfor.phoneNumber;
    employee.address = employeeInfor.address;
    employee.status = 1;
    this.employeeService.registerEmployee(employee).subscribe(data => {
      if (data) {
        this.contentDialogService.close(this.employeeAdditionModalId);
        this.contentDialogService.open(this.successAddModalId);
      }
    }, (error) => {

    });
  }

  setGender(status: number) {
    return status == 1 ? 'Nam' : 'Nữ';
  }

  setStatus(status: number) {
    return status == 1 ? 'Đang làm' : 'Đã nghỉ';
  }

  openEmployeeAdditionModal() {
    this.contentDialogService.open(this.employeeAdditionModalId);
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
    window.location.reload();
  }

  exitWorkHistory() {
    this.contentDialogService.close(this.workHistoryModalId);
  }

  showWorkHistory(employeeId: any) {
    this.contentDialogService.open(this.workHistoryModalId);
    this.workHistoryService.getWorkHistoryByEmployeeId(employeeId).subscribe(data => {
      if (data) {
        this.workHistoryListByEmployeeId = data;
        console.log(data);
      }
    }, (error) => {

    });
  }

  showChangeStatusModal(employeeId: any, status: any, statusCurrent: any) {
    this.employeeIdForChangeStatus = employeeId;
    this.statusForChangeStatus = status;
    this.currentStatus = statusCurrent;
    this.contentDialogService.open(this.changeStatusModalId);
  }

  cancelChangeStatus() {
    this.employeeIdForChangeStatus = null;
    this.statusForChangeStatus = null;
    this.currentStatus = null;
    this.contentDialogService.close(this.changeStatusModalId);
  }

  changeStatus(employeeId: any, statusUpdate: any, statusCurrent: any) {
    this.employeeService.updateStatusForEmployee(employeeId, statusUpdate).subscribe(data => {
      if (data) {
        console.log(data);
        this.contentDialogService.close(this.changeStatusModalId);
        this.getAllEmployeeByStatus(statusCurrent);
      }
    }, (error) => {

    });
  }

  cancelEmployeeAddition() {
    this.contentDialogService.close(this.employeeAdditionModalId);
  }

}
