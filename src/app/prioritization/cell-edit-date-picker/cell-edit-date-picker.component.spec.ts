import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CellEditDatePickerComponent } from './cell-edit-date-picker.component';

describe('CellEditDatePickerComponent', () => {
  let component: CellEditDatePickerComponent;
  let fixture: ComponentFixture<CellEditDatePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CellEditDatePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CellEditDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
