import {Component, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {ContentDialogService} from "../../../../components/content-dialog/content-dialog.service";
import {NonAuthenticateService} from "../../services/non-authenticate.service";
import {JwtRequestDTO} from "../../models/JwtRequestDTO";
import {SessionAttribute} from "../../constant/session-attribute";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomHandleValidate} from "../../util/custom-handle-validate";
import {AuthorizeService} from "../../services/authorize.service";
import {Router} from "@angular/router";
import {RouterConstant} from "../../constant/router-constant";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public modalId = 'modalId';
  public header = 'Đăng Nhập';
  public messageError!: string;

  public loginForm!: FormGroup;
  public customValidate!: CustomHandleValidate;

  constructor(@Inject(DOCUMENT) private document: Document,
              private contentDialogService: ContentDialogService,
              private nonAuthenticateService: NonAuthenticateService,
              private formBuilder: FormBuilder,
              private authorizeService: AuthorizeService,
              private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.customValidate = new CustomHandleValidate(this.loginForm);
    $(() => {
      (window as any).showMain();
    });
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
    if (!this.customValidate.isValidForm()) {
      return;
    }
    const dataLogin = this.loginForm.value;
    const jwtRequestDTO = new JwtRequestDTO();
    jwtRequestDTO.username = dataLogin.username;
    jwtRequestDTO.password = dataLogin.password;
    this.nonAuthenticateService.login(jwtRequestDTO).subscribe(data => {
      if (data) {
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
    this.router.navigate([RouterConstant.DEN_COFFEE.path, RouterConstant.DASHBOARD.path]);
    window.location.reload();
  }

  hasError(key: string, errorCode: string) {
    return this.customValidate.hasError(key, errorCode);
  }

}
