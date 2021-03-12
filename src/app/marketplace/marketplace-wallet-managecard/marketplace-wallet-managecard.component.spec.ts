import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketplaceWalletManagecardComponent } from './marketplace-wallet-managecard.component';

describe('MarketplaceWalletManagecardComponent', () => {
  let component: MarketplaceWalletManagecardComponent;
  let fixture: ComponentFixture<MarketplaceWalletManagecardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketplaceWalletManagecardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketplaceWalletManagecardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
