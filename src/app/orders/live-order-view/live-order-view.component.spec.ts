import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveOrderViewComponent } from './live-order-view.component';

describe('LiveOrderViewComponent', () => {
  let component: LiveOrderViewComponent;
  let fixture: ComponentFixture<LiveOrderViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveOrderViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveOrderViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
