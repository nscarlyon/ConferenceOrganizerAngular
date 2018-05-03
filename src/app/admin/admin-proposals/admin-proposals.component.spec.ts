import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProposalsComponent } from './admin-proposals.component';
import {RouterTestingModule} from "@angular/router/testing";
import {ConferenceOrganizerService} from "../../services/conference-organizer.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {Observable} from "rxjs";
import Spy = jasmine.Spy;
import {Proposal} from "../../shared/proposal";
import {Session} from "../../shared/session";

describe('AdminProposalsComponent', () => {
  let conferenceOrganizerService: ConferenceOrganizerService;
  let component: AdminProposalsComponent;
  let fixture: ComponentFixture<AdminProposalsComponent>;
  let proposalOne: Proposal;
  let proposalTwo: Proposal;

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
    proposalOne = new Proposal({
      id: "1",
      title: "title-1",
      speakerName: "speaker-1",
      email: "email-1",
      bio: "bio-1",
      description: "description-1",
    });
    proposalTwo = new Proposal({
      id: "2",
      title: "title-2",
      speakerName: "speaker-2",
      email: "email-2",
      bio: "bio-2",
      description: "description-2",
    });
    component.proposals = [proposalOne, proposalTwo];
    conferenceOrganizerService = TestBed.get(ConferenceOrganizerService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set all proposals', () => {
    spyOn(conferenceOrganizerService, "getProposals").and.returnValue(Observable.of([proposalOne, proposalTwo]));
    component.setProposals();
    expect(conferenceOrganizerService.getProposals as Spy).toHaveBeenCalled();
    expect(component.proposals).toEqual([proposalOne, proposalTwo]);
  });

  it('should set scheduled sessions for proposal', () => {
    let sessionOne: Session = new Session(proposalOne, "Room A", "9:00-10:00 A.M");
    let sessionTwo: Session = new Session(proposalOne, "Room B", "10:00-11:00 A.M");
    let sessionThree: Session = new Session(proposalTwo, "Room B", "10:00-11:00 A.M");
    spyOn(conferenceOrganizerService, 'getSessions').and.returnValue(Observable.of([sessionOne, sessionTwo, sessionThree]));

    component.setScheduledSessions();
    expect(component.proposals[0].scheduledSessions).toEqual([
      {room: "Room A", standardTime: "9:00-10:00 A.M"},
      {room: "Room B", standardTime: "10:00-11:00 A.M"},
    ]);
    expect(component.proposals[1].scheduledSessions).toEqual([
      {room: "Room B", standardTime: "10:00-11:00 A.M"}
    ]);
  });

  it("should delete a proposal and reset proposals", () => {
    spyOn(conferenceOrganizerService, 'deleteProposal').and.returnValue(Observable.of([proposalTwo]));
    component.deleteProposal(proposalOne.id);
    expect(component.proposals).toEqual([proposalTwo]);
    expect(conferenceOrganizerService.deleteProposal as Spy).toHaveBeenCalledWith("1");
  });
});
