import {storiesOf} from '@storybook/angular';
import {FormGridModule} from '../app/form-grid/form-grid.module';
import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {tap} from 'rxjs/operators';
import {action} from '@storybook/addon-actions';

storiesOf('FormGrid', module)
  .add('Simple Text Cell Story', () => ({
    moduleMetadata: {
      imports: [FormGridModule, CommonModule, ReactiveFormsModule],
      declarations: [TestCellComponent, TestFormGridHeaderComponent]
    },
    template: `<test-cell (statusChange)="onStatusChange($event)"></test-cell>`,
    props: {
      onStatusChange: action('validationStatus')
    }
  })).add('Simple Form Grid', () => ({
  moduleMetadata: {
    imports: [FormGridModule, CommonModule, ReactiveFormsModule],
    declarations: [TestFormGridHeaderComponent]
  },
  template: `<test-form-grid (formValue)="onFormValue($event)" (formClick)="onFormClick($event)"></test-form-grid>`,
  props: {
    onFormClick: action('formState'),
    onFormValue: action('formValue')
  }
}));


@Component({
  selector: 'test-cell',
  template: `
      <div style="margin-bottom: 20px;">Simple Cell Example</div>
      <form [formGroup]="theForm">
          <app-cell formControlName="name"></app-cell>
      </form>

      <div>Value: {{this.theForm.valueChanges | async | json}}</div>
  `,
})
export class TestCellComponent implements OnInit {
  theForm: FormGroup;
  @Output() statusChange = new EventEmitter();

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.theForm = this.fb.group({
      name: ['test', Validators.required]
    });
    this.theForm.get('name').statusChanges.pipe(
      tap(status => this.statusChange.emit(status))
    ).subscribe();
  }

}

@Component({
  selector: 'test-form-grid',
  template: `
      <div style="margin-bottom: 20px;" (click)="formClick.emit(theForm)">Simple FormGrid Example</div>
      <button (click)="addUser()">Add</button>
      <button (click)="getFormValue()">Get Form Results</button>
      <div [formGroup]="theForm">
          <input type="text" formControlName="id" style="margin-bottom: 20px;">
          <app-form-grid [formGroupArray]="users"></app-form-grid>
      </div>

<!--      <div style="margin-top: 20px;">Value: {{this.theForm.valueChanges | async | json}}</div>-->
  `,
})
export class TestFormGridHeaderComponent implements OnInit {
  theForm: FormGroup;
  @Output() formClick = new EventEmitter();
  @Output() formValue = new EventEmitter();

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.theForm = this.fb.group({
      users: this.fb.array([this._buildUser()]),
      id: ''
    });
    this.theForm.valueChanges.pipe(
      tap(val => this.formValue.emit(JSON.stringify(val))),
      tap(val => console.log('val: %O', val))
    )
      .subscribe();
  }

  addUser() {
    this.users.push(this._buildUser());
  }

  private _buildUser(): FormGroup {
    return this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(18), Validators.max(70)]],
      email: ['', [Validators.email, Validators.required]],
    });
  }

  get users() {
    return this.theForm.get('users') as FormArray;
  }

  getFormValue() {
    this.theForm.markAsDirty({onlySelf: false});
    this.formValue.emit(this.theForm.getRawValue());
  }
}

