import {TimeSlot} from "./time-slot";
import {Session} from "./session";

export class Schedule {
  id?: string;
  rooms?: string[];
  timeSlots?: TimeSlot[];
  published?: boolean;
  sessions?: Session[];
}
