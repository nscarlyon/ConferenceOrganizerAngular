import { Component, OnInit } from '@angular/core';
import {ConferenceOrganizerService} from "../../services/conference-organizer.service";

@Component({
  selector: 'app-admin-schedule',
  templateUrl: './admin-schedule.component.html',
  styleUrls: ['./admin-schedule.component.css']
})
export class AdminScheduleComponent implements OnInit {
  schedule: any = {};

  constructor(private conferenceOrganizerService: ConferenceOrganizerService) {
  }

  ngOnInit() {
    this.setSchedule();
  }

  setSchedule(): void {
    this.conferenceOrganizerService.getSchedule().subscribe((response: any) => {
      this.schedule = response;
    });
  }

  getCorrectSession(time: string, room: string) {
    let correctSession: any = this.schedule.sessions.find((session: any) => session.standardTime == time && session.room == room);
    if (correctSession) return `${correctSession.title} - ${correctSession.speakerName}`;
    return "";
  }
}
