import {Component, forwardRef, Input, OnDestroy, OnInit} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';
import {tap} from 'rxjs/operators';
import {Subscription} from 'rxjs';

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
export class CellRowComponent implements OnInit, OnDestroy, ControlValueAccessor {
  row: FormGroup;
  onChange;
  private currentRowSubscription: Subscription;
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

  ngOnDestroy(): void {
    this.cleanupSubscriptions();
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(obj: any): void {
    console.log('writing row: %O', obj);
    this.cleanupSubscriptions();
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

  private cleanupSubscriptions() {
    if (this.currentRowSubscription) {
      this.currentRowSubscription.unsubscribe();
    }
  }

}
