import { Injectable } from '@angular/core';
import {throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ContentDialogService {

  private model: any;
  private lstModal: Array<{modalId: string, modalRef: any}> = [];

  private defaultId = 'dlg-default';

  constructor() { }

  setModel = (modelRef: any) => {
    this.model = modelRef;
    let id = modelRef['id'];
    if (!id) {
      id = this.defaultId;
    }
    this.lstModal.push({modalId: id, modalRef: modelRef});
  }

  open = (dlgId?: string) => {
    if (dlgId !== undefined) {
      const tmpModal = this.getModal(dlgId);
      tmpModal.modalRef.open(dlgId);
    } else {
      this.model.open(dlgId);
    }
  }

  private getModal(dlgId: string): any {
    let tmpId = this.defaultId;
    if (dlgId) {
      tmpId = dlgId;
    }
    const modal = this.lstModal.find(m => m.modalId === tmpId);
    if (modal) {
      return modal;
    } else {
      throwError('can not get modal');
    }
  }

  close = (dlgId?: string) => {
    if (dlgId !== undefined) {
      const tmpModal = this.getModal(dlgId);
      if (tmpModal && tmpModal.modalRef) {
        tmpModal.modalRef.close();
      }
    } else {
      this.model.close();
    }
  }
}
