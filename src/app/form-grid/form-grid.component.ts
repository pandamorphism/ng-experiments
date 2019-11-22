import {Component, forwardRef, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

export const FORM_GRID_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FormGridComponent),
  multi: true,
};

@Component({
  selector: 'app-form-grid',
  providers: [FORM_GRID_VALUE_ACCESSOR],
  templateUrl: './form-grid.component.html',
  styleUrls: ['./form-grid.component.scss']
})
export class FormGridComponent implements OnInit, ControlValueAccessor {
  header: string[];
  entities: any[];
  onChange;

  ngOnInit(): void {

  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(obj: any[]): void {
    this.entities = obj;
  }
}
