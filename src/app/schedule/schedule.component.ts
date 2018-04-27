import { Component, OnInit } from '@angular/core';
import {ConferenceOrganizerService} from "../services/conference-organizer.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  schedule: any;

  constructor(private conferenceOrganizerService: ConferenceOrganizerService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.setSchedule();
  }

  setSchedule(): void {
    this.conferenceOrganizerService.getSchedule().subscribe((response: any) => {
      this.schedule = response;
    });
  }

  getCorrectSession(time: string, room: string): string {
    let correctSession: any = this.schedule.sessions.find((session: any) => session.standardTime == time && session.room == room);
    if (correctSession) return `${correctSession.title} - ${correctSession.speakerName}`;
    return "";
  }

  goToSpeakerPage(time: string, room: string) {
    let session: any = this.schedule.sessions.find((session: any) => session.standardTime == time && session.room == room);
    let url: string = "../speakers";
    this.router.navigate([url], {fragment: session.speakerName.split(" ").join("")});
  }
}

