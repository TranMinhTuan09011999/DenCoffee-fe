import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomHandleValidate} from "../../util/custom-handle-validate";
import {ContentDialogService} from "../../../../components/content-dialog/content-dialog.service";
import {IpAddressService} from "../../services/ip-address.service";
import {IpAddressRequest} from "../../models/IpAddressRequest";
import {IpAddress} from "../../models/IpAddress";

@Component({
  selector: 'app-ip-address',
  templateUrl: './ip-address.component.html',
  styleUrls: ['./ip-address.component.css']
})
export class IpAddressComponent implements OnInit {

  header = '';
  message = 'Thông báo';
  inputIpAddressModalId = 'inputIpAddressModalId';
  deleteIpAddressModalId = 'deleteIpAddressModalId';
  ipAddressList!: Array<any>;
  statusForm: any; // 1: add, 2: edit
  editingIpAddressId: any;
  editingIpAddress: any;
  deletingIpAddressId: any;

  public inputIpAddressForm!: FormGroup;
  public customValidate!: CustomHandleValidate;

  constructor(private formBuilder: FormBuilder,
              private contentDialogService: ContentDialogService,
              private ipAddressService: IpAddressService) { }

  ngOnInit(): void {
    this.getInputNameForm();
    this.getIpAddressList();
  }

  getInputNameForm() {
    this.inputIpAddressForm = this.formBuilder.group({
      ipAddress: ['', Validators.required]
    });
    this.customValidate = new CustomHandleValidate(this.inputIpAddressForm);
  }

  getIpAddressList() {
    this.ipAddressService.getAllIpAddress().subscribe(data => {
      if (data) {
        this.ipAddressList = data;
      }
    }, (error) => {

    })
  }

  showAddIpAddressModal() {
    this.header = 'Thêm địa chỉ IP';
    this.statusForm = 1;
    this.getInputNameForm();
    this.customValidate.reset();
    this.contentDialogService.open(this.inputIpAddressModalId);
  }

  hasError(key: string, errorCode: string) {
    return this.customValidate.hasError(key, errorCode);
  }

  addIpAddress() {
    if (!this.customValidate.isValidForm()) {
      return;
    }
    this.ipAddressService.checkExistIpAddress(this.inputIpAddressForm.value.ipAddress).subscribe(data => {
      if (data) {
        this.inputIpAddressForm.controls['ipAddress'].setErrors({existIpAddress: true});
      }
      if (!this.customValidate.isValidForm()) {
        return;
      }
      const ipAddressRequest = new IpAddressRequest();
      ipAddressRequest.ipAddress = this.inputIpAddressForm.value.ipAddress;
      this.ipAddressService.registerIpAddress(ipAddressRequest).subscribe(data => {
        if (data) {
          this.contentDialogService.close(this.inputIpAddressModalId);
          this.getIpAddressList();
        }
      }, (error) => {

      })
    }, (error) => {

    })
  }

  showEditIpAddressModal(ipAddressId: number, ipAddress: any) {
    this.header = 'Sửa địa chỉ IP';
    this.statusForm = 2;
    this.editingIpAddressId = ipAddressId;
    this.editingIpAddress = ipAddress;
    this.customValidate.reset();
    this.inputIpAddressForm.patchValue({
      ipAddress: ipAddress
    });
    this.contentDialogService.open(this.inputIpAddressModalId);
  }

  editIpAddress() {
    if (!this.customValidate.isValidForm()) {
      return;
    }
    if (this.inputIpAddressForm.value.ipAddress != this.editingIpAddress ) {
      this.ipAddressService.checkExistIpAddress(this.inputIpAddressForm.value.ipAddress).subscribe(data => {
        if (data) {
          this.inputIpAddressForm.controls['ipAddress'].setErrors({existIpAddress: true});
        }
        if (!this.customValidate.isValidForm()) {
          return;
        }
        const ipAddress = new IpAddress();
        ipAddress.ipAddressId = this.editingIpAddressId;
        ipAddress.ipAddress = this.inputIpAddressForm.value.ipAddress;
        this.ipAddressService.updateIpAddress(ipAddress).subscribe(data => {
          if (data) {
            this.contentDialogService.close(this.inputIpAddressModalId);
            this.getIpAddressList();
          }
        }, (error) => {

        })
      }, (error) => {

      })
    } else {
      this.contentDialogService.close(this.inputIpAddressModalId);
    }
  }

  showDeleteIpAddressModal(ipAddressId: any) {
    this.deletingIpAddressId = ipAddressId;
    this.contentDialogService.open(this.deleteIpAddressModalId);
  }

  deleteIpAddress() {
    const ipAddress = new IpAddress();
    ipAddress.ipAddressId = this.deletingIpAddressId;
    ipAddress.status = 0;
    this.ipAddressService.deleteIpAddress(ipAddress).subscribe(data => {
      if (data) {
        this.contentDialogService.close(this.deleteIpAddressModalId);
        this.getIpAddressList();
      }
    }, (error) => {

    })
  }

  cancelDeleteIpAddress() {
    this.contentDialogService.close(this.deleteIpAddressModalId);
  }

}
