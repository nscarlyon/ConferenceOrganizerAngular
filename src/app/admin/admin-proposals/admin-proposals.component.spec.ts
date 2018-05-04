import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminProposalsComponent } from './admin-proposals.component';
import {RouterTestingModule} from "@angular/router/testing";
import {ConferenceOrganizerService} from "../../services/conference-organizer.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {Observable} from "rxjs";
import Spy = jasmine.Spy;
import {Proposal, ScheduledSession} from "../../shared/proposal";

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
      scheduledSessions: [
        new ScheduledSession("3", "Room A", "9:00-10:00 A.M"),
        new ScheduledSession("5", "Room C", "9:00-10:00 A.M")
      ]
    });
    proposalTwo = new Proposal({
      id: "2",
      title: "title-2",
      speakerName: "speaker-2",
      email: "email-2",
      bio: "bio-2",
      description: "description-2",
      scheduledSessions: [new ScheduledSession("4", "Room B", "9:00-10:00 A.M")]
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


  it("should delete a proposal and corresponding scheduled sessions", () => {
    spyOn(conferenceOrganizerService, 'deleteProposal').and.returnValue(Observable.of([proposalTwo]));
    spyOn(conferenceOrganizerService, 'deleteSession').and.returnValue(Observable.of(""));
    component.deleteProposal(proposalOne);
    expect(component.proposals).toEqual([proposalTwo]);
    expect(conferenceOrganizerService.deleteProposal as Spy).toHaveBeenCalledWith("1");
    expect(conferenceOrganizerService.deleteSession as Spy).toHaveBeenCalledWith("3");
    expect(conferenceOrganizerService.deleteSession as Spy).toHaveBeenCalledWith("5");
  });
});
