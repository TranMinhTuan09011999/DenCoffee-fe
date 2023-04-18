import {Component, forwardRef, OnInit, ViewChild} from '@angular/core';
import {EmployeeService} from "../../services/employee.service";
import {ContentDialogService} from "../../../../components/content-dialog/content-dialog.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomHandleValidate} from "../../util/custom-handle-validate";
import {ValidatorsCharacters} from "../../../shared/util/validators-characters";
import {Employee} from "../../models/Employee";
import {PaginationComponent} from "../../../../components/pagination/pagination.component";
import {WorkHistoryService} from "../../services/work-history.service";
import {DateUtil} from "../../util/date-util";
import {PayrollService} from "../../services/payroll.service";
import {AddCommaPipe} from "../../pipe/add-comma-pipe";

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
  statusForm: any; // 1: add, 2: edit
  employeeIdForEdit: any;
  salaryIncreaseEmployeeId = {
    employeeId: null,
    fullname: null,
    basicSalary: null
  };

  public employeeAdditionForm!: FormGroup;
  public customValidate!: CustomHandleValidate;

  public salaryIncreaseForm!: FormGroup;
  public salaryIncreaseCustomValidate!: CustomHandleValidate;

  public employeeAdditionModalId = 'employeeAdditionModalId';
  public successAddModalId = 'successAddModalId';
  public workHistoryModalId = 'workHistoryModalId';
  public changeStatusModalId = 'changeStatusModalId';
  public salaryIncreaseModalId = 'salaryIncreaseModalId';
  public header: any;
  public message = 'Thông báo';
  public salaryIncreaseMessage = 'Tăng lương nhân viên';
  public workHistory = 'Lịch sử làm việc';
  public workingEmployeeList = 'Nhân viên đang làm';
  public notWorkingEmployeeList = 'Nhân viên đã nghỉ';
  public messageError!: string;

  @ViewChild(
    forwardRef(() => PaginationComponent), { static: false }
  ) paginationComponent!: PaginationComponent;

  constructor(private employeeService: EmployeeService,
              private workHistoryService: WorkHistoryService,
              private contentDialogService: ContentDialogService,
              private payrollService: PayrollService,
              private formBuilder: FormBuilder,
              private addCommaPipe: AddCommaPipe
              ) { }

  ngOnInit(): void {
    this.setEmployeeAdditionForm();
    this.setSalaryIncreaseForm();
    this.getAllEmployeeByStatus(this.workingStatus);

  }

  getAllEmployeeByStatus(status: any) {
    this.employeeService.getAllEmployeeByStatus(status).subscribe(data => {
      if (data) {
        this.items = data;
        if (status === this.workingStatus) {
          this.title = this.workingEmployeeList;
        } else if (status === this.notWorkingStatus) {
          this.title = this.notWorkingEmployeeList;
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
      address: ['', Validators.required],
      salary: ['', Validators.required]
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
    employee.salary = parseFloat(employeeInfor.salary.replace(/,/g, ''));
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

  showEmployeeAdditionModal() {
    this.header = 'Thêm nhân viên';
    this.statusForm = 1;
    this.openEmployeeModal();
  }

  showEmployeeEditionModal(employeeId: any) {
    this.header = 'Sửa nhân viên';
    this.statusForm = 2;
    this.employeeIdForEdit = employeeId;
    this.openEmployeeModal();
    this.items.forEach(data => {
      if (data.employeeId === employeeId) {
        var birth = DateUtil.formatStr2ObjectDate(data.birthday);
        this.employeeAdditionForm.patchValue({
          fullname: data.fullname,
          gender: data.gender + '',
          birthday: birth.year + '-' + birth.month + '-' + birth.day,
          phoneNumber: data.phoneNumber,
          address: data.address
        });
      }
    });
  }

  openEmployeeModal() {
    this.contentDialogService.open(this.employeeAdditionModalId);
    this.setEmployeeAdditionForm();
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
    this.getAllEmployeeByStatus(this.workingStatus);
    this.contentDialogService.close(this.successAddModalId);
  }

  exitWorkHistory() {
    this.contentDialogService.close(this.workHistoryModalId);
  }

  showWorkHistory(employeeId: any) {
    this.contentDialogService.open(this.workHistoryModalId);
    this.workHistoryService.getWorkHistoryByEmployeeId(employeeId).subscribe(data => {
      if (data) {
        this.workHistoryListByEmployeeId = data;
      }
    }, (error) => {

    });
  }

  showChangeStatusModal(employeeId: any, status: any) {
    this.employeeIdForChangeStatus = employeeId;
    this.statusForChangeStatus = status;
    this.contentDialogService.open(this.changeStatusModalId);
  }

  cancelChangeStatus() {
    this.employeeIdForChangeStatus = null;
    this.statusForChangeStatus = null;
    this.contentDialogService.close(this.changeStatusModalId);
  }

  changeStatus(employeeId: any, statusUpdate: any) {
    this.employeeService.updateStatusForEmployee(employeeId, statusUpdate).subscribe(data => {
      if (data) {
        this.contentDialogService.close(this.changeStatusModalId);
        this.getAllEmployeeByStatus(this.workingStatus);
      }
    }, (error) => {

    });
  }

  cancelEmployeeAddition() {
    this.contentDialogService.close(this.employeeAdditionModalId);
  }

  editEmployee() {
    if (!this.customValidate.isValidForm()) {
      return;
    }
    const employeeInfor = this.employeeAdditionForm.value;
    const employee = new Employee();
    employee.employeeId = this.employeeIdForEdit;
    employee.fullname = employeeInfor.fullname;
    employee.gender = employeeInfor.gender;
    employee.birthday = employeeInfor.birthday;
    employee.phoneNumber = employeeInfor.phoneNumber;
    employee.address = employeeInfor.address;
    this.employeeService.updateEmployee(employee).subscribe(data => {
      if (data) {
        this.contentDialogService.close(this.employeeAdditionModalId);
        this.contentDialogService.open(this.successAddModalId);
      }
    }, (error) => {

    });
  }

  showSalaryIncreaseModal(item: any) {
    this.salaryIncreaseEmployeeId = {
      employeeId: item.employeeId,
      fullname: item.fullname,
      basicSalary: item.salary
    };
    this.salaryIncreaseForm.patchValue({
      salaryIncrease: null
    });
    this.salaryIncreaseCustomValidate.reset();
    this.contentDialogService.open(this.salaryIncreaseModalId);
    this.payrollService.getNewSalary(this.salaryIncreaseEmployeeId.employeeId).subscribe(data => {
      if (data) {
        this.salaryIncreaseForm.patchValue({
          salaryIncrease: this.addCommaPipe.transform(data)
        });
      }
    }, (error) => {

    });
  }

  cancelSalaryIncrease() {
    this.salaryIncreaseEmployeeId = {
      employeeId: null,
      fullname: null,
      basicSalary: null
    };
    this.contentDialogService.close(this.salaryIncreaseModalId);
  }

  setSalaryIncreaseForm() {
    this.salaryIncreaseForm = this.formBuilder.group({
      salaryIncrease: ['', Validators.required]
    });
    this.salaryIncreaseCustomValidate = new CustomHandleValidate(this.salaryIncreaseForm);
  }

  increaseSalary() {
    if (!this.salaryIncreaseCustomValidate.isValidForm()) {
      return;
    }
    const salaryIncrease = parseFloat(this.salaryIncreaseForm.value.salaryIncrease.replace(/,/g, ''));
    this.payrollService.addNewSalaryForEmployee(this.salaryIncreaseEmployeeId.employeeId, salaryIncrease).subscribe(data => {
      if (data) {
        this.contentDialogService.close(this.salaryIncreaseModalId);
      }
    }, (error) => {

    });
  }

  hasSalaryIncreaseError(key: string, errorCode: string) {
    return this.salaryIncreaseCustomValidate.hasError(key, errorCode);
  }
}
