import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  forwardRef,
  OnDestroy,
  OnInit,
  QueryList
} from '@angular/core';
import {ControlValueAccessor, FormArray, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {tap} from 'rxjs/operators';
import {GridMetadataDirective} from './grid-metadata.directive';
import {Subscription} from 'rxjs';

export const ARRAY_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FormGridComponent),
  multi: true,
};

@Component({
  selector: 'app-form-grid',
  providers: [ARRAY_ACCESSOR],
  templateUrl: './form-grid.component.html',
  styleUrls: ['./form-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormGridComponent implements OnInit, OnDestroy, AfterContentInit, ControlValueAccessor {
  @ContentChildren(GridMetadataDirective) gridMetadata: QueryList<GridMetadataDirective>;
  currentValueChangesSubscription: Subscription;
  columns: string[];
  entities: any[];
  onChange;
  form: FormArray;

  constructor(private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(objs: any[]): void {
    console.log('writing objs: %O', objs);
    this.cleanupSubscriptions();
    this.form = new FormArray([]);
    for (const obj of objs) {
      this.form.push(new FormControl(obj));
    }
    this.currentValueChangesSubscription = this.form.valueChanges.pipe(
      tap(_ => this.onChange(this.form.value)),
    )
      .subscribe(); // todo: unsubscribe me
    setTimeout(() => this.cd.detectChanges());
  }

  ngAfterContentInit(): void {
    this.columns = this.gridMetadata.map(directive => directive.gridMetadata);
    console.log('Form grid is using columns: %O', this.columns);
  }

  ngOnDestroy(): void {
    this.cleanupSubscriptions();
  }

  private cleanupSubscriptions() {
    if (this.currentValueChangesSubscription) {
      this.currentValueChangesSubscription.unsubscribe();
    }
  }
}
