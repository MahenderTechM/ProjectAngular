import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignUserPopupComponent } from './assign-user-popup.component';

describe('AssignUserPopupComponent', () => {
  let component: AssignUserPopupComponent;
  let fixture: ComponentFixture<AssignUserPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignUserPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignUserPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
