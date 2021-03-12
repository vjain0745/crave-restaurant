import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketplaceWalletComponent } from './marketplace-wallet.component';

describe('MarketplaceWalletComponent', () => {
  let component: MarketplaceWalletComponent;
  let fixture: ComponentFixture<MarketplaceWalletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketplaceWalletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketplaceWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
