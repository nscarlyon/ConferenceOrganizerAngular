import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTimeSlotsComponent } from './edit-time-slots.component';
import {ReactiveFormsModule} from "@angular/forms";
import {ConferenceOrganizerService} from "../../../services/conference-organizer.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
