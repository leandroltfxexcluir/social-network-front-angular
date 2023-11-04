import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'sn-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hidePassword: boolean = true;
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loginForm = this.buildLoginForm();    
  }

  login(): void {
    if (this.loginForm.valid) {
      console.log('form valid');
    } else {
      console.log('form invalid');
    }
  }

  buildLoginForm(): FormGroup {
    return this.formBuilder.group(
      {
        email: [null, Validators.required],
        password: [null, Validators.required],
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
