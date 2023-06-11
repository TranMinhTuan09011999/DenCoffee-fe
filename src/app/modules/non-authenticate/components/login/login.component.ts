import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomHandleValidate} from "../../../admin/util/custom-handle-validate";
import {JwtRequestDTO} from "../../../admin/models/JwtRequestDTO";
import {NonAuthenticateService} from "../../../admin/services/non-authenticate.service";
import {RouterConstant} from "../../../admin/constant/router-constant";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public messageError!: string;

  public loginForm!: FormGroup;
  public customValidate!: CustomHandleValidate;

  constructor(private formBuilder: FormBuilder,
              private nonAuthenticateService: NonAuthenticateService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.customValidate = new CustomHandleValidate(this.loginForm);
  }

  hasError(key: string, errorCode: string) {
    return this.customValidate.hasError(key, errorCode);
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
        this.toLoginPage();
      }
    }, (error) => {
      this.messageError = '* Tên đăng nhập hoặc mật khẩu không đúng!'
    });
  }

  toLoginPage() {
    this.router.navigate([RouterConstant.DEN_COFFEE.path, RouterConstant.ATTENDANCE.path]).then();
  }
}
