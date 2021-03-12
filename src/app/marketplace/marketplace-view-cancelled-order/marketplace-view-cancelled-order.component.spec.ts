import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketplaceViewCancelledOrderComponent } from './marketplace-view-cancelled-order.component';

describe('MarketplaceViewCancelledOrderComponent', () => {
  let component: MarketplaceViewCancelledOrderComponent;
  let fixture: ComponentFixture<MarketplaceViewCancelledOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketplaceViewCancelledOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketplaceViewCancelledOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
