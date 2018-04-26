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
      timeSlots: this.formBuilder.array(scheduleTimeSlots)
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

  addRoom(): void {
    this.rooms.push(this.formBuilder.group({roomName: "New Room", roomOrder: Number(this.rooms.controls.length + 1)}));
  }

  get rooms(): FormArray {
    return this.roomsForm.get('rooms') as FormArray;
  };

  get timeSlots(): FormArray {
    return this.timeSlotsForm.get('timeSlots') as FormArray;
  };

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
    this.schedule.timeSlots = this.timeSlots.controls.map(t => t.get('timeSlot').value);
    this.conferenceOrganizerService.putSchedule(this.schedule).subscribe((response) => {
      this.toggleEditingTimeSlots();
      this.schedule = response;
    });
  }

  orderRooms(): void {
    this.rooms.controls.sort((roomOne: any, roomTwo: any) => {
      return Number(roomOne.value.roomOrder) - Number(roomTwo.value.roomOrder);
    });
  }
}
