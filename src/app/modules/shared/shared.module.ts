import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ContentDialogComponent} from "../../components/content-dialog/content-dialog.component";


@NgModule({
  declarations: [
    ContentDialogComponent
  ],
  exports: [
    ContentDialogComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
