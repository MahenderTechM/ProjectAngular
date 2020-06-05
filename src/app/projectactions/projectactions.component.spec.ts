import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectactionsComponent } from './projectactions.component';

describe('ProjectactionsComponent', () => {
  let component: ProjectactionsComponent;
  let fixture: ComponentFixture<ProjectactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
