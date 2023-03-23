import {Component, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {ContentDialogService} from "../../../../components/content-dialog/content-dialog.service";
import {NonAuthenticateService} from "../../services/non-authenticate.service";
import {JwtRequestDTO} from "../../models/JwtRequestDTO";
import {SessionAttribute} from "../../constant/session-attribute";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomHandleValidate} from "../../util/custom-handle-validate";
import {AuthorizeService} from "../../services/authorize.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public modalId = 'modalId';
  public header = 'Đăng Nhập';
  public messageError!: string;
  public hasRoleAdmin!: boolean;

  public loginForm!: FormGroup;
  public customValidate!: CustomHandleValidate;

  constructor(@Inject(DOCUMENT) private document: Document,
              private contentDialogService: ContentDialogService,
              private nonAuthenticateService: NonAuthenticateService,
              private formBuilder: FormBuilder,
              private authorizeService: AuthorizeService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.customValidate = new CustomHandleValidate(this.loginForm);
  }

  hasRole(roles: any) {
    return this.authorizeService.hasRole(roles);
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
      return;
    }
    const dataLogin = this.loginForm.value;
    console.log(dataLogin);
    const jwtRequestDTO = new JwtRequestDTO();
    jwtRequestDTO.username = dataLogin.username;
    jwtRequestDTO.password = dataLogin.password;
    console.log(jwtRequestDTO);
    this.nonAuthenticateService.login(jwtRequestDTO).subscribe(data => {
      if (data) {
        console.log(data);
        sessionStorage.setItem(SessionAttribute.TOKEN, data.token);
        sessionStorage.setItem(SessionAttribute.ROLES, JSON.stringify(data.roles))
        window.location.reload();
      }
    }, (error) => {
      this.messageError = '* Tên đăng nhập hoặc mật khẩu không đúng!'
    });
  }

  logout() {
    sessionStorage.removeItem(SessionAttribute.TOKEN);
    sessionStorage.removeItem(SessionAttribute.ROLES)
    window.location.reload();
  }

  hasError(key: string, errorCode: string) {
    return this.customValidate.hasError(key, errorCode);
  }

}
