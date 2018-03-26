import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeakerComponent } from './speaker.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ConferenceOrganizerService} from "../services/conference-organizer.service";
import {Observable} from "rxjs";
import Spy = jasmine.Spy;

describe('SpeakerComponent', () => {
  let component: SpeakerComponent;
  let conferenceOrganizerService: ConferenceOrganizerService;
  let fixture: ComponentFixture<SpeakerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeakerComponent ],
      providers: [ConferenceOrganizerService],
      imports: [ReactiveFormsModule, HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeakerComponent);
    component = fixture.componentInstance;
    conferenceOrganizerService = TestBed.get(ConferenceOrganizerService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit speaker proposal', () => {
    let proposal: any = {
      speakerName: "speaker",
      email: "email@test.com",
      bio: "lorem",
      title: "title here",
      description: "lorem"
    };
    component.proposalForm.setValue(proposal);
    component.message = "";

    spyOn(conferenceOrganizerService, "postProposal").and.callFake(() => Observable.of({message: "Sucesfully submitted"}));
    component.onSubmit();

    expect(component.proposalForm.value).toEqual(proposal);
    expect(conferenceOrganizerService.postProposal).toHaveBeenCalledWith(proposal);
  });

  it('should clear form', () => {
    let proposal: any = {
      speakerName: "speaker",
      email: "email@test.com",
      bio: "lorem",
      title: "title here",
      description: "lorem"
    };
    let clearedProposal: any = {
      speakerName: null,
      email: null,
      bio: null,
      title: null,
      description: null
    };
    component.proposalForm.setValue(proposal);
    component.reset();
    expect(component.proposalForm.value).toEqual(clearedProposal);
  });
});
