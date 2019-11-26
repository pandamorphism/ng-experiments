import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormGridComponent} from './form-grid.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CellRowComponent} from './cell/cell-row.component';
import { GridMetadataDirective } from './grid-metadata.directive';
import { CellComponent } from './cell/cell.component';


@NgModule({
  declarations: [FormGridComponent, CellRowComponent, GridMetadataDirective, CellComponent],
  exports: [FormGridComponent, CellRowComponent, GridMetadataDirective],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class FormGridModule {
}
