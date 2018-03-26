import { Component, OnInit } from '@angular/core';
import {ConferenceOrganizerService} from "../../services/conference-organizer.service";

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  cfp: any;

  constructor(private conferenceOrganizerService: ConferenceOrganizerService) { }

  ngOnInit() {
    this.setCfpStatus();
  }

  setCfpStatus(): void {
    this.conferenceOrganizerService.getCfpStatus().subscribe((response: any) => {
      this.cfp = response;
    });
  }

  openCfp(): void {
    this.cfp.status = "open";
    this.conferenceOrganizerService.openCfp(this.cfp).subscribe();
  }

  closeCfp(): void {
    this.cfp.status = "closed";
    this.conferenceOrganizerService.closeCfp(this.cfp).subscribe();
  }
}
