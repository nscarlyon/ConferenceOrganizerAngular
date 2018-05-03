import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSessionComponent } from './admin-session.component';
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import {ConferenceOrganizerService} from "../../services/conference-organizer.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {Session} from "../../shared/session";
import {Proposal} from "../../shared/proposal";
import {Schedule} from "../../shared/schedule";
import {TimeSlot} from "../../shared/time-slot";
import {Observable} from "rxjs";
import Spy = jasmine.Spy;

describe('AdminSessionComponent', () => {
  let component: AdminSessionComponent;
  let fixture: ComponentFixture<AdminSessionComponent>;
  let conferenceOrganizerService: ConferenceOrganizerService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSessionComponent ],
      providers: [ConferenceOrganizerService],
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule, FormsModule],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSessionComponent);
    component = fixture.componentInstance;
    conferenceOrganizerService = TestBed.get(ConferenceOrganizerService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create postData for session', () => {
    component.proposal = new Proposal({
      id: "1",
      speakerName: "Speaker",
      bio: "bio",
      email: "email",
      title: "title",
      description: "description",
      scheduledTimes: []
    });
    component.createForm();
    component.sessionForm.patchValue({room: "Room A"});
    component.sessionForm.patchValue({timeSlot: "8:00-9:00 A.M"});
    let expected: Session = new Session(component.proposal, "Room A", "8:00-9:00 A.M");
    component.setPostData();
    expect(component.postData).toEqual(expected);
  });

  it('should add room if user is adding room', () => {
    component.addingRoom = true;
    component.schedule = new Schedule();
    component.schedule.rooms = [];
    component.createForm();
    component.sessionForm.patchValue({room: "Room A"});
    component.addRoom();
    expect(component.schedule.rooms[0]).toEqual("Room A");
  });

  it('should add timeslot if user is adding timeSlot', () => {
    component.addingTimeSlot = true;
    component.schedule = new Schedule();
    component.schedule.timeSlots = [];
    component.postData = new Session();
    component.createForm();
    component.sessionForm.patchValue({startTime: "09:00"});
    component.sessionForm.patchValue({endTime: "10:00"});
    component.addTimeSlot();
    let expected: TimeSlot = new TimeSlot("09:00", "10:00");
    expect(component.schedule.timeSlots[0]).toEqual(expected);
  });

  it('should add session', () => {
    component.proposal = new Proposal({
      id: "1",
      speakerName: "Speaker",
      bio: "bio",
      email: "email",
      title: "title",
      description: "description",
      scheduledTimes: []
    });
    let existingSession: Session = new Session();
    component.schedule = new Schedule();
    component.schedule.sessions = [existingSession];
    component.postData = new Session();
    component.createForm();
    component.sessionForm.patchValue({room: "Room A"});
    component.sessionForm.patchValue({timeSlot: "9:00-10:00 A.M"});
    spyOn(conferenceOrganizerService, "postSession").and.returnValue(Observable.of());
    component.onSubmit();
    expect(conferenceOrganizerService.postSession as Spy).toHaveBeenCalledWith(component.postData);
    expect(component.schedule.sessions).toEqual([existingSession]);
  });

  it('should not add session when session already exists', () => {
    component.proposal = new Proposal({
      id: "1",
      speakerName: "Speaker",
      bio: "bio",
      email: "email",
      title: "title",
      description: "description",
      scheduledTimes: []
    });
    component.schedule = new Schedule();
    component.schedule.sessions = [new Session(component.proposal, "Room A", "9:00-10:00 A.M")];
    component.postData = new Session();
    component.createForm();
    component.sessionForm.patchValue({room: "Room A"});
    component.sessionForm.patchValue({timeSlot: "9:00-10:00 A.M"});
    spyOn(conferenceOrganizerService, "postSession").and.returnValue(Observable.of());
    component.onSubmit();
    expect(conferenceOrganizerService.postSession as Spy).not.toHaveBeenCalled();
    expect(component.errorMessage).toEqual('This Session already exists');
  });
});
