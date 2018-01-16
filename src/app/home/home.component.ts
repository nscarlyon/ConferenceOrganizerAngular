import { Component, OnInit } from '@angular/core';
import {ConferenceOrganizerService} from "../services/conference-organizer.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private cfpStatus: string;

  constructor(private conferenceOrganizerService: ConferenceOrganizerService) { }

  ngOnInit() {
    this.SetCfpStatus();
  }

  SetCfpStatus() {
    this.conferenceOrganizerService.getCfpStatus().subscribe((response: any) => {
      this.cfpStatus = response;
    });
  }

}
