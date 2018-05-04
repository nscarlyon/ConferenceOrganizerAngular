import { Component, OnInit } from '@angular/core';
import {ConferenceOrganizerService} from "../../services/conference-organizer.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {roomSelected, timeSlotSelected, validStartTime, validEndTime} from "./validators/session-validators";
import {TimeSlot} from "../../shared/time-slot";
import {Session} from "../../shared/session";
import {Proposal} from "../../shared/proposal";
import {Schedule} from "../../shared/schedule";

@Component({
  selector: 'app-admin-session',
  templateUrl: './admin-session.component.html',
  styleUrls: ['./admin-session.component.css']
})

export class AdminSessionComponent implements OnInit {
  sessionForm: FormGroup;
  schedule: Schedule;
  proposal: Proposal;
  addingTimeSlot: boolean;
  addingRoom: boolean;
  errorMessage: string;
  postData: Session;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private conferenceOrganizerService: ConferenceOrganizerService) {
  }

  ngOnInit(): void {
    this.setProposal();
    this.setRoomsAndTimeSlots();
  }

  setProposal(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      let proposalId: string = params['id'];
      this.conferenceOrganizerService.getProposal(proposalId).subscribe((proposal: Proposal) => {
        this.proposal = proposal;
      });
    });
  }

  setRoomsAndTimeSlots(): void {
    this.conferenceOrganizerService.getSchedule().subscribe((schedule: Schedule) => {
      if (schedule) this.schedule = schedule;
      else this.schedule = {rooms: [], timeSlots: []};
      this.schedule.timeSlots.length == 0 ? this.addingTimeSlot = true : this.addingTimeSlot = false;
      this.schedule.rooms.length == 0 ? this.addingRoom = true : this.addingRoom = false;
      this.createForm();
    });
  }

  createForm(): void {
    this.sessionForm = this.formBuilder.group({
      room: ["", Validators.required, roomSelected()],
      timeSlot: ["", Validators.required, timeSlotSelected()],
      startTime: ["", Validators.required, validStartTime()],
      endTime: ["", Validators.required, validEndTime()]
    });
  }

  isTimeSlotInvalid(): boolean {
    return (this.sessionForm.get('startTime').invalid
      && (this.sessionForm.get('startTime').dirty || this.sessionForm.get('startTime').touched))
      || (this.sessionForm.get('endTime').invalid
      && (this.sessionForm.get('endTime').dirty || this.sessionForm.get('endTime').touched))
  }

  onSubmit(): void {
    this.setPostData();
    this.addSession();
  }

  setPostData(): void {
    let standardTime: string = this.addingTimeSlot
      ? new TimeSlot(this.sessionForm.value.startTime, this.sessionForm.value.endTime).standardTime
      : this.sessionForm.value.timeSlot;
    
    this.postData = new Session(this.proposal, this.sessionForm.value.room, standardTime);
  }

   addSession(): void {
    if(!this.sessionExists()) {
      this.conferenceOrganizerService.postSession(this.postData).subscribe(() => {
        if (this.addingRoom) this.addRoom();
        if (this.addingTimeSlot) this.addTimeSlot();
        this.conferenceOrganizerService.putSchedule(this.schedule).subscribe(() => {
          this.router.navigate(["admin/schedule"]);
        });
      });
    } else {
      this.errorMessage = "This Session already exists";
    }
  }

  sessionExists(): boolean {
    return this.schedule.sessions.some((session: Session) => {
      return session.standardTime == this.postData.standardTime
        && session.room == this.postData.room
        || session.standardTime == this.postData.standardTime
        && session.break == true;
    });
  }

  addRoom(): void {
    this.schedule.rooms.push(this.sessionForm.value.room);
  }

  addTimeSlot(): void {
    let newTimeSlot: TimeSlot = new TimeSlot(this.sessionForm.value.startTime, this.sessionForm.value.endTime);
    this.schedule.timeSlots.push(newTimeSlot);
    this.postData.standardTime = newTimeSlot.standardTime;
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
