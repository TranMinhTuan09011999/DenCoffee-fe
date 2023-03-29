import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ContentDialogComponent} from "../../components/content-dialog/content-dialog.component";
import {PaginationComponent} from "../../components/pagination/pagination.component";


@NgModule({
  declarations: [
    ContentDialogComponent,
    PaginationComponent
  ],
  exports: [
    ContentDialogComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
