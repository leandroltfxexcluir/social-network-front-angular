import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { UserRegistrationComponent } from './user-registration.component';

describe('UserRegistrationComponent', () => {
  let component: UserRegistrationComponent;
  let fixture: ComponentFixture<UserRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        RouterTestingModule,

        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
      ],
      declarations: [UserRegistrationComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('buildUserRegistrationForm', () => {

    component.userRegistrationForm = component.buildUserRegistrationForm();

    expect(component.userRegistrationForm.controls['name']).toBeTruthy();
    expect(component.userRegistrationForm.controls['email']).toBeTruthy();
    expect(component.userRegistrationForm.controls['password']).toBeTruthy();
    expect(component.userRegistrationForm.controls['confirmPassword']).toBeTruthy();
    expect(Object.keys(component.userRegistrationForm.controls).length).toBe(4);
  });

  it('registerUser - valid form', () => {

    component.userRegistrationForm = component.buildUserRegistrationForm();

    component.userRegistrationForm.controls['name'].setValue('name');
    component.userRegistrationForm.controls['email'].setValue('email@email.com');
    component.userRegistrationForm.controls['password'].setValue('asd123');
    component.userRegistrationForm.controls['confirmPassword'].setValue('asd123');

    component.registerUser();

    expect(component.userRegistrationForm.valid).toBeTrue();
  });

  it('registerUser - invalid name', () => {

    component.userRegistrationForm = component.buildUserRegistrationForm();

    component.userRegistrationForm.controls['name'].setValue('ab');
    component.userRegistrationForm.controls['email'].setValue('email@email.com');
    component.userRegistrationForm.controls['password'].setValue('asd123');
    component.userRegistrationForm.controls['confirmPassword'].setValue('asd123');

    for (const key in component.userRegistrationForm.controls) {
      component.getErrorMessage(
        component.userRegistrationForm.controls[key],
        'erro',
        key
      );
    }

    component.registerUser();

    expect(component.userRegistrationForm.controls['name'].errors).toBeTruthy();
    expect(component.userRegistrationForm.controls['email'].errors).toBeFalsy();
    expect(component.userRegistrationForm.controls['password'].errors).toBeFalsy();
    expect(component.userRegistrationForm.controls['confirmPassword'].errors).toBeFalsy();
    expect(component.userRegistrationForm.valid).toBeFalse();
  });

  it('registerUser - invalid email', () => {

    component.userRegistrationForm = component.buildUserRegistrationForm();

    component.userRegistrationForm.controls['name'].setValue('name');
    component.userRegistrationForm.controls['email'].setValue('emailemail.com');
    component.userRegistrationForm.controls['password'].setValue('asd123');
    component.userRegistrationForm.controls['confirmPassword'].setValue('asd123');

    for (const key in component.userRegistrationForm.controls) {
      component.getErrorMessage(
        component.userRegistrationForm.controls[key],
        'erro',
        key
      );
    }

    component.registerUser();

    expect(component.userRegistrationForm.controls['name'].errors).toBeFalsy();
    expect(component.userRegistrationForm.controls['email'].errors).toBeTruthy();
    expect(component.userRegistrationForm.controls['password'].errors).toBeFalsy();
    expect(component.userRegistrationForm.controls['confirmPassword'].errors).toBeFalsy();
    expect(component.userRegistrationForm.valid).toBeFalse();
  });

  it('registerUser - invalid password', () => {

    component.userRegistrationForm = component.buildUserRegistrationForm();

    component.userRegistrationForm.controls['name'].setValue('name');
    component.userRegistrationForm.controls['email'].setValue('email@email.com');
    component.userRegistrationForm.controls['password'].setValue('asdasd');
    component.userRegistrationForm.controls['confirmPassword'].setValue('asdasd');

    for (const key in component.userRegistrationForm.controls) {
      component.getErrorMessage(
        component.userRegistrationForm.controls[key],
        'erro',
        key
      );
    }

    component.registerUser();

    expect(component.userRegistrationForm.controls['name'].errors).toBeFalsy();
    expect(component.userRegistrationForm.controls['email'].errors).toBeFalsy();
    expect(component.userRegistrationForm.controls['password'].errors).toBeTruthy();
    expect(component.userRegistrationForm.controls['confirmPassword'].errors).toBeFalsy();
    expect(component.userRegistrationForm.valid).toBeFalse();
  });

  it('registerUser - invalid confirm password', () => {

    component.userRegistrationForm = component.buildUserRegistrationForm();

    component.userRegistrationForm.controls['name'].setValue('name');
    component.userRegistrationForm.controls['email'].setValue('email@email.com');
    component.userRegistrationForm.controls['password'].setValue('asd123');
    component.userRegistrationForm.controls['confirmPassword'].setValue('asd12');

    for (const key in component.userRegistrationForm.controls) {
      component.getErrorMessage(
        component.userRegistrationForm.controls[key],
        'erro',
        key
      );
    }

    component.registerUser();

    expect(component.userRegistrationForm.controls['name'].errors).toBeFalsy();
    expect(component.userRegistrationForm.controls['email'].errors).toBeFalsy();
    expect(component.userRegistrationForm.controls['password'].errors).toBeFalsy();
    expect(component.userRegistrationForm.controls['confirmPassword'].errors).toBeTruthy();
    expect(component.userRegistrationForm.valid).toBeFalse();
  });
});
