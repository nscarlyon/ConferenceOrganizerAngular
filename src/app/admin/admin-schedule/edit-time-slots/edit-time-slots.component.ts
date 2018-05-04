import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {FormGroup, FormBuilder, FormArray} from "@angular/forms";
import {ConferenceOrganizerService} from "../../../services/conference-organizer.service";
import {TimeSlot} from "../../../shared/time-slot";

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
    let scheduleTimeSlots: FormGroup[] = this.getScheduleTimeSlots();

    this.timeSlotsForm = this.formBuilder.group({
      timeSlots: this.formBuilder.array(scheduleTimeSlots),
      timeSlotsToAdd: this.formBuilder.array([])
    })
  }

  getScheduleTimeSlots(): FormGroup[] {
    return this.schedule.timeSlots.map((timeSlot: any) => {
      return this.formBuilder.group({
        timeSlot: timeSlot,
        standardTime: [{value: timeSlot.standardTime, disabled: true}]
      });
    });
  }

  deleteTimeSlot(timeSlotIndex: number): void {
    this.timeSlots.removeAt(timeSlotIndex);
    this.schedule.timeSlots.splice(timeSlotIndex, 1);
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
    let newTimeSlots: any[] = this.getNewTimeSlots();
    let currentTimeSlots: any[] = this.schedule.timeSlots;
    this.schedule.timeSlots = currentTimeSlots.concat(newTimeSlots);

    this.conferenceOrganizerService.putSchedule(this.schedule).subscribe((response) => {
      this.schedule = response;
      this.closeEditingTimeSlots();
      this.setTimeSlotsForm();
    });
  }

  getNewTimeSlots(): any[] {
    return this.timeSlotsToAdd.controls.map(t => {
      return new TimeSlot(t.value.startTime, t.value.endTime);
    });
  }

  closeEditingTimeSlots(): void {
    this.editingTimeSlots.emit();
  }
}
