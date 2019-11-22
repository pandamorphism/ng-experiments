import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormGridComponent} from './form-grid.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CellComponent} from './cell/cell.component';


@NgModule({
  declarations: [FormGridComponent, CellComponent],
  exports: [FormGridComponent, CellComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class FormGridModule {
}
