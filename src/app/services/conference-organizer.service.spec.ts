import { TestBed, inject } from '@angular/core/testing';

import { ConferenceOrganizerService } from './conference-organizer.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('ConferenceOrganizerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConferenceOrganizerService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should be created', inject([ConferenceOrganizerService], (service: ConferenceOrganizerService) => {
    expect(service).toBeTruthy();
  }));
});
