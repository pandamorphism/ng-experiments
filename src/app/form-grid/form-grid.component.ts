import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-form-grid',
  templateUrl: './form-grid.component.html',
  styleUrls: ['./form-grid.component.scss']
})
export class FormGridComponent implements OnInit {
  header: string[];
  entities: any[];
  onChange;
  form: FormGroup;
  @Input() formGroupArray: FormArray;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    console.log('input: %O', this.formGroupArray);
    this.form = this.fb.group({
      array: this.formGroupArray
    });
  }

  get array(): FormArray {
    return this.form.get('array') as FormArray;
  }
}
