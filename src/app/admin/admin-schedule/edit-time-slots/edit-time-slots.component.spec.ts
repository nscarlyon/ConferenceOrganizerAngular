import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTimeSlotsComponent } from './edit-time-slots.component';
import {ReactiveFormsModule} from "@angular/forms";
import {ConferenceOrganizerService} from "../../../services/conference-organizer.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {TimeSlot} from "../../../shared/time-slot";

describe('EditTimeSlotsComponent', () => {
  let component: EditTimeSlotsComponent;
  let fixture: ComponentFixture<EditTimeSlotsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTimeSlotsComponent ],
      providers: [ConferenceOrganizerService],
      imports: [ReactiveFormsModule, HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTimeSlotsComponent);
    component = fixture.componentInstance;
    component.schedule = {
      timeSlots: [
        new TimeSlot("08:00", "9:00"),
        new TimeSlot("09:00", "10:00")
      ]
    };
    component.setTimeSlotsForm();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete one of the current timeSlots by index', () => {
    component.deleteTimeSlot(0);
    let remainingTimeSlot = component.timeSlots.controls[0].value.timeSlot.standardTime;
    expect(component.timeSlots.length).toEqual(1);
    expect(remainingTimeSlot).toEqual("9:00-10:00 A.M");
  });

  it('should add timeSlot', () => {
    expect(component.timeSlotsToAdd.length).toEqual(0);
    component.addTimeSlot();
    expect(component.timeSlotsToAdd.length).toEqual(1);
  });

  it('should delete added timeSlot by index', () => {
    component.addTimeSlot();
    expect(component.timeSlotsToAdd.length).toEqual(1);
    component.deleteTimeSlotToAdd(0);
    expect(component.timeSlotsToAdd.length).toEqual(0);
  });

  it('should save all timeSlots', () => {
    component.addTimeSlot();
    component.addTimeSlot();
    component.timeSlotsToAdd.controls[0].patchValue({startTime: "12:00", endTime: "13:00"});
    component.timeSlotsToAdd.controls[1].patchValue({startTime: "13:30", endTime: "14:46"});
    component.saveTimeSlots();
    let expectedTimeSlots: TimeSlot[] = [
      new TimeSlot("08:00", "09:00"),
      new TimeSlot("09:00", "10:00"),
      new TimeSlot("12:00", "13:00"),
      new TimeSlot("13:30", "14:46")
    ];
    expect(component.schedule.timeSlots).toEqual(expectedTimeSlots);
  });
});
