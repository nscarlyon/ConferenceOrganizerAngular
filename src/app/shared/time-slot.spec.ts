import {TimeSlot} from "./time-slot";
describe("Time Slot Tests", () => {

  it("should set all military times after 11 for TimeSlot with start and ending time", () => {
    let timeSlot: TimeSlot = new TimeSlot("13:00", "14:00");
    expect(timeSlot.startHour).toEqual(13);
    expect(timeSlot.startMin).toEqual(0);
    expect(timeSlot.endHour).toEqual(14);
    expect(timeSlot.endMin).toEqual(0);
  });

  it("should set all military times before 11 for TimeSlot with start and ending time", () => {
    let timeSlot: TimeSlot = new TimeSlot("08:30", "09:30");
    expect(timeSlot.startHour).toEqual(8);
    expect(timeSlot.startMin).toEqual(30);
    expect(timeSlot.endHour).toEqual(9);
    expect(timeSlot.endMin).toEqual(30);
  });

  it("should convert from military time before 1PM to standard time", () => {
    let timeSlot: TimeSlot = new TimeSlot("8:00", "9:00");
    expect(timeSlot.standardTime).toEqual("8:00-9:00 A.M");
  });

  it("should convert from military time after 12PM to standard time", () => {
    let timeSlot: TimeSlot = new TimeSlot("13:00", "14:00");
    expect(timeSlot.standardTime).toEqual("1:00-2:00 P.M");
  });
});
