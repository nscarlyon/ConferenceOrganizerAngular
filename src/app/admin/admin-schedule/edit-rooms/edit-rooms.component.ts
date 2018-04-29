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
    let scheduleRooms: FormGroup[] = this.schedule.rooms.map((room: string) => {
      return this.formBuilder.group({roomName: {value: room, disabled: true}});
    });

    this.roomsForm = this.formBuilder.group({
      rooms: this.formBuilder.array(scheduleRooms),
      roomsToAdd: this.formBuilder.array([])
    });
  }

  get rooms(): FormArray {
    return this.roomsForm.get('rooms') as FormArray;
  }

  get roomsToAdd(): FormArray {
    return this.roomsForm.get('roomsToAdd') as FormArray;
  }

  addRoom(): void {
    this.roomsToAdd.push(this.formBuilder.group({roomToAdd: ""}));
  }

  deleteRoom(roomIndex: number): void {
    this.rooms.removeAt(roomIndex);
  }

  deleteRoomToAdd(roomIndex: number): void {
    this.roomsToAdd.removeAt(roomIndex);
  }

  saveRooms(): void {
    let currentRooms: any = this.rooms.controls.map(room => room.value.roomName);
    let newRooms: any = this.roomsToAdd.controls.map(room => room.value.roomToAdd);
    this.schedule.rooms = currentRooms.concat(newRooms);
    this.conferenceOrganizerService.putSchedule(this.schedule).subscribe((response) => {
      this.closeEditingRooms();
      this.setRoomsForm();
      this.schedule = response;
    });
  }

  closeEditingRooms(): void {
    this.editingRooms.emit(false);
  }
}
