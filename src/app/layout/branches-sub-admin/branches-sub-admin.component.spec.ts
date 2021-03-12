import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchesSubAdminComponent } from './branches-sub-admin.component';

describe('BranchesSubAdminComponent', () => {
  let component: BranchesSubAdminComponent;
  let fixture: ComponentFixture<BranchesSubAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchesSubAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchesSubAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
