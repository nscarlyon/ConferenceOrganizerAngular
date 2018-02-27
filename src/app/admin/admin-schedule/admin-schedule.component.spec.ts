import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminScheduleComponent } from './admin-schedule.component';
import {ConferenceOrganizerService} from "../../services/conference-organizer.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";

describe('AdminScheduleComponent', () => {
  let component: AdminScheduleComponent;
  let fixture: ComponentFixture<AdminScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminScheduleComponent ],
      providers: [ConferenceOrganizerService],
      imports: [RouterTestingModule, HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
