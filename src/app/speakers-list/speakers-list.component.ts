import { Component, OnInit } from '@angular/core';
import {ConferenceOrganizerService} from "../services/conference-organizer.service";

@Component({
  selector: 'app-speakers-list',
  templateUrl: './speakers-list.component.html',
  styleUrls: ['./speakers-list.component.css']
})
export class SpeakersListComponent implements OnInit {
  sessions: any[];
  speakerSessionGroups: any;

  constructor(private conferenceOrganizerService: ConferenceOrganizerService) {
    this.sessions = [];
  }

  ngOnInit() {
    this.setSessions();
  }

  setSessions(): void {
    this.conferenceOrganizerService.getSessions().subscribe((sessions: any) => {
      this.sessions = sessions;
      this.orderSessions();
    });
  }

  orderSessions(): void {
    this.speakerSessionGroups = new Map();
    this.sessions.forEach((session: any) => {
      if(this.speakerSessionGroups.get(session.speakerName)) {
        this.speakerSessionGroups.get(session.speakerName).sessions.push(session);
      } else {
        this.speakerSessionGroups.set(session.speakerName, {bio: session.bio, sessions: [session]});
      }
    });
    this.speakerSessionGroups = Array.from(this.speakerSessionGroups);
  }
}
