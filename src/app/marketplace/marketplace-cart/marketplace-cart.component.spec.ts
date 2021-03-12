import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketplaceCartComponent } from './marketplace-cart.component';

describe('MarketplaceCartComponent', () => {
  let component: MarketplaceCartComponent;
  let fixture: ComponentFixture<MarketplaceCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketplaceCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketplaceCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
