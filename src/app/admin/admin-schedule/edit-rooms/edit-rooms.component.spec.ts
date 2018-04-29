import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRoomsComponent } from './edit-rooms.component';
import {ReactiveFormsModule} from "@angular/forms";
import {ConferenceOrganizerService} from "../../../services/conference-organizer.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";

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
    component.schedule = {
      rooms: ["Room A"]
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
