import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {ConferenceOrganizerService} from "../services/conference-organizer.service";

@Component({
  selector: 'app-speaker',
  templateUrl: './speaker.component.html',
  styleUrls: ['./speaker.component.css']
})
export class SpeakerComponent implements OnInit {
  proposalForm: FormGroup;
  message: string = "";

  constructor(private formBuilder: FormBuilder, private conferenceOrganizerService: ConferenceOrganizerService) {
    this.createForm();
  }

  ngOnInit() {

  }

  private createForm() {
    this.proposalForm = this.formBuilder.group({
      speakerName: ['', Validators.required],
      email: ['', Validators.email],
      bio: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

  reset(): void {
    this.proposalForm.reset();
  }

   onSubmit(): void {
    this.conferenceOrganizerService.postProposal(this.proposalForm.value).subscribe((response) => {
      this.message = response["message"];
    });
  }
}
