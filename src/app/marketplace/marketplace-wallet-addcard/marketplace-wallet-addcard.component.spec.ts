import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketplaceWalletAddcardComponent } from './marketplace-wallet-addcard.component';

describe('MarketplaceWalletAddcardComponent', () => {
  let component: MarketplaceWalletAddcardComponent;
  let fixture: ComponentFixture<MarketplaceWalletAddcardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketplaceWalletAddcardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketplaceWalletAddcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
