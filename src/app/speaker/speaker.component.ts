import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {ConferenceOrganizerService} from "../services/conference-organizer.service";
import {CFP} from "../shared/CFP";

@Component({
  selector: 'app-speaker',
  templateUrl: './speaker.component.html',
  styleUrls: ['./speaker.component.css']
})

export class SpeakerComponent implements OnInit {
  proposalForm: FormGroup;
  message: string = "";
  cfpStatus: string;

  constructor(private formBuilder: FormBuilder,
              private conferenceOrganizerService: ConferenceOrganizerService) {
    this.createForm();
  }

  ngOnInit() {
    this.setCfpStatus();
  }

  createForm() {
    this.proposalForm = this.formBuilder.group({
      speakerName: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      bio: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

  setCfpStatus() {
    this.conferenceOrganizerService.getCfpStatus().subscribe((response: CFP) => {
      this.cfpStatus = response.status;
    });
  }

  get email() {
    return this.proposalForm.get('email');
  }

  reset(): void {
    this.proposalForm.reset();
  }

   onSubmit(): void {
    this.conferenceOrganizerService.postProposal(this.proposalForm.value).subscribe(() => {
      this.message = "Proposal successfully submitted";
    });
  }
}
