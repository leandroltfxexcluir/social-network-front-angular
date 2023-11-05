import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
    
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
      ],
      declarations: [ LoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('buildLoginForm', () => {

    component.loginForm = component.buildLoginForm();

    expect(component.loginForm.controls['email']).toBeTruthy();
    expect(component.loginForm.controls['password']).toBeTruthy();
    expect(Object.keys(component.loginForm.controls).length).toBe(2);
  });

  it('login - form valid', () => {

    component.loginForm = component.buildLoginForm();

    component.loginForm.controls['email'].setValue('email@email.com');
    component.loginForm.controls['password'].setValue('asd123');

    component.login();

    expect(component.loginForm.valid).toBeTrue();
  });

  it('login - form invalid', () => {

    component.loginForm = component.buildLoginForm();

    component.loginForm.controls['email'].setValue('email@email.com');
    component.loginForm.controls['password'].setValue('');

    component.login();

    expect(component.loginForm.valid).toBeFalse();
  });

  it('getErrorMessage - filled field', () => {

    component.loginForm = component.buildLoginForm();

    component.loginForm.controls['email'].setValue('email@email.com');

    const result = component.getErrorMessage(component.loginForm.controls['email'], 'Informe seu email');

    expect(result).toBe('');
  });
});
