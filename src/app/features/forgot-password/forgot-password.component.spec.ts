import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { ForgotPasswordComponent } from './forgot-password.component';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;

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
      ],
      declarations: [ForgotPasswordComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('buildUserRegistrationForm', () => {

    component.forgotPasswordForm = component.buildUserRegistrationForm();

    expect(component.forgotPasswordForm.controls['email']).toBeTruthy();
    expect(Object.keys(component.forgotPasswordForm.controls).length).toBe(1);
  });

  it('receiveCode - valid form', () => {

    component.forgotPasswordForm = component.buildUserRegistrationForm();

    component.forgotPasswordForm.controls['email'].setValue('email@email.com');

    component.receiveCode();

    expect(component.forgotPasswordForm.controls['email'].errors).toBeFalsy();
    expect(component.forgotPasswordForm.valid).toBeTrue();
  });

  it('receiveCode - invalid email', () => {

    component.forgotPasswordForm = component.buildUserRegistrationForm();

    component.forgotPasswordForm.controls['email'].setValue('');

    component.getErrorMessage(component.forgotPasswordForm.controls['email'], 'erro');

    component.receiveCode();

    expect(component.forgotPasswordForm.controls['email'].errors).toBeTruthy();
    expect(component.forgotPasswordForm.valid).toBeFalse();
  });
});
