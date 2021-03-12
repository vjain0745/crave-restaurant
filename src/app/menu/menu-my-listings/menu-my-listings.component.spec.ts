import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuMyListingsComponent } from './menu-my-listings.component';

describe('MenuMyListingsComponent', () => {
  let component: MenuMyListingsComponent;
  let fixture: ComponentFixture<MenuMyListingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuMyListingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuMyListingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
