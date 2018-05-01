import { Component, OnInit } from '@angular/core';
import {ConferenceOrganizerService} from "../../services/conference-organizer.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
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
  errorMessage: string;
  postData: any;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private conferenceOrganizerService: ConferenceOrganizerService
              ) {
    this.addingTimeSlot = false;
    this.addingRoom = false;
    this.postData = {};
  }

  ngOnInit(): void {
    this.setProposalId();
    this.setRoomsAndTimeSlots();
  }

  setProposalId(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      this.proposalId = params['id'];
      this.setProposal();
    });
  }

  setProposal(): void {
    this.conferenceOrganizerService.getProposalById(this.proposalId).subscribe((proposal: any) => {
      this.proposal = proposal;
    });
  }

  setRoomsAndTimeSlots() {
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
     this.setPostData();
     this.addRoom();
     this.addTimeSlot();

    if(!this.sessionExists()) {
      this.conferenceOrganizerService.addSession(this.postData).subscribe(() => {
        this.router.navigate(["admin/schedule"]);
      });
    } else {
      this.errorMessage = "This Session already exists";
    }
  }

  sessionExists(): boolean {
    return this.schedule.sessions.some((session: any) => {
      return session.standardTime == this.postData.standardTime
          && session.room == this.postData.room
          || session.standardTime == this.postData.standardTime
          && session.break == true;
    });
  }

  addTimeSlot() {
    if (this.addingTimeSlot) {
      let newTimeSlot: any = this.getNewTimeSlot();
      this.schedule.timeSlots.push(newTimeSlot);
      this.postData.standardTime = newTimeSlot.standardTime;
      this.conferenceOrganizerService.putSchedule(this.schedule).subscribe(() => {
      });
    }
  }

  addRoom() {
    if (this.addingRoom) {
      this.schedule.rooms.push(this.sessionForm.value.room);
      this.conferenceOrganizerService.putSchedule(this.schedule).subscribe();
    }
  }

  getNewTimeSlot(): any {
    let timeSlot: any = {};
    let startTime: string = this.sessionForm.value.startTime;
    let endTime: string = this.sessionForm.value.endTime;
    let standardStartTime = this.convertMilitaryToStandardTime(startTime);
    let standardEndTime = this.convertMilitaryToStandardTime(endTime);
    timeSlot.standardTime = `${standardStartTime}-${standardEndTime}`;
    timeSlot.startHour = Number(startTime.split(":")[0]);
    timeSlot.startMin = Number(startTime.split(":")[1]);
    timeSlot.endHour = Number(endTime.split(":")[0]);
    timeSlot.endMin = Number(endTime.split(":")[1]);
    timeSlot.endHour <= 11
      ? timeSlot.standardTime+= " A.M"
      : timeSlot.standardTime+=" P.M";
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
    return newTimeSlot.startHour >= 0
        || newTimeSlot.startMin >= 0
        || newTimeSlot.endHour >= 0
        || newTimeSlot.endMin >= 0;
  }

  setPostData(): void {
    this.postData.speakerName =  this.proposal.speakerName;
    this.postData.email = this.proposal.email;
    this.postData.proposalId = this.proposal.id;
    this.postData.bio = this.proposal.bio;
    this.postData.title = this.proposal.title;
    this.postData.description = this.proposal.description;
    this.postData.room = this.sessionForm.value.room;
    this.postData.standardTime = this.sessionForm.value.timeSlot;
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
