export class Proposal {
  id?: string;
  speakerName: string;
  email: string;
  bio: string;
  title: string;
  description: string;
  scheduledTimes: ScheduledTime[];
}

export class ScheduledTime {
  standardTime: string;
  room: string;
  sessionId: string;
}
