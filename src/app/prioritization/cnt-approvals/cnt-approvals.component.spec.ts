import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CntApprovalsComponent } from './cnt-approvals.component';

describe('CntApprovalsComponent', () => {
  let component: CntApprovalsComponent;
  let fixture: ComponentFixture<CntApprovalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CntApprovalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CntApprovalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
