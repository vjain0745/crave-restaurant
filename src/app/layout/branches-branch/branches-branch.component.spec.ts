import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchesBranchComponent } from './branches-branch.component';

describe('BranchesBranchComponent', () => {
  let component: BranchesBranchComponent;
  let fixture: ComponentFixture<BranchesBranchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchesBranchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchesBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
