import { Component, OnInit } from '@angular/core';
import {ConferenceOrganizerService} from "../services/conference-organizer.service";
import {CFP} from "../shared/CFP";
import {Schedule} from "../shared/schedule";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  cfpStatus: string;
  cfpMessage: string;
  schedulePublished: boolean;

  constructor(private conferenceOrganizerService: ConferenceOrganizerService) { }

  ngOnInit() {
    this.SetCfpStatus();
    this.setScheduleStatus();
  }

  SetCfpStatus() {
    this.conferenceOrganizerService.getCfpStatus().subscribe((response: CFP) => {
      this.cfpStatus = response.status;
      if(response.status == "open") this.cfpMessage = "Call for proposals is open!";
      else if(response.status == "closed") this.cfpMessage = "Call for proposals is closed!";
      else this.cfpMessage = "Server is down!";
    });
  }

  setScheduleStatus() {
    this.conferenceOrganizerService.getSchedule().subscribe((response: Schedule) => {
      this.schedulePublished = response.published;
    });
  }
}
