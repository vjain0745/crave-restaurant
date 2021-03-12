import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComboComponent } from './menu-combo.component';

describe('MenuComboComponent', () => {
  let component: MenuComboComponent;
  let fixture: ComponentFixture<MenuComboComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuComboComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
