import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Otp2Component } from './otp2.component';

describe('Otp2Component', () => {
  let component: Otp2Component;
  let fixture: ComponentFixture<Otp2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Otp2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Otp2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
