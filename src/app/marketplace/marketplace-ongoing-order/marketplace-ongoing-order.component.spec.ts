import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketplaceOngoingOrderComponent } from './marketplace-ongoing-order.component';

describe('MarketplaceOngoingOrderComponent', () => {
  let component: MarketplaceOngoingOrderComponent;
  let fixture: ComponentFixture<MarketplaceOngoingOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketplaceOngoingOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketplaceOngoingOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
