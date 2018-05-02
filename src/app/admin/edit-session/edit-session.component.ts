import { Component, OnInit } from '@angular/core';
import {ConferenceOrganizerService} from "../../services/conference-organizer.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Session} from "../../shared/session";

@Component({
  selector: 'app-edit-session',
  templateUrl: './edit-session.component.html',
  styleUrls: ['./edit-session.component.css']
})
export class EditSessionComponent implements OnInit {
  session: any;
  sessionId: string;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private conferenceOrganizerService: ConferenceOrganizerService
  ) {
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
    this.conferenceOrganizerService.getSession(this.sessionId).subscribe((session: Session) => {
      this.session = session;
    });
  }

  deleteSession(): void {
    this.conferenceOrganizerService.deleteSession(this.sessionId).subscribe(() => {
      this.router.navigate(["admin/schedule"]);
    });
  }
}
