import { ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaceIdentificationComponent } from './face-identification.component';

describe('FaceIdentificationComponent', () => {
  let component: FaceIdentificationComponent;
  let fixture: ComponentFixture<FaceIdentificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        // NotifierModule.withConfig(customNotifierOptions),
        // RouterTestingModule
      ],
      declarations: [ FaceIdentificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaceIdentificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Url should be valid', () => {
    component.identificationForm.controls['url'].setValue(`https://google.fr`);
    const urlStatus = component.isUrlValid(component.identificationForm.controls['url'].value);
    expect(urlStatus).toBeTrue();
  });

  it('Url should be invalid', () => {
    component.identificationForm.controls['url'].setValue(`testurl`);
    const urlStatus = component.isUrlValid(component.identificationForm.controls['url'].value);
    expect(urlStatus).toBeFalse();
  });
});
