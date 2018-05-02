import {Proposal} from "./proposal";

export class Session {
  id?: string;
  speakerName: string;
  email: string;
  bio: string;
  title: string;
  description: string;
  room: string;
  standardTime: string;
  proposalId: string;
  break: boolean;

  constructor(proposal?: Proposal, room?: string, standardTime?: string) {
    if (proposal) this.createSessionFromProposal(proposal, room, standardTime);
  }

  createSessionFromProposal(proposal: Proposal, room: string, standardTime: string): void {
    this.speakerName = proposal.speakerName;
    this.email = proposal.email;
    this.bio = proposal.bio;
    this.title = proposal.title;
    this.description = proposal.description;
    this.room = room;
    this.standardTime = standardTime;
    this.proposalId = proposal.id;
    this.break = false;
  }
}
