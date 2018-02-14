import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {ConferenceOrganizerService} from "../../services/conference-organizer.service";

@Component({
  selector: 'app-admin-proposals',
  templateUrl: 'admin-proposals.component.html',
  styleUrls: ['admin-proposals.component.css']
})
export class AdminProposalsComponent implements OnInit {
  proposals: any;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private conferenceOrganizerService: ConferenceOrganizerService) { }

  ngOnInit() {
    this.setProposals();
  }

  goToSessionPage(id: number): void {
    this.router.navigate([`../sessions/${id}`], {relativeTo: this.activatedRoute})
  }

  private setProposals() {
    this.conferenceOrganizerService.getProposals().subscribe((response: any) => {
      this.proposals = response;
    });
  }
}
