import {storiesOf} from '@storybook/angular';
import {FormGridModule} from '../app/form-grid/form-grid.module';
import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {filter, pluck, tap} from 'rxjs/operators';
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
    imports: [FormGridModule, ReactiveFormsModule, CommonModule],
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
<!--      <form [formGroup]="theForm">-->
<!--          <app-cell formControlName="name"></app-cell>-->
<!--      </form>-->

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

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
};

@Component({
  selector: 'test-form-grid',
  template: `
      <div style="margin-bottom: 20px;" (click)="formClick.emit(theForm)">Simple FormGrid Example</div>
      <button (click)="addUser()">Add</button>
      <button (click)="removeLastUser()">Remove Last</button>
      <button (click)="getFormValue()">Get Form Results</button>
      <div [formGroup]="theForm">
          <input type="text" formControlName="id" style="margin-bottom: 20px;">
          <app-form-grid formControlName="users">
              <div grid-meta>
                  <div class="t-header" *gridMetadata="'firstName'">First Name</div>
                  <div class="t-header" *gridMetadata="'lastName'">Last Name</div>
                  <div class="t-header" *gridMetadata="'email'">Email</div>
                  <div class="t-header" *gridMetadata="'age'">Age</div>
              </div>
          </app-form-grid>
      </div>
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
      users: new FormControl([]),
      id: ''
    });

    function isNotEmpty(user?: User): boolean {
      if (user) {
        return user.email.length > 0 || user.lastName.length > 0 || user.firstName.length > 0 || user.age > 0;
      }
      return false;
    }
  }

  addUser() {
    const users = [...this.theForm.get('users').value, this._buildUser()];
    this.theForm.patchValue({users});
  }

  removeLastUser() {
    const users = [...this.theForm.get('users').value];
    if (users.length) {
      users.pop();
      this.theForm.patchValue({users});
    }
  }

  private _buildUser(): User {
    return {firstName: '', lastName: '', email: '', age: null};
  }

  get users() {
    return this.theForm.get('users') as FormArray;
  }

  getFormValue() {
    this.formValue.emit(this.theForm.getRawValue());
  }
}

