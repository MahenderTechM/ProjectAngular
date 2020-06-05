import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionItemPopupComponent } from './action-item-popup.component';

describe('ActionItemPopupComponent', () => {
  let component: ActionItemPopupComponent;
  let fixture: ComponentFixture<ActionItemPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionItemPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionItemPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
