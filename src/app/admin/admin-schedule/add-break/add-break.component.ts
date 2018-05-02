import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {ConferenceOrganizerService} from "../../../services/conference-organizer.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-add-break',
  templateUrl: './add-break.component.html',
  styleUrls: ['./add-break.component.css']
})
export class AddBreakComponent implements OnInit {
  @Output() addingBreak: EventEmitter<boolean> = new EventEmitter();
  @Input() schedule: any;
  breakForm: FormGroup;

  constructor(private conferenceOrganizerService: ConferenceOrganizerService,
              private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.setBreakForm();
  }

  setBreakForm() {
    this.breakForm = this.formBuilder.group({
      "break": [true],
      title: "",
      standardTime: ""
    });
  }

  saveBreak(): void {
    this.conferenceOrganizerService.postSession(this.breakForm.value).subscribe(() => {
      this.schedule.sessions.push(this.breakForm.value);
      this.closeAddingBreak();
    });
  }

  closeAddingBreak(): void {
    this.addingBreak.emit();
  }
}
