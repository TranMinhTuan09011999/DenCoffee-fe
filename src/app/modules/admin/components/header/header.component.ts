import {Component, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {ContentDialogService} from "../../../../components/content-dialog/content-dialog.service";
import {NonAuthenticateService} from "../../services/non-authenticate.service";
import {FormBuilder} from "@angular/forms";
import {AuthorizeService} from "../../services/authorize.service";
import {Router} from "@angular/router";
import {RouterConstant} from "../../constant/router-constant";
import {Role} from "../../constant/role.enum";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private ADMIN = "Admin";
  private USER = "User";

  public messageError!: string;

  public hasAdminRole!: any;
  public hasUserRole!: any;

  public roleName!: any;

  constructor(@Inject(DOCUMENT) private document: Document,
              private contentDialogService: ContentDialogService,
              private nonAuthenticateService: NonAuthenticateService,
              private formBuilder: FormBuilder,
              private authorizeService: AuthorizeService,
              private router: Router) {
  }

  async ngOnInit() {
    $(() => {
      (window as any).showMain();
    });
    this.hasAdminRole = await this.authorizeService.hasPermission(Role.ADMIN).toPromise();
    this.hasUserRole = await this.authorizeService.hasPermission(Role.USER).toPromise();
  }

  sidebarToggle() {
    //toggle sidebar function
    this.document.body.classList.toggle('toggle-sidebar');
  }

  logout() {
    this.nonAuthenticateService.logout().subscribe(data => {
      this.router.navigate([RouterConstant.DEN_COFFEE.path, RouterConstant.LOGIN.path]).then();
    });
  }

  getRoleName() {
    if (this.hasAdminRole) {
      return this.ADMIN;
    }
    if (this.hasUserRole) {
      return this.USER;
    }
    return null;
  }

}
