import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSessionComponent } from './edit-session.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ConferenceOrganizerService} from "../../services/conference-organizer.service";
import {Observable} from "rxjs";

describe('EditSessionComponent', () => {
  let component: EditSessionComponent;
  let fixture: ComponentFixture<EditSessionComponent>;
  let conferenceOrganizerService: ConferenceOrganizerService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSessionComponent ],
      providers: [ConferenceOrganizerService],
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule, FormsModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSessionComponent);
    component = fixture.componentInstance;
    conferenceOrganizerService = TestBed.get(ConferenceOrganizerService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
