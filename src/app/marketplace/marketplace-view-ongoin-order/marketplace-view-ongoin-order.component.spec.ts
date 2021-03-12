import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketplaceViewOngoinOrderComponent } from './marketplace-view-ongoin-order.component';

describe('MarketplaceViewOngoinOrderComponent', () => {
  let component: MarketplaceViewOngoinOrderComponent;
  let fixture: ComponentFixture<MarketplaceViewOngoinOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketplaceViewOngoinOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketplaceViewOngoinOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
