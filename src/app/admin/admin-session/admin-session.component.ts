import { Component, OnInit } from '@angular/core';
import {ConferenceOrganizerService} from "../../services/conference-organizer.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {roomSelected, timeSlotSelected, validStartTime, validEndTime} from "./validators/session-validators";

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
  startTime: string;
  endTime: string;
  addingTimeSlot: boolean;
  addingRoom: boolean;

  constructor(private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private conferenceOrganizerService: ConferenceOrganizerService
              ) {
    this.addingTimeSlot = false;
    this.addingRoom = false;
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

  private setProposal(): void {
    this.conferenceOrganizerService.getProposalById(this.proposalId).subscribe((proposal: any) => {
      this.proposal = proposal;
    });
  }

  private setRoomsAndTimeSlots() {
    this.conferenceOrganizerService.getSchedule().subscribe((schedule: any) => {
      if (schedule) this.schedule = schedule;
      else this.schedule = {rooms: [], timeSlots: []};
      this.createForm();
    });
  }

  createForm() {
    this.sessionForm = this.formBuilder.group({
      room: ["", Validators.required, roomSelected()],
      timeSlot: ["", Validators.required, timeSlotSelected()],
      startTime: ["", Validators.required, validStartTime()],
      endTime: ["", Validators.required, validEndTime()]
    });
  }

  onSubmit(): void {
    this.addSession();
  }

  isTimeSlotInvalid(): boolean {
    return (this.sessionForm.get('startTime').invalid
      && (this.sessionForm.get('startTime').dirty || this.sessionForm.get('startTime').touched))
      || (this.sessionForm.get('endTime').invalid
      && (this.sessionForm.get('endTime').dirty || this.sessionForm.get('endTime').touched))
  }

   addSession(): void {
    let postData: any = this.getPostData();
    if(this.addingRoom) {
      this.schedule.rooms.push(this.sessionForm.value.room);
      this.conferenceOrganizerService.putSchedule(this.schedule).subscribe();
    }
    if(this.addingTimeSlot) {
      let newTimeSlot: any = this.getNewTimeSlot();
      if(this.isValidTimeSlot(newTimeSlot) || this.noTimeSlotConflict(newTimeSlot)) {
        postData.timeSlot = newTimeSlot.standardTime;
        this.schedule.timeSlots.push(newTimeSlot);
        this.conferenceOrganizerService.putSchedule(this.schedule).subscribe();
      } else console.log("Invalid!");
    }
    this.conferenceOrganizerService.addSession(postData).subscribe(() => {
    });
  }

  getNewTimeSlot(): any {
    let timeSlot: any = {};
    let startTime: string = this.sessionForm.value.startTime;
    let endTime: string = this.sessionForm.value.endTime;
    timeSlot.standardTime = `${this.convertMilitaryToStandardTime(startTime)}-${this.convertMilitaryToStandardTime(endTime)}`;
    timeSlot.startHour = Number(startTime.split(":")[0]);
    timeSlot.startMin = Number(startTime.split(":")[1]);
    timeSlot.endHour = Number(endTime.split(":")[0]);
    timeSlot.endMin = Number(endTime.split(":")[1]);
    return timeSlot;
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

  isValidTimeSlot(newTimeSlot: any): boolean {
    if(!newTimeSlot.startHour || !newTimeSlot.startMin || !newTimeSlot.endHour || !newTimeSlot.endMin) return false;
    return (newTimeSlot.endHour > newTimeSlot.startHour)
        || (newTimeSlot.endHour == newTimeSlot.startHour && newTimeSlot.endMin > newTimeSlot.startMin);
  }

  noTimeSlotConflict(newTimeSlot: any): boolean {
    let isTimeSlotOverLapping: boolean = this.schedule.timeSlots.some((existingTimeSlot: any) => {
      return existingTimeSlot.endHour == newTimeSlot.endHour
        || ((newTimeSlot.startHour <= existingTimeSlot.startHour) && (newTimeSlot.endHour >= existingTimeSlot.endHour))
        || ((newTimeSlot.startHour <= existingTimeSlot.startHour) && (newTimeSlot.endHour == existingTimeSlot.startHour))
    });
    return this.schedule.timeSlots.includes(newTimeSlot) || isTimeSlotOverLapping;
  }

  private getPostData(): any {
    let postData: any = {};
    postData.speakerName =  this.proposal.speakerName;
    postData.title = this.proposal.title;
    postData.room = this.sessionForm.value.room;
    postData.standardTime = this.sessionForm.value.timeSlot;
    return postData;
  }

  toggleAddingTimeSlot(): void {
    this.sessionForm.patchValue({timeSlot: {}});
    this.sessionForm.patchValue({startTime: ""});
    this.sessionForm.patchValue({endTime: ""});
    this.addingTimeSlot = !this.addingTimeSlot;
  }

  toggleAddingRoom(): void {
    this.sessionForm.patchValue({room: ""});
    this.addingRoom = !this.addingRoom;
  }
}
