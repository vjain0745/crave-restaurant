import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketplaceCancelledComponent } from './marketplace-cancelled.component';

describe('MarketplaceCancelledComponent', () => {
  let component: MarketplaceCancelledComponent;
  let fixture: ComponentFixture<MarketplaceCancelledComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketplaceCancelledComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketplaceCancelledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
