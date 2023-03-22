import {Component, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {ContentDialogService} from "../../../../components/content-dialog/content-dialog.service";
import {NonAuthenticateService} from "../../services/non-authenticate.service";
import {JwtRequestDTO} from "../../models/JwtRequestDTO";
import {SessionAttribute} from "../../constant/session-attribute";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomHandleValidate} from "../../util/custom-handle-validate";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public modalId = 'modalId';
  public header = 'Đăng Nhập';
  public messageError!: string

  public loginForm!: FormGroup;
  public customValidate!: CustomHandleValidate;

  constructor(@Inject(DOCUMENT) private document: Document,
              private contentDialogService: ContentDialogService,
              private nonAuthenticateService: NonAuthenticateService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.customValidate = new CustomHandleValidate(this.loginForm);
  }

  sidebarToggle() {
    //toggle sidebar function
    this.document.body.classList.toggle('toggle-sidebar');
  }

  loginModal() {
    this.contentDialogService.open(this.modalId);
  }

  login() {
    console.log(this.customValidate);
    if (!this.customValidate.isValidForm()) {
      this.messageError = '* Sai tên đăng nhập hoặc mật khẩu!'
      return;
    }
    const dataPayload = this.loginForm.value;
    console.log(dataPayload);
    const jwtRequestDTO = new JwtRequestDTO();
    jwtRequestDTO.username = 'minhtuan123';
    jwtRequestDTO.password = 'minhtuan123';
    console.log(jwtRequestDTO);
    this.nonAuthenticateService.login(jwtRequestDTO).subscribe(data => {
      if (data) {
        console.log(data);
        sessionStorage.setItem(SessionAttribute.TOKEN, data.token);
        sessionStorage.setItem(SessionAttribute.ROLES, JSON.stringify(data.roles))
      }
    }, (error) => {

    });
  }

}
