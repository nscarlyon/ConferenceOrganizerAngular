import { Component, OnInit } from '@angular/core';
import {ConferenceOrganizerService} from "../../services/conference-organizer.service";
import {Router, ActivatedRoute} from "@angular/router";
import {Schedule} from "../../shared/schedule";
import {Session} from "../../shared/session";

@Component({
  selector: 'app-admin-schedule',
  templateUrl: './admin-schedule.component.html',
  styleUrls: ['./admin-schedule.component.css']
})

export class AdminScheduleComponent implements OnInit {
  schedule: Schedule = new Schedule();
  editingRooms: boolean;
  editingTimeSlots: boolean;
  addingBreak: boolean;

  constructor(private conferenceOrganizerService: ConferenceOrganizerService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.editingRooms = false;
    this.editingTimeSlots = false;
  }

  ngOnInit() {
    this.setSchedule();
  }

  setSchedule(): void {
    this.conferenceOrganizerService.getSchedule().subscribe((response: Schedule) => {
      this.schedule = response;
    });
  }

  isBreak(time: string) {
    return this.schedule.sessions.some((session: Session) => {
      return session.standardTime == time && session.break == true;
    });
  }

  getSessionTitle(time: string, room: string): any {
    let correctSession: any = this.schedule.sessions.find((session: Session) => {
      return session.standardTime == time && session.room == room
    });
    if (correctSession) {
       return `${correctSession.title} - ${correctSession.speakerName}`;
    }
    return "";
  }

  getBreakTitle(time: string): string {
    let correctSession: any = this.schedule.sessions.find((session: Session) => {
      return session.standardTime == time && session.break == true;
    });
    return correctSession.title;
  }

  goToEditSessionPage(time: string, room?: string): void {
    let session: any = this.schedule.sessions.find((session: Session) => {
      if(room) return session.standardTime == time && session.room == room;
      return session.standardTime == time;
    });
    this.router.navigate([`../edit-session/${session.id}`], {relativeTo: this.activatedRoute})
  }

  publishSchedule(): void {
    this.schedule.published = !this.schedule.published;
    this.conferenceOrganizerService.publishSchedule(this.schedule).subscribe();
  }

  unpublishSchedule(): void {
    this.schedule.published = !this.schedule.published;
    this.conferenceOrganizerService.unpublishSchedule(this.schedule).subscribe();
  }

  clearSchedule(): void {
    this.conferenceOrganizerService.deleteSchedule(this.schedule).subscribe(() => {
      this.schedule = null;
    });
  }

  toggleEditingRooms(): void {
    this.editingRooms = !this.editingRooms;
  }

  toggleEditingTimeSlots(): void {
    this.editingTimeSlots = !this.editingTimeSlots;
  }

  toggleAddingBreak(): void {
    this.addingBreak = !this.addingBreak;
  }
}
