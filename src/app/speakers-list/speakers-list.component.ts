import { Component, OnInit } from '@angular/core';
import {ConferenceOrganizerService} from "../services/conference-organizer.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-speakers-list',
  templateUrl: './speakers-list.component.html',
  styleUrls: ['./speakers-list.component.css']
})

export class SpeakersListComponent implements OnInit {
  sessions: any[];
  speakerSessionGroups: any;
  fragment: string;

  constructor(private conferenceOrganizerService: ConferenceOrganizerService,
              private activatedRoute: ActivatedRoute) {
    this.sessions = [];
  }

  ngOnInit() {
    this.setSessions();
    this.activatedRoute.fragment.subscribe(fragment => {
      this.fragment = fragment;
    })
  }

  ngAfterViewChecked(): void {
    try {
      if(this.fragment) {
        document.querySelector('#' + this.fragment).scrollIntoView();
      }
    } catch (e) { }
  }

  setSessions(): void {
    this.conferenceOrganizerService.getSessions().subscribe((sessions: any) => {
      this.sessions = sessions;
      this.groupSessionsBySpeaker();
    });
  }

  groupSessionsBySpeaker(): void {
    this.speakerSessionGroups = new Map();
    this.sessions.forEach((session: any) => {
      if(this.speakerSessionGroups.get(session.speakerName)) {
        this.speakerSessionGroups.get(session.speakerName).sessions.push(session);
      }
      else if(session.break == false) {
        this.speakerSessionGroups.set(session.speakerName, {bio: session.bio, sessions: [session]});
      }
    });
    this.speakerSessionGroups = Array.from(this.speakerSessionGroups);
  }
}
