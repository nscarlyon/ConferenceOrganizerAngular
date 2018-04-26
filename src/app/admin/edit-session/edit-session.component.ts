import { Component, OnInit } from '@angular/core';
import {ConferenceOrganizerService} from "../../services/conference-organizer.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-edit-session',
  templateUrl: './edit-session.component.html',
  styleUrls: ['./edit-session.component.css']
})
export class EditSessionComponent implements OnInit {
  // sessionForm: FormGroup;
  schedule: any;
  session: any;
  sessionId: string;
  startTime: string;
  endTime: string;
  addingTimeSlot: boolean;
  addingRoom: boolean;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private conferenceOrganizerService: ConferenceOrganizerService
  ) {
    this.addingTimeSlot = false;
    this.addingRoom = false;
  }

  ngOnInit(): void {
    this.setSessionId();
    // this.setRoomsAndTimeSlots();
  }

  setSessionId(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      this.sessionId = params['id'];
      this.setSession();
    });
  }

  private setSession(): void {
    this.conferenceOrganizerService.getSessionById(this.sessionId).subscribe((session: any) => {
      this.session = session;
    });
  }

  deleteSession(): void {
    this.conferenceOrganizerService.deleteSession(this.sessionId).subscribe(() => {
      this.router.navigate(["admin/schedule"]);
    });
  }

  // private setRoomsAndTimeSlots() {
  //   this.conferenceOrganizerService.getRoughSchedule().subscribe((schedule: any) => {
  //     if (schedule) this.schedule = schedule;
  //     else this.schedule = {rooms: [], timeSlots: []};
  //     this.createForm();
  //   });
  // }
  //
  // createForm() {
  //   this.sessionForm = this.formBuilder.group({
  //     room: ["", Validators.required, roomSelected()],
  //     timeSlot: ["", Validators.required, timeSlotSelected()],
  //     startTime: ["", Validators.required, validStartTime()],
  //     endTime: ["", Validators.required, validEndTime()]
  //   });
  // }
  //
  // onSubmit(): void {
  //   this.addSession();
  // }
  //
  // isTimeSlotInvalid(): boolean {
  //   return (this.sessionForm.get('startTime').invalid
  //     && (this.sessionForm.get('startTime').dirty || this.sessionForm.get('startTime').touched))
  //     || (this.sessionForm.get('endTime').invalid
  //     && (this.sessionForm.get('endTime').dirty || this.sessionForm.get('endTime').touched))
  // }
  //
  // addSession(): void {
  //   let postData: any = this.getPostData();
  //   if(this.addingRoom) {
  //     this.schedule.rooms.push(this.sessionForm.value.room);
  //     this.conferenceOrganizerService.putSchedule(this.schedule).subscribe();
  //   }
  //   if(this.addingTimeSlot) {
  //     let newTimeSlot: any = this.getNewTimeSlot();
  //     if(this.isValidTimeSlot(newTimeSlot)) {
  //       postData.standardTime = newTimeSlot.standardTime;
  //       this.schedule.timeSlots.push(newTimeSlot);
  //       this.conferenceOrganizerService.putSchedule(this.schedule).subscribe(() => {
  //         console.log("inside subscribe")
  //       });
  //     }
  //   } else {
  //     postData.standardTime = this.sessionForm.value.timeSlot;
  //   }
  //   this.conferenceOrganizerService.addSession(postData).subscribe(() => {
  //     this.router.navigate(["admin/schedule"]);
  //   });
  // }
  //
  // getNewTimeSlot(): any {
  //   let timeSlot: any = {};
  //   let startTime: string = this.sessionForm.value.startTime;
  //   let endTime: string = this.sessionForm.value.endTime;
  //   timeSlot.standardTime = `${this.convertMilitaryToStandardTime(startTime)}-${this.convertMilitaryToStandardTime(endTime)}`;
  //   timeSlot.startHour = Number(startTime.split(":")[0]);
  //   timeSlot.startMin = Number(startTime.split(":")[1]);
  //   timeSlot.endHour = Number(endTime.split(":")[0]);
  //   timeSlot.endMin = Number(endTime.split(":")[1]);
  //   return timeSlot;
  // }
  //
  // convertMilitaryToStandardTime(time: string): string {
  //   let splitTime: string[] = time.split(":");
  //   let hour: number = Number(splitTime[0]);
  //   let min: string = splitTime[1];
  //   if(hour > 12) {
  //     let hourConversions: any = {13: 1, 14: 2, 15: 3, 16: 4, 17: 5, 18: 6, 19: 7, 20: 8, 21: 9, 22: 10, 23: 11, 24: 12};
  //     hour = hourConversions[hour];
  //   }
  //   return `${hour}:${min}`;
  // }
  //
  // isValidTimeSlot(newTimeSlot: any): boolean {
  //   return newTimeSlot.startHour >= 0 || newTimeSlot.startMin >= 0 || newTimeSlot.endHour >= 0 || newTimeSlot.endMin >= 0;
  // }
  //
  // private getPostData(): any {
  //   let postData: any = {};
  //   postData.speakerName =  this.session.speakerName;
  //   postData.bio = this.session.bio;
  //   postData.title = this.session.title;
  //   postData.description = this.session.description;
  //   postData.room = this.sessionForm.value.room;
  //   postData.standardTime = this.sessionForm.value.timeSlot;
  //   return postData;
  // }
  //
  // toggleAddingTimeSlot(): void {
  //   this.sessionForm.patchValue({timeSlot: {}});
  //   this.sessionForm.patchValue({startTime: ""});
  //   this.sessionForm.patchValue({endTime: ""});
  //   this.addingTimeSlot = !this.addingTimeSlot;
  // }
  //
  // toggleAddingRoom(): void {
  //   this.sessionForm.patchValue({room: ""});
  //   this.addingRoom = !this.addingRoom;
  // }
}
