import { Component, OnInit } from '@angular/core';
import {ConferenceOrganizerService} from "../../services/conference-organizer.service";
import {FormBuilder, FormGroup, FormArray} from "@angular/forms";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-admin-schedule',
  templateUrl: './admin-schedule.component.html',
  styleUrls: ['./admin-schedule.component.css']
})

export class AdminScheduleComponent implements OnInit {
  schedule: any = {};
  editingRooms: boolean;
  editingTimeSlots: boolean;
  roomsForm: FormGroup;
  timeSlotsForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private conferenceOrganizerService: ConferenceOrganizerService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.editingRooms = false;
    this.editingTimeSlots = false;
  }

  ngOnInit() {
    this.setSchedule();
  }

  setSchedule(): void {
    this.conferenceOrganizerService.getSchedule().subscribe((response: any) => {
      this.schedule = response;
      this.setRoomsForm();
      this.setTimeSlotsForm();
    });
  }

  setRoomsForm(): void {
    let scheduleRooms: FormGroup[] = this.schedule.rooms.map((room: string, index: number) => {
      return this.formBuilder.group({roomName: room, roomOrder: index + 1});
    });
    this.roomsForm = this.formBuilder.group({
      rooms: this.formBuilder.array(scheduleRooms)
    });
  }

  setTimeSlotsForm(): void {
    let scheduleTimeSlots: FormGroup[] = this.schedule.timeSlots.map((timeSlot: any) => {
      return this.formBuilder.group({
        timeSlot: timeSlot,
        standardTime: [{value: timeSlot.standardTime, disabled: true}]
      });
    });

    this.timeSlotsForm = this.formBuilder.group({
      timeSlots: this.formBuilder.array(scheduleTimeSlots),
      timeSlotsToAdd: this.formBuilder.array([])
    })
  }

  getCorrectSession(time: string, room: string): any {
    let correctSession: any = this.schedule.sessions.find((session: any) => session.standardTime == time && session.room == room);
    if (correctSession) return `${correctSession.title} - ${correctSession.speakerName}`;
    return "";
  }

  goToEditSessionPage(time: string, room: string): void {
    let session: any = this.schedule.sessions.find((session: any) => session.standardTime == time && session.room == room);
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

  toggleEditingRooms(): void {
    this.editingRooms = !this.editingRooms;
  }

  toggleEditingTimeSlots(): void {
    this.editingTimeSlots = !this.editingTimeSlots;
  }

  deleteRoom(roomIndex: number): void {
    this.rooms.removeAt(roomIndex);
  }

  deleteTimeSlot(timeSlotIndex: number): void {
    this.timeSlots.removeAt(timeSlotIndex);
  }

  deleteTimeSlotToAdd(timeSlotToAddIndex: number): void {
    this.timeSlotsToAdd.removeAt(timeSlotToAddIndex);
  }

  addRoom(): void {
    this.rooms.push(this.formBuilder.group({roomName: "New Room", roomOrder: Number(this.rooms.controls.length + 1)}));
  }

  addTimeSlot(): void {
    this.timeSlotsToAdd.push(this.formBuilder.group({
      startTime: "",
      endTime: ""
    }))
  }

  get rooms(): FormArray {
    return this.roomsForm.get('rooms') as FormArray;
  }

  get timeSlots(): FormArray {
    return this.timeSlotsForm.get('timeSlots') as FormArray;
  }

  get timeSlotsToAdd(): FormArray {
    return this.timeSlotsForm.get('timeSlotsToAdd') as FormArray;
  }

  saveRooms(): void {
    this.schedule.rooms = this.rooms.controls.map((room: any) => {
      return room.value.roomName;
    });
    this.conferenceOrganizerService.putSchedule(this.schedule).subscribe((response) => {
      this.toggleEditingRooms();
      this.schedule = response;
    });
  }

  saveTimeSlots(): void {
    let newTimeSlots: any[] = this.getNewTimeSlot();
    let currentTimeSlots: any[] = this.timeSlots.controls.map(t => t.get('timeSlot').value);
    this.schedule.timeSlots = currentTimeSlots.concat(newTimeSlots);
    this.conferenceOrganizerService.putSchedule(this.schedule).subscribe((response) => {
      this.toggleEditingTimeSlots();
      this.schedule = response;
      this.setTimeSlotsForm();
    });
  }


  getNewTimeSlot(): any[] {
    let newTimeSlots: any[] = this.timeSlotsToAdd.controls.map(t => {
      let timeSlot: any = {};
      let startTime: string = t.value.startTime;
      let endTime: string = t.value.endTime;
      timeSlot.standardTime = `${this.convertMilitaryToStandardTime(startTime)}-${this.convertMilitaryToStandardTime(endTime)}`;
      timeSlot.startHour = Number(startTime.split(":")[0]);
      timeSlot.startMin = Number(startTime.split(":")[1]);
      timeSlot.endHour = Number(endTime.split(":")[0]);
      timeSlot.endMin = Number(endTime.split(":")[1]);
      return timeSlot;
    });
    return newTimeSlots;
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

  orderRooms(): void {
    this.rooms.controls.sort((roomOne: any, roomTwo: any) => {
      return Number(roomOne.value.roomOrder) - Number(roomTwo.value.roomOrder);
    });
  }
}
