import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketplaceCompletedAfterReviewComponent } from './marketplace-completed-after-review.component';

describe('MarketplaceCompletedAfterReviewComponent', () => {
  let component: MarketplaceCompletedAfterReviewComponent;
  let fixture: ComponentFixture<MarketplaceCompletedAfterReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketplaceCompletedAfterReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketplaceCompletedAfterReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
