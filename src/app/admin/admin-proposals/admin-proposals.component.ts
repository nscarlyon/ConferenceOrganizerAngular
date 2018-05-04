import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {ConferenceOrganizerService} from "../../services/conference-organizer.service";
import {Proposal} from "../../shared/proposal";

@Component({
  selector: 'app-admin-proposals',
  templateUrl: 'admin-proposals.component.html',
  styleUrls: ['admin-proposals.component.css']
})

export class AdminProposalsComponent implements OnInit {
  proposals: Proposal[];

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private conferenceOrganizerService: ConferenceOrganizerService) { }

  ngOnInit() {
    this.setProposals();
  }

  setProposals(): void {
    this.conferenceOrganizerService.getProposals().subscribe((response: Proposal[]) => {
      this.proposals = response;
    });
  }

  goToSessionPage(id: number): void {
    this.router.navigate([`../sessions/${id}`], {relativeTo: this.activatedRoute})
  }

  deleteProposal(proposal: Proposal): void {
    this.conferenceOrganizerService.deleteProposal(proposal.id).subscribe((response: any[]) => {
      this.deleteScheduledSessions(proposal);
      this.proposals = response;
    });
  }

  deleteScheduledSessions(proposal: Proposal): void {
    if (proposal.scheduledSessions) {
        proposal.scheduledSessions.forEach(session => {
          this.conferenceOrganizerService.deleteSession(session.sessionId).subscribe();
        });
    }
  }
}
