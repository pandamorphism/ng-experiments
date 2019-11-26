import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';
import {tap} from 'rxjs/operators';

export const ROW_VALUES_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CellRowComponent),
  multi: true,
};

@Component({
  selector: 'form-grid-row',
  providers: [ROW_VALUES_ACCESSOR],
  templateUrl: './cell-row.component.html',
  styleUrls: ['./cell-row.component.scss']
})
export class CellRowComponent implements OnInit, ControlValueAccessor {
  row: FormGroup;
  onChange;
  @Input() columns: string[];

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(obj: any): void {
    console.log('writing row: %O', obj);
    this.row = new FormGroup({});
    Object.entries(obj).forEach(([key, value]) => {
      console.log('adding fc for key: %O val: %O', key, value);
      this.row.addControl(key, new FormControl(value));
    });
    this.row.valueChanges.pipe(
      tap(_ => this.onChange(this.row.getRawValue()))
    ).subscribe();
    console.log('state of formModel(row)', this.row);
  }

  onInput($event) {
    this.onChange($event.target.textContent);
  }
}
