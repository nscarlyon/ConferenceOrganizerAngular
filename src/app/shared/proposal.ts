export class Proposal {
  id?: string;
  speakerName: string;
  email: string;
  bio: string;
  title: string;
  description: string;
  scheduledSessions: ScheduledSession[];

  constructor(proposal?: any) {
    if(proposal) this.setProposalFields(proposal);
  }

  setProposalFields(proposal): void {
    this.id = proposal.id;
    this.speakerName = proposal.speakerName;
    this.email = proposal.email;
    this.bio = proposal.bio;
    this.title = proposal.title;
    this.description = proposal.description;
  }
}

export class ScheduledSession {
  sessionId: string;
  room: string;
  standardTime: string;

  constructor(sessionId: string, room: string, standardTime: string) {
    this.sessionId = sessionId;
    this.room = room;
    this.standardTime = standardTime;
  }
}
