import {Component, forwardRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

export const CELL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CellComponent),
  multi: true,
};

@Component({
  selector: 'app-cell',
  providers: [CELL_VALUE_ACCESSOR],
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit, ControlValueAccessor {

  @ViewChild('cell', {static: true}) cell;
  onChange;

  constructor(private renderer: Renderer2) {
  }

  ngOnInit() {
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
    const div = this.cell.nativeElement;
    const action = isDisabled ? 'addClass' : 'removeClass';
    this.renderer[action](div, 'disabled');
  }

  writeValue(obj: any): void {
    const div = this.cell.nativeElement;
    this.renderer.setProperty(div, 'textContent', obj);
  }

}
