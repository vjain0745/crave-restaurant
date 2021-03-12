import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketplaceStoreDetailComponent } from './marketplace-store-detail.component';

describe('MarketplaceStoreDetailComponent', () => {
  let component: MarketplaceStoreDetailComponent;
  let fixture: ComponentFixture<MarketplaceStoreDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketplaceStoreDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketplaceStoreDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
