import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-speaker',
  templateUrl: './speaker.component.html',
  styleUrls: ['./speaker.component.css']
})
export class SpeakerComponent implements OnInit {
  proposalForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
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
    console.log(this.proposalForm.value);
  }
}
