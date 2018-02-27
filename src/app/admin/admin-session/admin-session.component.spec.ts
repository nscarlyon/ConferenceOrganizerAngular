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
});
