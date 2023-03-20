import {Component, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {ContentDialogService} from "../../../../components/content-dialog/content-dialog.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public modalId = 'modalId';
  public header = 'Đăng Nhập';

  constructor(@Inject(DOCUMENT) private document: Document,
              private contentDialogService: ContentDialogService) { }

  ngOnInit(): void {
  }

  sidebarToggle() {
    //toggle sidebar function
    this.document.body.classList.toggle('toggle-sidebar');
  }

  loginForm() {
    this.contentDialogService.open(this.modalId);
  }

}
