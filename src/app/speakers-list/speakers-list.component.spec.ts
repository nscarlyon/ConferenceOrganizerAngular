import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeakersListComponent } from './speakers-list.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ConferenceOrganizerService} from "../services/conference-organizer.service";
import {RouterTestingModule} from "@angular/router/testing";
import {ReactiveFormsModule} from "@angular/forms";
import {Observable} from "rxjs";
import {Session} from "../shared/session";

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
    let sessionOne: Session = new Session();
    sessionOne.speakerName = "speaker-1";
    sessionOne.bio = "";
    sessionOne.break = false;

    let sessionTwo: Session = new Session();
    sessionTwo.speakerName = "speaker-2";
    sessionTwo.bio = "";
    sessionTwo.break = false;

    let sessionThree: Session = new Session();
    sessionThree.speakerName = "speaker-1";
    sessionThree.bio = "";
    sessionThree.break = false;

    let sessionFour: Session = new Session();
    sessionFour.speakerName = "speaker-2";
    sessionFour.bio = "";
    sessionFour.break = false;

    let sessionFive: Session = new Session();
    sessionFive.speakerName = "speaker-3";
    sessionFive.bio = "";
    sessionFive.break = false;

    let sessionSix: Session = new Session();
    sessionSix.break = true;

    spyOn(conferenceOrganizerService, "getSessions")
      .and.returnValue(Observable.of([
        sessionSix,
        sessionFour,
        sessionTwo,
        sessionOne,
        sessionFive,
        sessionThree]));

    component.setSessions();
    let expected: any = new Map();
    expected.set("speaker-2", {bio: "", sessions: [sessionFour, sessionTwo]});
    expected.set("speaker-1", {bio: "", sessions: [sessionOne, sessionThree]});
    expected.set("speaker-3", {bio: "", sessions: [sessionFive]});
    expected = Array.from(expected);
    expect(component.speakerSessionGroups[0]).toEqual(expected[0]);
  });
});
