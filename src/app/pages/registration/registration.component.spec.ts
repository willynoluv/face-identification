import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { RouterTestingModule } from '@angular/router/testing';
import { NotifierModule } from 'angular-notifier';
import { ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationComponent } from './registration.component';
import { customNotifierOptions } from 'notifierConfig';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        NotifierModule.withConfig(customNotifierOptions),
        RouterTestingModule
      ],
      declarations: [ RegistrationComponent ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Registration form should be invalid', () => {
    component.registrationForm.controls['email'].setValue(`u-${Date.now()}@`);
    component.registrationForm.controls['password'].setValue(`${Date.now()}`);
    component.registrationForm.controls['rePassword'].setValue(`${Date.now()}`);
    expect(component.registrationForm.valid).toBeFalsy();
  });

  it('Registration form should be valid', () => {
    component.registrationForm.controls['email'].setValue(`u-${Date.now()}@gmail.com`);
    const password = `P@$$w${Date.now()}`;
    component.registrationForm.controls['password'].setValue(password);
    component.registrationForm.controls['rePassword'].setValue(password);
    expect(component.registrationForm.valid).toBeTruthy();
  });

});
