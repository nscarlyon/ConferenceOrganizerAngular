import { TestBed, inject } from '@angular/core/testing';

import { ConferenceOrganizerService } from './conference-organizer.service';

describe('ConferenceOrganizerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConferenceOrganizerService]
    });
  });

  it('should be created', inject([ConferenceOrganizerService], (service: ConferenceOrganizerService) => {
    expect(service).toBeTruthy();
  }));
});
