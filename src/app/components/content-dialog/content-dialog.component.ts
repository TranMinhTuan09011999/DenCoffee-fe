import {Component, Input, OnInit, Output, TemplateRef, ViewChild, ViewContainerRef, EventEmitter} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {ContentDialogService} from "./content-dialog.service";
import * as $ from 'jquery';

@Component({
  selector: 'app-content-dialog',
  templateUrl: './content-dialog.component.html',
  styleUrls: ['./content-dialog.component.css']
})
export class ContentDialogComponent implements OnInit {

  // To using this component into a modules, we create a shared module to call this component
  @Input() id!: string;
  @Input() isCompletionModal = false;
  @Input() header!: string;
  @Input() width: any;
  @Input() body!: TemplateRef<any>;
  @Input() footer!: TemplateRef<any>;

  public contentId!: string;

  @ViewChild('bodyContainer', { read: ViewContainerRef, static: true }) bodyContainer!: ViewContainerRef;
  @ViewChild('footerContainer', { read: ViewContainerRef, static: true }) footerContainer!: ViewContainerRef;

  constructor(private contentDialogService: ContentDialogService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    const model = this;
    this.contentDialogService.setModel(model);
    this.contentId = `${this.id}-content`;
    this.bodyContainer.createEmbeddedView(this.body);
    this.footerContainer.createEmbeddedView(this.footer);
  }

  open = (dlgId: string) => {
    this.close(() => {
      if (dlgId === undefined) {
        dlgId = this.id;
      }
      // @ts-ignore
      document.getElementById(`${dlgId}`).click();
      if (this.isCompletionModal) {
        $('[autofocus]').focus();
      }
    });
  }

  close = (cb: any) => {
    // close all modal
    const elements: any = document.getElementsByClassName('m-modal-content');
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.display = 'none';
    }
    this.onClose(cb);
  }

  onClose = (cb?: any) => {
    if (cb && typeof cb === 'function') {
      cb();
    }
  }

  setWidth() {
    let style = '';
    if (this.width) {
      style = style.concat('width: ' + this.width + ';');
    }
    return this.sanitizer.bypassSecurityTrustStyle(style);
  }

  closeModal() {
    $(".btn-close").trigger('click');
  }

}
