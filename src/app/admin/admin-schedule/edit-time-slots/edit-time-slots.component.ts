import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {FormGroup, FormBuilder, FormArray} from "@angular/forms";
import {ConferenceOrganizerService} from "../../../services/conference-organizer.service";

@Component({
  selector: 'app-edit-time-slots',
  templateUrl: './edit-time-slots.component.html',
  styleUrls: ['./edit-time-slots.component.css']
})
export class EditTimeSlotsComponent implements OnInit {
  @Output() editingTimeSlots: EventEmitter<boolean> = new EventEmitter();
  @Input() schedule: any;
  timeSlotsForm: FormGroup;

  constructor(private conferenceOrganizerService: ConferenceOrganizerService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.setTimeSlotsForm();
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

  deleteTimeSlot(timeSlotIndex: number): void {
    this.timeSlots.removeAt(timeSlotIndex);
  }

  deleteTimeSlotToAdd(timeSlotToAddIndex: number): void {
    this.timeSlotsToAdd.removeAt(timeSlotToAddIndex);
  }

  addTimeSlot(): void {
    this.timeSlotsToAdd.push(this.formBuilder.group({
      startTime: "",
      endTime: ""
    }))
  }

  get timeSlots(): FormArray {
    return this.timeSlotsForm.get('timeSlots') as FormArray;
  }

  get timeSlotsToAdd(): FormArray {
    return this.timeSlotsForm.get('timeSlotsToAdd') as FormArray;
  }

  saveTimeSlots(): void {
    let newTimeSlots: any[] = this.getNewTimeSlot();
    let currentTimeSlots: any[] = this.timeSlots.controls.map(t => t.get('timeSlot').value);
    this.schedule.timeSlots = currentTimeSlots.concat(newTimeSlots);
    this.conferenceOrganizerService.putSchedule(this.schedule).subscribe((response) => {
      this.closeEditingTimeSlots();
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

  closeEditingTimeSlots(): void {
    this.editingTimeSlots.emit();
  }
}
