import { Component, OnInit } from '@angular/core';
import {ConferenceOrganizerService} from "../../services/conference-organizer.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-admin-session',
  templateUrl: './admin-session.component.html',
  styleUrls: ['./admin-session.component.css']
})
export class AdminSessionComponent implements OnInit {
  sessionForm: FormGroup;
  rooms: string[];
  addingNewRoom: boolean;
  proposal: any;

  constructor(private formBuilder: FormBuilder, private conferenceOrganizerService: ConferenceOrganizerService) {
  }

  ngOnInit() {
    this.addingNewRoom = false;
    this.setRooms();
    this.setProposal();
    this.createForm();
  }

  private createForm() {
    this.sessionForm = this.formBuilder.group({
      room: [this.rooms[0]],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
    });
  }

  public reset(): void {
    this.sessionForm.reset();
  }

  onSubmit(): void {
    if (!this.rooms.some(room => room == this.sessionForm.value.room)) this.addRoomToSchedule();
    this.addSession();
  }

  private setRooms() {
    this.rooms = ["Room A", "Room B"];
  }

  private setProposal() {
    this.proposal = {
      speakerName: "Wonder Woman",
      title: "The wonders"
    };
  }

  addNewRoom(): void {
    this.addingNewRoom = !this.addingNewRoom;
  }

  private addRoomToSchedule() {

  }

  getTime(time:string):number {
    let translatedTime: number = Number(time);
    if (time.charAt(0) == "0") translatedTime = Number(time.substr(1));
    return translatedTime;
  }

  private addSession() {
    let postData: any = this.getPostData();
    console.log(postData);
  }

  private getPostData(): any {
    let startTime: string[] = this.sessionForm.value.startTime.split(":");
    let startHour: number = this.getTime(startTime[0]);
    let startMin: number = this.getTime(startTime[1]);
    let endTime: string[] = this.sessionForm.value.endTime.split(":");
    let endHour: number = this.getTime(endTime[0]);
    let endMin: number = this.getTime(endTime[1]);

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
