import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketplacePaymentGatewayComponent } from './marketplace-payment-gateway.component';

describe('MarketplacePaymentGatewayComponent', () => {
  let component: MarketplacePaymentGatewayComponent;
  let fixture: ComponentFixture<MarketplacePaymentGatewayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketplacePaymentGatewayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketplacePaymentGatewayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
