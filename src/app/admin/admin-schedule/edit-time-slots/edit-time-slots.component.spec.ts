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
        {
          standardTime: "8:00-9:00 A.M"
        }
      ]
    };
    component.setTimeSlotsForm();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete one of current timeslots by index', () => {
    component.deleteTimeSlot(0);
    expect(component.timeSlots.length).toEqual(0);
  });

  it('should add timeSlot', () => {
    expect(component.timeSlotsToAdd.length).toEqual(0);
    component.addTimeSlot();
    expect(component.timeSlotsToAdd.length).toEqual(1);
  });

  it('should delete added timeSlot by index', () => {
    component.addTimeSlot();
    component.deleteTimeSlotToAdd(0);
    expect(component.timeSlotsToAdd.length).toEqual(0);
  });

  it('should save all timeSlots', () => {
    component.addTimeSlot();
    component.addTimeSlot();
    component.saveTimeSlots();
    expect(component.schedule.timeSlots.length).toEqual(3);
  });

  it('should convert military timeSlots to new timeSlots', () => {
    component.addTimeSlot();
    component.addTimeSlot();
    component.timeSlotsToAdd.controls[0].patchValue({startTime: "9:00", endTime: "10:00"});
    component.timeSlotsToAdd.controls[1].patchValue({startTime: "13:30", endTime: "14:46"});
    component.saveTimeSlots();

    expect(component.schedule.timeSlots[1]).toEqual(new TimeSlot("9:00", "10:00"));
    expect(component.schedule.timeSlots[2]).toEqual(new TimeSlot("13:30", "14:46"));
  });
});
