import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRoomsComponent } from './edit-rooms.component';
import {ReactiveFormsModule} from "@angular/forms";
import {ConferenceOrganizerService} from "../../../services/conference-organizer.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {Schedule} from "../../../shared/schedule";

describe('EditRoomsComponent', () => {
  let component: EditRoomsComponent;
  let fixture: ComponentFixture<EditRoomsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRoomsComponent ],
      providers: [ConferenceOrganizerService],
      imports: [ReactiveFormsModule, HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRoomsComponent);
    component = fixture.componentInstance;
    component.schedule = new Schedule();
    component.schedule.rooms = ["Room A", "Room B"];
    component.setRoomsForm();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete one of the current rooms by index', () => {
    component.deleteRoom(0);
    expect(component.rooms.controls.length).toEqual(1);
    expect(component.rooms.controls[0].value.roomName).toEqual("Room B");
  });

  it('should add room', () => {
    expect(component.roomsToAdd.length).toEqual(0);
    component.addRoom();
    expect(component.roomsToAdd.length).toEqual(1);
  });

  it('should delete added room by index', () => {
    component.addRoom();
    component.deleteRoomToAdd(0);
    expect(component.roomsToAdd.length).toEqual(0);
  });

  it('should save all rooms', () => {
    component.addRoom();
    component.addRoom();
    component.saveRooms();
    expect(component.schedule.rooms.length).toEqual(4);
  });
});
