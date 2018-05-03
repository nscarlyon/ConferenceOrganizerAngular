export class Proposal {
  id?: string;
  speakerName: string;
  email: string;
  bio: string;
  title: string;
  description: string;

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
