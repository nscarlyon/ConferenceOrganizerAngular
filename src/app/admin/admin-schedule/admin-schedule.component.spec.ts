import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminScheduleComponent } from './admin-schedule.component';
import {ConferenceOrganizerService} from "../../services/conference-organizer.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {Observable} from "rxjs";
import Spy = jasmine.Spy;
import {ReactiveFormsModule, FormBuilder} from "@angular/forms";
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('AdminScheduleComponent', () => {
  let component: AdminScheduleComponent;
  let fixture: ComponentFixture<AdminScheduleComponent>;
  let conferenceOrganizerService: ConferenceOrganizerService;
  let schedule: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminScheduleComponent ],
      providers: [ConferenceOrganizerService, FormBuilder],
      imports: [RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminScheduleComponent);
    component = fixture.componentInstance;
    conferenceOrganizerService = TestBed.get(ConferenceOrganizerService);
    let sessionOne: any = {
      title: "title-1",
      speakerName: "speaker-1",
      standardTime: "9:00-10:00",
      room: "Room A",
      break: false
    };
    let sessionTwo: any = {
      title: "title-2",
      speakerName: "speaker-2",
      standardTime: "10:00-11:00",
      room: "Room B",
      break: false
    };
    let sessionThree: any = {
      title: "Morning Nap",
      speakerName: null,
      standardTime: "9:30-10:00",
      room: null,
      break: true
    };
    schedule = {
      rooms: ["Room A", "Room B"],
      timeSlots: [{standardTime: "9:00-10:00"}, {standardTime: "10:00-11:00"}],
      sessions: [sessionOne, sessionTwo, sessionThree]
    };
    component.schedule = schedule;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set schedule', () => {
    spyOn(conferenceOrganizerService, "getSchedule").and.returnValue(Observable.of(schedule));
    component.setSchedule();
    expect(component.schedule).toEqual(schedule);
    expect(conferenceOrganizerService.getSchedule as Spy).toHaveBeenCalled();
  });

  it('should return the session title', () => {
    let session: any = component.getSessionTitle("10:00-11:00", "Room B");
    expect(session).toEqual("title-2 - speaker-2")
  });

  it('should return break title', () => {
    let breakSession: any = component.getBreakTitle("9:30-10:00");
    expect(breakSession).toEqual("Morning Nap")
  });

  it('should return empty string if there is no session', () => {
    let breakSession: any = component.getSessionTitle("12:00-1:00");
    expect(breakSession).toEqual("")
  });

  it('should determine if session is a break', () => {
    let isBreakSession: any = component.isBreak("9:30-10:00");
    let isNotBreakSession: any = component.isBreak("10:00-11:00");
    expect(isBreakSession).toEqual(true);
    expect(isNotBreakSession).toEqual(false);
  });
});
