import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProposalsComponent } from './admin-proposals.component';
import {RouterTestingModule} from "@angular/router/testing";
import {ConferenceOrganizerService} from "../../services/conference-organizer.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {Observable} from "rxjs";
import Spy = jasmine.Spy;

describe('AdminProposalsComponent', () => {
  let conferenceOrganizerService: ConferenceOrganizerService;
  let component: AdminProposalsComponent;
  let fixture: ComponentFixture<AdminProposalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminProposalsComponent ],
      providers: [ConferenceOrganizerService],
      imports: [RouterTestingModule, HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProposalsComponent);
    component = fixture.componentInstance;
    conferenceOrganizerService = TestBed.get(ConferenceOrganizerService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set all proposals', () => {
    let proposalOne: any = {
      id: "session-1",
      title: "title-1",
      speakerName: "speaker-1",
      email: "email-1",
      bio: "bio-1",
      description: "description-1",
    };

    let proposalTwo: any = {
      id: "session-1",
      title: "title-1",
      speakerName: "speaker-1",
      email: "email-1",
      bio: "bio-1",
      description: "description-1",
    };

    spyOn(conferenceOrganizerService, "getProposals").and.returnValue(Observable.of([proposalOne, proposalTwo]));
    component.setProposals();
    expect(conferenceOrganizerService.getProposals as Spy).toHaveBeenCalled();
    expect(component.proposals).toEqual([proposalOne, proposalTwo]);
  });
});
