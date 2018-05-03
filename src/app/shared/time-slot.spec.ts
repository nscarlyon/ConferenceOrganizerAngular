import {TimeSlot} from "./time-slot";
describe("Time Slot Tests", () => {

  it("should set timeslot with corresponding military times", () => {
    let timeSlot: TimeSlot = new TimeSlot("13:15", "14:15");
    expect(timeSlot.startHour).toEqual(13);
    expect(timeSlot.startMin).toEqual(15);
    expect(timeSlot.endHour).toEqual(14);
    expect(timeSlot.endMin).toEqual(15);
  });

  it("should set timeslot with all military times with initials 0s", () => {
    let timeSlot: TimeSlot = new TimeSlot("08:05", "09:01");
    expect(timeSlot.startHour).toEqual(8);
    expect(timeSlot.startMin).toEqual(5);
    expect(timeSlot.endHour).toEqual(9);
    expect(timeSlot.endMin).toEqual(1);
  });

  it("should convert military times before 1PM to standard time", () => {
    let timeSlotOne: TimeSlot = new TimeSlot("10:00", "11:00");
    let timeSlotTwo: TimeSlot = new TimeSlot("11:00", "12:00");
    let timeSlotThree: TimeSlot = new TimeSlot("12:00", "12:59");
    expect(timeSlotOne.standardTime).toEqual("10:00-11:00 A.M");
    expect(timeSlotTwo.standardTime).toEqual("11:00-12:00 P.M");
    expect(timeSlotThree.standardTime).toEqual("12:00-12:59 P.M");
  });

  it("should convert military times after 12PM to standard time", () => {
    let timeSlotOne: TimeSlot = new TimeSlot("13:00", "14:00");
    let timeSlotTwo: TimeSlot = new TimeSlot("22:30", "24:30");
    expect(timeSlotOne.standardTime).toEqual("1:00-2:00 P.M");
    expect(timeSlotTwo.standardTime).toEqual("10:30-12:30 P.M");
  });
});
