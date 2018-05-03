export class TimeSlot {
  standardTime: string;
  startHour: number;
  startMin: number;
  endHour: number;
  endMin: number;

  constructor(startTime, endTime) {
    this.startHour = Number(startTime.split(":")[0]);
    this.startMin = Number(startTime.split(":")[1]);
    this.endHour = Number(endTime.split(":")[0]);
    this.endMin = Number(endTime.split(":")[1]);
    this.setStandardTime(startTime, endTime);
  }

  setStandardTime(startTime: string, endTime: string): void {
    let standardStartTime: string = this.convertMilitaryToStandardTime(startTime);
    let standardEndTime: string = this.convertMilitaryToStandardTime(endTime);
    this.standardTime = `${standardStartTime}-${standardEndTime}`;

    this.endHour <= 11
      ? this.standardTime += " A.M"
      : this.standardTime += " P.M";
  }


  convertMilitaryToStandardTime(time: string): string {
    let splitTime: string[] = time.split(":");
    let hour: number = Number(splitTime[0]);
    let min: string = splitTime[1];
    if (hour > 12) {
      let hourConversions: any = {
        13: 1,
        14: 2,
        15: 3,
        16: 4,
        17: 5,
        18: 6,
        19: 7,
        20: 8,
        21: 9,
        22: 10,
        23: 11,
        24: 12
      };
      hour = hourConversions[hour];
    }
    return `${hour}:${min}`;
  }
}
