import { Component, OnInit } from '@angular/core';
import {ConferenceOrganizerService} from "../../services/conference-organizer.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit-session',
  templateUrl: './edit-session.component.html',
  styleUrls: ['./edit-session.component.css']
})
export class EditSessionComponent implements OnInit {
  schedule: any;
  session: any;
  sessionId: string;
  startTime: string;
  endTime: string;
  addingTimeSlot: boolean;
  addingRoom: boolean;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private conferenceOrganizerService: ConferenceOrganizerService
  ) {
    this.addingTimeSlot = false;
    this.addingRoom = false;
  }

  ngOnInit(): void {
    this.setSessionId();
  }

  setSessionId(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      this.sessionId = params['id'];
      this.setSession();
    });
  }

  setSession(): void {
    this.conferenceOrganizerService.getSessionById(this.sessionId).subscribe((session: any) => {
      this.session = session;
    });
  }

  deleteSession(): void {
    this.conferenceOrganizerService.getProposalById(this.session.proposalId).subscribe((response) => {
      let proposal: any = response;
      proposal.scheduledTimes = proposal.scheduledTimes.filter(x => x.room !== this.session.room && x.standardTime !== this.session.standardTime);
      this.conferenceOrganizerService.updateProposal(proposal).subscribe();
    });
    this.conferenceOrganizerService.deleteSession(this.sessionId).subscribe(() => {
      this.router.navigate(["admin/schedule"]);
    });
  }
}
