import {Component, forwardRef, OnInit, ViewChild} from '@angular/core';
import {EmployeeService} from "../../services/employee.service";
import {ContentDialogService} from "../../../../components/content-dialog/content-dialog.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomHandleValidate} from "../../util/custom-handle-validate";
import {ValidatorsCharacters} from "../../../shared/util/validators-characters";
import {Employee} from "../../models/Employee";
import {PaginationComponent} from "../../../../components/pagination/pagination.component";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  items: any[] = [];
  pageOfItems?: Array<any>;
  selectedGender = 1;
  workingStatus = 1;
  notWorkingStatus = 0;
  title!: string;

  public employeeAdditionForm!: FormGroup;
  public customValidate!: CustomHandleValidate;

  public employeeAdditionModalId = 'employeeAdditionModalId';
  public successAddModalId = 'successAddModalId';
  public header = 'Thêm nhân viên';
  public message = 'Thông báo';
  public messageError!: string;

  @ViewChild(
    forwardRef(() => PaginationComponent), { static: false }
  ) paginationComponent!: PaginationComponent;

  constructor(private employeeService: EmployeeService,
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

}
