import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTimeSlotsComponent } from './edit-time-slots.component';

describe('EditTimeSlotsComponent', () => {
  let component: EditTimeSlotsComponent;
  let fixture: ComponentFixture<EditTimeSlotsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTimeSlotsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTimeSlotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
