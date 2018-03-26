import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminScheduleComponent } from './admin-schedule.component';
import {ConferenceOrganizerService} from "../../services/conference-organizer.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {Observable} from "rxjs";
import Spy = jasmine.Spy;
import {ReactiveFormsModule, FormBuilder} from "@angular/forms";

describe('AdminScheduleComponent', () => {
  let component: AdminScheduleComponent;
  let fixture: ComponentFixture<AdminScheduleComponent>;
  let conferenceOrganizerService: ConferenceOrganizerService;
  let schedule: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminScheduleComponent ],
      providers: [ConferenceOrganizerService, FormBuilder],
      imports: [RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminScheduleComponent);
    component = fixture.componentInstance;
    conferenceOrganizerService = TestBed.get(ConferenceOrganizerService);
    fixture.detectChanges();
    let sessionOne: any = {
      title: "title-1",
      speakerName: "speaker-1",
      standardTime: "9:00-10:00",
      room: "Room A",
    };
    let sessionTwo: any = {
      title: "title-2",
      speakerName: "speaker-2",
      standardTime: "10:00-11:00",
      room: "Room B",
    };
    schedule = {
      rooms: ["Room A", "Room B"],
      timeSlots: [{standardTime: "9:00-10:00"}, {standardTime: "10:00-11:00"}],
      sessions: [sessionOne, sessionTwo]
    };
    component.schedule = schedule;
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

  it('should return the correct session', () => {
    let correctSession: any = component.getCorrectSession("10:00-11:00", "Room B");
    expect(correctSession).toEqual("title-2 - speaker-2")
  });

  it('should delete room', () => {
    spyOn(conferenceOrganizerService, "putSchedule").and.returnValue(Observable.of());
    component.setRoomsForm();
    component.deleteRoom(0);
    component.saveRooms();
    expect(component.schedule.rooms).toEqual(["Room B"]);
    expect(conferenceOrganizerService.putSchedule as Spy).toHaveBeenCalledWith(component.schedule);
  });

  it('should add room', () => {
    component.setRoomsForm();
    component.addRoom();
    component.saveRooms();
    expect(component.schedule.rooms.length).toEqual(3);
  });

  it('should order rooms', () => {
    component.setRoomsForm();
    component.rooms.push(FormBuilder.prototype.group({roomName: "Room C", roomOrder: 3}));
    component.rooms.controls[0].value.roomOrder = 3;
    component.rooms.controls[2].value.roomOrder = 1;
    component.orderRooms();
    component.saveRooms();
    expect(component.schedule.rooms[0]).toEqual("Room C");
    expect(component.schedule.rooms[2]).toEqual("Room A");
  })
});
