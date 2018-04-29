import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeakersListComponent } from './speakers-list.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ConferenceOrganizerService} from "../services/conference-organizer.service";
import {RouterTestingModule} from "@angular/router/testing";
import {ReactiveFormsModule} from "@angular/forms";
import {Observable} from "rxjs";

describe('SpeakersListComponent', () => {
  let component: SpeakersListComponent;
  let fixture: ComponentFixture<SpeakersListComponent>;
  let conferenceOrganizerService: ConferenceOrganizerService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeakersListComponent ],
      providers: [ConferenceOrganizerService],
      imports: [RouterTestingModule, HttpClientTestingModule, ReactiveFormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeakersListComponent);
    component = fixture.componentInstance;
    conferenceOrganizerService = TestBed.get(ConferenceOrganizerService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should group sessions by speaker', () => {
    let sessionOne: any = {
      speakerName: "speaker-1",
      bio: "",
      break: false
    };
    let sessionTwo: any = {
      speakerName: "speaker-2",
      bio: "",
      break: false
    };
    let sessionThree: any = {
    speakerName: "speaker-1",
    bio: "",
    break: false
  };
    let sessionFour: any = {
    speakerName: "speaker-2",
    bio: "",
    break: false
  };
    let sessionFive: any = {
    speakerName: "speaker-3",
    bio: "",
    break: false
  };
    let sessionSix: any = {
    break: true
  };
    spyOn(conferenceOrganizerService, "getSessions").and.returnValue(Observable.of([sessionSix, sessionFour, sessionTwo, sessionOne, sessionFive, sessionThree]));
    component.setSessions();
    let expected: any = new Map();
    expected.set("speaker-2", {bio: "", sessions: [sessionFour, sessionTwo]});
    expected.set("speaker-1", {bio: "", sessions: [sessionOne, sessionThree]});
    expected.set("speaker-3", {bio: "", sessions: [sessionFive]});
    expect(component.speakerSessionGroups).toEqual(Array.from(expected))
  });
});
