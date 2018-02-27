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
    this.setSchedule();
  }

  ngOnInit() {
  }

  setSchedule(): void {
    // this.conferenceOrganizerService.getSchedule().subscribe((response: any) => {
    //   this.schedule = response;
    // });
    this.schedule =
      {
        rooms: ["Room A", "Room B"],
        timeSlots: ["9", "10", "11"],
        sessions: [
            {
              title: "Title 2",
              room: "Room B",
              time: "9"
            },
              {
                title: "Title 3",
                room: "Room A",
                time: "10"
              },
              {
                title: "Title 4",
                room: "Room B",
                time: "10"
              }
        ]
      }
  }

  getCorrectSession(time: string, room: string) {
    let correctSession: any = this.schedule.sessions.find((session: any) => session.time == time && session.room == room);
    if (correctSession) return correctSession.title;
    return "No Session";
  }
}
