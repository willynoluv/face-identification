import { RouterTestingModule } from '@angular/router/testing';
import { NotifierModule } from 'angular-notifier';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { customNotifierOptions } from 'notifierConfig';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        NotifierModule.withConfig(customNotifierOptions),
        RouterTestingModule
      ],
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Login form should be invalid', () => {
    component.loginForm.controls['email'].setValue(`u-${Date.now()}@`);
    component.loginForm.controls['password'].setValue(`${Date.now()}`);
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('login form should be valid', () => {
    component.loginForm.controls['email'].setValue(`u-${Date.now()}@gmail.com`);
    const password = `P@$$w${Date.now()}`;
    component.loginForm.controls['password'].setValue(password);
    expect(component.loginForm.valid).toBeTruthy();
  });
});
