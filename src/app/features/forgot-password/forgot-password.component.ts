import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'sn-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.forgotPasswordForm = this.buildUserRegistrationForm();
  }

  receiveCode(): void {
    if (this.forgotPasswordForm.valid) {
      console.log('form valid');
    } else {
      console.log('form invalid');
    }
  }

  buildUserRegistrationForm(): FormGroup {
    return this.formBuilder.group(
      {
        email: [null, [Validators.required]],
      }
    );
  }

  getErrorMessage(control: any, message: string) {
    if (control.hasError('required')) {
      return message;
    }

    return '';
  }

}
