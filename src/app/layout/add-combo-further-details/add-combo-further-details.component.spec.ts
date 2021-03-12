import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddComboFurtherDetailsComponent } from './add-combo-further-details.component';

describe('AddComboFurtherDetailsComponent', () => {
  let component: AddComboFurtherDetailsComponent;
  let fixture: ComponentFixture<AddComboFurtherDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddComboFurtherDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddComboFurtherDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
