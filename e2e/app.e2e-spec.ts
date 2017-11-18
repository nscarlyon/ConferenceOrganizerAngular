import { ConferenceOrganizerPage } from './app.po';

describe('conference-organizer App', function() {
  let page: ConferenceOrganizerPage;

  beforeEach(() => {
    page = new ConferenceOrganizerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
