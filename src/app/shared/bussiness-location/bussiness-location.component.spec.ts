import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BussinessLocationComponent } from './bussiness-location.component';

describe('BussinessLocationComponent', () => {
  let component: BussinessLocationComponent;
  let fixture: ComponentFixture<BussinessLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BussinessLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BussinessLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
