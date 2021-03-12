import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddingToCartComponent } from './adding-to-cart.component';

describe('AddingToCartComponent', () => {
  let component: AddingToCartComponent;
  let fixture: ComponentFixture<AddingToCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddingToCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddingToCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
