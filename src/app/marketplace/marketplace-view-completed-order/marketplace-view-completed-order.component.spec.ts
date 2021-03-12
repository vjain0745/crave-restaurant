import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketplaceViewCompletedOrderComponent } from './marketplace-view-completed-order.component';

describe('MarketplaceViewCompletedOrderComponent', () => {
  let component: MarketplaceViewCompletedOrderComponent;
  let fixture: ComponentFixture<MarketplaceViewCompletedOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketplaceViewCompletedOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketplaceViewCompletedOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
