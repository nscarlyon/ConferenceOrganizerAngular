import { Component, OnInit } from '@angular/core';
import {ConferenceOrganizerService} from "../../services/conference-organizer.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-admin-session',
  templateUrl: './admin-session.component.html',
  styleUrls: ['./admin-session.component.css']
})
export class AdminSessionComponent implements OnInit {
  sessionForm: FormGroup;
  rooms: string[];
  proposal: any;
  proposalId: string;
  timeSlots: any;
  addedRoom: string;
  startTime: string;
  endTime: string;

  constructor(private formBuilder: FormBuilder,
              private conferenceOrganizerService: ConferenceOrganizerService,
              private activatedRoute: ActivatedRoute,
              private router: Router)
  {
    this.createForm();
  }

  ngOnInit() {
    this.setSessionId();
    this.setRooms();
  }

  setSessionId(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      this.proposalId = params['id'];
      this.setProposal();
    });
  }

  public createForm() {
    this.sessionForm = this.formBuilder.group({
      room: '',
      timeSlot: ''
    });
  }

  public reset(): void {
    this.sessionForm.reset();
  }

  onSubmit(): void {
    this.addSession();
  }

  private setRooms() {
    this.conferenceOrganizerService.getSchedule().subscribe((schedule: any) => {
      this.rooms = schedule.rooms;
      this.timeSlots = schedule.timeSlots;
    });
  }

  private setProposal() {
    this.conferenceOrganizerService.getProposalById(this.proposalId).subscribe((proposal: any) => {
      this.proposal = proposal;
    });
  }

  addRoom(): void {
    let allRooms: any = this.rooms.push(this.addedRoom);
    console.log(allRooms);
    this.conferenceOrganizerService.addRoom(allRooms).subscribe(() => {
      this.router.navigate([`../sessions/${this.proposalId}`], {relativeTo: this.activatedRoute})
    });
  }

  addTimeSlot(): void {
    this.router.navigate([`../sessions/${this.proposalId}`], {relativeTo: this.activatedRoute})
  }


  getTime(time:string):number {
    let translatedTime: number = Number(time);
    if (time.charAt(0) == "0") translatedTime = Number(time.substr(1));
    return translatedTime;
  }

  private addSession(): void {
    let postData: any = this.getPostData();
    this.conferenceOrganizerService.addSession(postData).subscribe();
  }

  private getPostData(): any {
    let time: string[] = this.sessionForm.value.timeSlot.split("-");
    let startHour: number = this.getTime(time[0].split(":")[0]);
    let startMin: number = this.getTime(time[0].split(":")[1]);
    let endHour: number = this.getTime(time[1].split(":")[0]);
    let endMin: number = this.getTime(time[1].split(":")[1]);

    return {
      speakerName: this.proposal.speakerName,
      title: this.proposal.title,
      room: this.sessionForm.value.room,
      startHour: startHour,
      startMin: startMin,
      endHour: endHour,
      endMin: endMin
    };
  }
}
