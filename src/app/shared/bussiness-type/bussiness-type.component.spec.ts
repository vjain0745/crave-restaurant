import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BussinessTypeComponent } from './bussiness-type.component';

describe('BussinessTypeComponent', () => {
  let component: BussinessTypeComponent;
  let fixture: ComponentFixture<BussinessTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BussinessTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BussinessTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
