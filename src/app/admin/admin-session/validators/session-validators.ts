import {ValidatorFn, AbstractControl, FormGroup} from "@angular/forms";
import {map} from "rxjs/operators/map";
import {Observable} from "rxjs";

export function roomSelected(): ValidatorFn {
  return (control: AbstractControl) => {
    return Observable.of(control.value === "Select Room").pipe(
      map(result => result ? {'noRoom': {value: control.value}} : null)
    )
  };
}

export function timeSlotSelected(): ValidatorFn {
  return (control: AbstractControl) => {
    return Observable.of(control.value === "Select Time Slot").pipe(
      map(result => result ? {'noTimeSlot': {value: control.value}} : null)
    )
  }
}

export function validStartTime(): ValidatorFn {
  return (control: AbstractControl) => {
    let startTime: any = control.value;
    let endTime: any = control.parent.value.endTime;
    let timeSlot: any = getNewTimeSlot(startTime, endTime);

    return Observable.of(isTimeSlotMissing(timeSlot)).pipe(
      map(result => {
        return result ? {'timeSlotMissing': {value: "Time Slot is missing!"}} : null
      })
    )
  }
}

export function validEndTime(): ValidatorFn {
  return (control: AbstractControl) => {
    return Observable.of(control.value === "Select Time Slot").pipe(
      map(result => result ? {'invalidEndTime': {value: control.value}} : null)
    )
  }
}

function getNewTimeSlot(startTime: string, endTime: string): any {
  let newTimeSlot: any = {};
  newTimeSlot.standardTime = `${convertMilitaryToStandardTime(startTime)}-${convertMilitaryToStandardTime(endTime)}`;
  newTimeSlot.startHour = Number(startTime.split(":")[0]);
  newTimeSlot.startMin = Number(startTime.split(":")[1]);
  newTimeSlot.endHour = Number(endTime.split(":")[0]);
  newTimeSlot.endMin = Number(endTime.split(":")[1]);
  return newTimeSlot;
}

function convertMilitaryToStandardTime(time: string): string {
  let splitTime: string[] = time.split(":");
  let hour: number = Number(splitTime[0]);
  let min: string = splitTime[1];
  if(hour > 12) {
    let hourConversions: any = {13: 1, 14: 2, 15: 3, 16: 4, 17: 5, 18: 6, 19: 7, 20: 8, 21: 9, 22: 10, 23: 11, 24: 12};
    hour = hourConversions[hour];
  }
  return `${hour}:${min}`;
}

function isTimeSlotMissing(newTimeSlot: any): boolean {
  return newTimeSlot.startHour < 0 || newTimeSlot.startMin < 0 || newTimeSlot.endHour < 0 || newTimeSlot.endMin < 0;
}

