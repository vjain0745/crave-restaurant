import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketplaceCompletedComponent } from './marketplace-completed.component';

describe('MarketplaceCompletedComponent', () => {
  let component: MarketplaceCompletedComponent;
  let fixture: ComponentFixture<MarketplaceCompletedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketplaceCompletedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketplaceCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
