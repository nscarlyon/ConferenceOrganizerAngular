import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {ConferenceOrganizerService} from "../../services/conference-organizer.service";
import {Proposal} from "../../shared/proposal";
import {Session} from "../../shared/session";

@Component({
  selector: 'app-admin-proposals',
  templateUrl: 'admin-proposals.component.html',
  styleUrls: ['admin-proposals.component.css']
})

export class AdminProposalsComponent implements OnInit {
  proposals: any[];

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private conferenceOrganizerService: ConferenceOrganizerService) { }

  ngOnInit() {
    this.setProposals();
  }

  setProposals(): void {
    this.conferenceOrganizerService.getProposals().subscribe((response: any[]) => {
      this.proposals = response;
      this.setScheduledSessions();
    });
  }

  setScheduledSessions(): void {
    this.conferenceOrganizerService.getSessions().subscribe((response: Session[]) => {
      let sessions: Session[] = response;
      this.proposals = this.proposals.map(proposal => {
        let scheduledSessions: Session[] = sessions.filter(s => s.proposalId == proposal.id);
        proposal.scheduledSessions = [];
        this.scheduledSessionsToProposal(proposal, scheduledSessions);
        return proposal;
      });
    });
  }

  scheduledSessionsToProposal(proposal, scheduledSessions: Session[]): void {
    scheduledSessions.forEach(session => proposal.scheduledSessions.push({
      sessionId: session.id,
      room: session.room,
      standardTime: session.standardTime
    }))
  }

  goToSessionPage(id: number): void {
    this.router.navigate([`../sessions/${id}`], {relativeTo: this.activatedRoute})
  }

  deleteProposal(proposal: any): void {
    this.conferenceOrganizerService.deleteProposal(proposal.id).subscribe((response: any[]) => {
      this.deleteScheduledSessions(proposal);
      this.proposals = response;
      this.setScheduledSessions();
    });
  }

  deleteScheduledSessions(proposal: any): void {
    if (proposal.scheduledSessions) {
      proposal.scheduledSessions.forEach(session => {
        this.conferenceOrganizerService.deleteSession(session.sessionId).subscribe();
      });
    }
  }
}
