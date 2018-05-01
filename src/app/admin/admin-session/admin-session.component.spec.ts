import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSessionComponent } from './admin-session.component';
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import {ConferenceOrganizerService} from "../../services/conference-organizer.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('AdminSessionComponent', () => {
  let component: AdminSessionComponent;
  let fixture: ComponentFixture<AdminSessionComponent>;

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //military time conversions
  //standard time conversion
  //new timeSlot format
  //postData format

  //
  // it('should remove initial 0 in hours less than 10', () => {
  //   expect(component.convertMilitaryToStandardTime("09:00")).toEqual("9:00");
  // });
  //
  // it('should convert military hours greater than 12', () => {
  //   expect(component.convertMilitaryToStandardTime("13:00")).toEqual("1:00");
  // });
  //
  // it('should validate endTime hour is greater than startTime hour', () => {
  //   component.startTime = "09:00";
  //   component.endTime = "10:00";
  //   expect(component.isValidTimeSlot()).toEqual(true);
  //   component.startTime = "10:00";
  //   component.endTime = "09:00";
  //   expect(component.isValidTimeSlot()).toEqual(false);
  // });
  //
  // it('should validate endTime is greater than startTime with same hour', () => {
  //   component.startTime = "10:00";
  //   component.endTime = "10:30";
  //   expect(component.isValidTimeSlot()).toEqual(true);
  //   component.startTime = "10:30";
  //   component.endTime = "10:00";
  //   expect(component.isValidTimeSlot()).toEqual(false);
  // });
  //
  // it('should find conflict if timeSlot already exists', () => {
  //   component.schedule = {timeSlots: ["9:00-10:00"]};
  //   component.startTime = "9:00";
  //   component.endTime = "10:00";
  //   expect(component.noTimeSlotConflict()).toEqual(true);
  // });
  //
  // it('should find conflict if timeSlot overlaps with another timeSlot with startHour starting early', () => {
  //   component.schedule = {timeSlots: ["9:00-10:00"]};
  //   component.startTime = "9:00";
  //   component.endTime = "9:30";
  //   expect(component.noTimeSlotConflict()).toEqual(true);
  // });
});
