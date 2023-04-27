import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  fields = [
    { id: 1, name: 'field1', label: 'Field 1' },
    { id: 5, name: 'field2', label: 'Field 2' },
    { id: 3, name: 'field3', label: 'Field 3' },
  ];

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({});
    this.fields.forEach((field) => {
      this.form.addControl(field.id + '_accept', new FormControl(false));
      this.form.addControl(field.id + '_reject', new FormControl(false));
    });
  }

  onSubmit() {
    const statuses = {};
    var has_error = 0;
    this.fields.forEach((field) => {
      if (this.form.get(field.id + '_accept').value) {
        statuses[field.id] = 1;
        // console.log('status of', field.id, 'is', 1);
      } else if (this.form.get(field.id + '_reject').value) {
        statuses[field.id] = 0;
        // console.log('status of', field.id, 'is', 0);
      } else {
        //error promt to select one
        console.log('error');
        has_error = 1;
        statuses[field.id] = null;
        return -1;
      }
    });
    if (has_error == 0) {
      for (var i = 0; i < this.fields.length; i++)
        console.log(
          'status of',
          this.fields[i].id,
          'is',
          statuses[this.fields[i].id]
        );
    }
  }

  onAcceptAll() {
    this.fields.forEach((field) => {
      this.form.get(field.id + '_accept').setValue(true);
      this.form.get(field.id + '_reject').setValue(false);
    });
  }

  onRejectAll() {
    this.fields.forEach((field) => {
      this.form.get(field.id + '_accept').setValue(false);
      this.form.get(field.id + '_reject').setValue(true);
    });
  }

  onCheckboxChange(fieldName: string, checkboxType: string) {
    const acceptControl = this.form.get(fieldName + '_accept');
    const rejectControl = this.form.get(fieldName + '_reject');
    if (checkboxType === 'accept' && acceptControl.value) {
      rejectControl.setValue(false);
    } else if (checkboxType === 'reject' && rejectControl.value) {
      acceptControl.setValue(false);
    }
  }
}
