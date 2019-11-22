import {storiesOf} from '@storybook/angular';
import {FormGridModule} from '../app/form-grid/form-grid.module';
import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
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
  template: `<test-form-grid (formClick)="onFormClick($event)"></test-form-grid>`,
  props: {
    onFormClick: action('formState')
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
      <div [formGroup]="theForm">
          <input type="text" formControlName="id">
          <app-form-grid formArrayName="users"></app-form-grid>
      </div>

      <div>Value: {{this.theForm.valueChanges | async | json}}</div>
  `,
})
export class TestFormGridHeaderComponent implements OnInit {
  theForm: FormGroup;
  @Output() formClick = new EventEmitter();

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.theForm = this.fb.group({
      users: this.fb.array([
        this.fb.group({
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          email: ['', Validators.required],
        })]),
      id: [{value: '3', disabled: true}, Validators.required]
    });
  }
}

