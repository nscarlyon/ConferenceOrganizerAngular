import { Component, OnInit } from '@angular/core';
import {ConferenceOrganizerService} from "../../services/conference-organizer.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-admin-session',
  templateUrl: './admin-session.component.html',
  styleUrls: ['./admin-session.component.css']
})
export class AdminSessionComponent implements OnInit {
  sessionForm: FormGroup;
  schedule: any;
  proposal: any;
  proposalId: string;
  addedRoom: string;
  startTime: string;
  endTime: string;

  constructor(private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private conferenceOrganizerService: ConferenceOrganizerService
              )

  {
  }

  ngOnInit(): void {
    this.setSessionId();
    this.setRoomsAndTimeSlots();
  }

  setSessionId(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      this.proposalId = params['id'];
      this.setProposal();
    });
  }

  public createForm() {
    this.sessionForm = this.formBuilder.group({
      room: this.schedule.rooms[0],
      timeSlot: this.schedule.timeSlots[0]
    });
  }

  public reset(): void {
    this.sessionForm.reset();
  }

  onSubmit(): void {
    this.addSession();
  }

  private setRoomsAndTimeSlots() {
    this.conferenceOrganizerService.getSchedule().subscribe((schedule: any) => {
      if (schedule) {
        this.schedule = schedule;
      } else {
        this.schedule = {rooms: [], timeSlots: []};
      }
      this.createForm();
    });
  }

  private setProposal(): void {
    this.conferenceOrganizerService.getProposalById(this.proposalId).subscribe((proposal: any) => {
      this.proposal = proposal;
    });
  }

  updateSchedule(add: string): void {
    if(this.addedRoom) this.schedule.rooms.push(this.addedRoom);
    if(this.validateTime()) {
      let standardStartTime: string = this.convertMilitaryToStandardTime(this.startTime);
      let standardEndTime: string = this.convertMilitaryToStandardTime(this.endTime);
      this.schedule.timeSlots.push(`${standardStartTime}-${standardEndTime}`);
    }
    this.addedRoom = "";
    this.conferenceOrganizerService.putSchedule(this.schedule).subscribe(() => {
      window.location.reload();
    });
  }

  timeSlotConflicts(): boolean {
    let timeSlot: string = this.convertMilitaryToStandardTime(this.startTime) + "-" + this.convertMilitaryToStandardTime(this.endTime);
    return this.schedule.timeSlots.includes(timeSlot) || this.isTimeSlotOverLapping();
  }

  private isTimeSlotOverLapping(): boolean {
    return this.schedule.timeSlots.some((timeSlot: string) => {
      let splitTime: string[] = timeSlot.split("-");
      let splitStartTime: string[] = splitTime[0].split(":");
      let startHour: number = Number(splitStartTime[0]);
      let startMin: number = Number(splitStartTime[1]);
      let splitEndTime: string[] = splitTime[1].split(":");
      let endHour: number = Number(splitEndTime[0]);
      let endMin: number = Number(splitEndTime[1]);

      let addedStartHour: Number = Number(this.startTime.split(":")[0]);
      let addedStartMin: Number = Number(this.startTime.split(":")[1]);
      let addedEndHour: Number = Number(this.endTime.split(":")[0]);
      let addedEndMin: Number = Number(this.endTime.split(":")[1]);

      return endHour == addedEndHour
            || ((addedStartHour <= startHour) && (addedEndHour >= endHour))
            || ((addedStartHour <= startHour) && (addedEndHour == addedStartHour))
    });
  }

  validateTime(): boolean {
    if(!this.startTime || !this.endTime) return false;
    let splitStartTime: string[] = this.startTime.split(":");
    let startHour: number = Number(splitStartTime[0]);
    let startMin: number = Number(splitStartTime[1]);
    let splitEndTime: string[] = this.endTime.split(":");
    let endHour: number = Number(splitEndTime[0]);
    let endMin: number = Number(splitEndTime[1]);
    return (endHour > startHour)
        || (endHour == startHour && endMin > startMin);
  }

  convertMilitaryToStandardTime(time: string): string {
    let splitTime: string[] = time.split(":");
    let hour: number = Number(splitTime[0]);
    let min: string = splitTime[1];
    if(hour > 12) {
      let hourConversions: any = {13: 1, 14: 2, 15: 3, 16: 4, 17: 5, 18: 6, 19: 7, 20: 8, 21: 9, 22: 10, 23: 11, 24: 12};
      hour = hourConversions[hour];
    }
    return `${hour}:${min}`;
  }

  getTime(time:string):number {
    let translatedTime: number = Number(time);
    if (time.charAt(0) == "0") translatedTime = Number(time.substr(1));
    return translatedTime;
  }

   addSession(): void {
    let postData: any = this.getPostData();
    this.conferenceOrganizerService.addSession(postData).subscribe(() => {

    });
  }

  private getPostData(): any {
    let splitTime: string[] = this.sessionForm.value.timeSlot.split("-");
    console.log(this.sessionForm.value.timeSlot);
    console.log(splitTime);
    let timeSlot: string = this.convertMilitaryToStandardTime(splitTime[0]) + "-" + this.convertMilitaryToStandardTime(splitTime[1]);

    return {
      speakerName: this.proposal.speakerName,
      title: this.proposal.title,
      room: this.sessionForm.value.room,
      timeSlot: timeSlot,
    };
  }
}
