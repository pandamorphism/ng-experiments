import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-grid-example',
  templateUrl: './grid-example.component.html',
  styleUrls: ['./grid-example.component.scss']
})
export class GridExampleComponent implements OnInit {
  theForm: FormGroup;
  @Output() formClick = new EventEmitter();
  @Output() formValue = new EventEmitter();

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.theForm = this.fb.group({
      // users: this.fb.array([this._buildUser()]),
      users: new FormControl([{firstName: '1', lastName: '2', email: '', age: null}, {
        firstName: '3',
        lastName: '4',
        email: '',
        age: null
      }]),
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
      firstName: ['', {validators: [Validators.required, Validators.minLength(3)]}],
      lastName: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(18), Validators.max(70)]],
      email: ['', [Validators.email, Validators.required]],
    });
  }

  get users() {
    return this.theForm.get('users') as FormArray;
  }

  getFormValue() {
    this.formValue.emit(this.theForm.getRawValue());
  }

}
