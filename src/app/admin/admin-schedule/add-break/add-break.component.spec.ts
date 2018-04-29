import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBreakComponent } from './add-break.component';
import {ReactiveFormsModule} from "@angular/forms";
import {ConferenceOrganizerService} from "../../../services/conference-organizer.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('AddBreakComponent', () => {
  let component: AddBreakComponent;
  let fixture: ComponentFixture<AddBreakComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBreakComponent ],
      providers: [ConferenceOrganizerService],
      imports: [ReactiveFormsModule, HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBreakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
