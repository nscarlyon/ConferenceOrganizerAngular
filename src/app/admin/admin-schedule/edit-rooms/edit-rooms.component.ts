import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {FormGroup, FormArray, FormBuilder} from "@angular/forms";
import {ConferenceOrganizerService} from "../../../services/conference-organizer.service";

@Component({
  selector: 'app-edit-rooms',
  templateUrl: './edit-rooms.component.html',
  styleUrls: ['./edit-rooms.component.css']
})
export class EditRoomsComponent implements OnInit {
  @Output() editingRooms: EventEmitter<boolean> = new EventEmitter();
  @Input() schedule: any;
  roomsForm: FormGroup;

  constructor(private conferenceOrganizerService: ConferenceOrganizerService,
              private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.setRoomsForm();
  }

  setRoomsForm(): void {
    let scheduleRooms: FormGroup[] = this.schedule.rooms.map((room: string, index: number) => {
      return this.formBuilder.group({roomName: room, roomOrder: index + 1});
    });
    this.roomsForm = this.formBuilder.group({
      rooms: this.formBuilder.array(scheduleRooms)
    });
  }

  get rooms(): FormArray {
    return this.roomsForm.get('rooms') as FormArray;
  }

  orderRooms(): void {
    this.rooms.controls.sort((roomOne: any, roomTwo: any) => {
      return Number(roomOne.value.roomOrder) - Number(roomTwo.value.roomOrder);
    });
  }

  addRoom(): void {
    this.rooms.push(this.formBuilder.group({roomName: "New Room", roomOrder: Number(this.rooms.controls.length + 1)}));
  }

  deleteRoom(roomIndex: number): void {
    this.rooms.removeAt(roomIndex);
  }

  saveRooms(): void {
    this.schedule.rooms = this.rooms.controls.map((room: any) => {
      return room.value.roomName;
    });
    this.conferenceOrganizerService.putSchedule(this.schedule).subscribe((response) => {
      this.closeEditingRooms();
      this.schedule = response;
    });
  }

  closeEditingRooms(): void {
    this.editingRooms.emit(false);
  }
}
