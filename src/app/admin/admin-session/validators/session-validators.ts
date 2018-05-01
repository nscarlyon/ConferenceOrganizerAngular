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
    return Observable.of(isTimeSlotMissing(control)).pipe(
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

function isTimeSlotMissing(control: any): boolean {
  let startTime: any = control.value;
  let endTime: any = control.parent.value.endTime;
  return startTime.startHour < 0
      || startTime.startMin < 0
      || endTime.endHour < 0
      || endTime.endMin < 0;
}

