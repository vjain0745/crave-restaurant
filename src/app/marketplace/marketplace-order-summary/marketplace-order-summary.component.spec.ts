import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketplaceOrderSummaryComponent } from './marketplace-order-summary.component';

describe('MarketplaceOrderSummaryComponent', () => {
  let component: MarketplaceOrderSummaryComponent;
  let fixture: ComponentFixture<MarketplaceOrderSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketplaceOrderSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketplaceOrderSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
