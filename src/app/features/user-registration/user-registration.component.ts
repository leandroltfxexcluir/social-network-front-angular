import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'sn-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;
  userRegistrationForm!: FormGroup;
  patternEmail: RegExp = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  patternPassword: RegExp = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.userRegistrationForm = this.buildUserRegistrationForm();
  }

  registerUser(): void {
    if (this.userRegistrationForm.valid) {
      console.log('form valid');
    } else {
      console.log('form invalid');
    }
  }

  buildUserRegistrationForm(): FormGroup {
    return this.formBuilder.group(
      {
        name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
        email: [null, [Validators.required, Validators.pattern(this.patternEmail), Validators.maxLength(100)]],
        password: [null, [Validators.required, Validators.pattern(this.patternPassword), Validators.maxLength(100)]],
        confirmPassword: [null, [Validators.required, this.confirmationValidator]],
      }
    );
  }

  getErrorMessage(control: any, message: string, fieldName: string = '') {

    if (control.hasError('required')) {
      return message;
    }

    if (control.hasError('confirm')) {
      return 'Senhas inconsistentes';
    }

    if (control.hasError('pattern')) {
      if (fieldName === 'email') {
        return 'Email inválido';
      }
      if (fieldName === 'password') {
        return 'A senha deve conter no mínimo 6 dígitos com números e letras';
      }
    }

    if (control.hasError('minlength')) {
      return 'O nome deve ter no mínimo 3 caracteres';
    }

    if (control.hasError('maxlength')) {
      if (fieldName === 'name') {
        return 'O nome não deve ultrapassar os 100 caracteres';
      }
      if (fieldName === 'email') {
        return 'O email não deve ultrapassar os 100 caracteres';
      }
      if (fieldName === 'password') {
        return 'A senha não deve ultrapassar os 100 caracteres';
      }
    }

    return '';
  }

  updateConfirmValidator(): void {
    Promise.resolve().then(() => this.userRegistrationForm.controls['confirmPassword'].updateValueAndValidity());
  }

  confirmationValidator: ValidatorFn = (control: AbstractControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.userRegistrationForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
    return {};
  };

}
