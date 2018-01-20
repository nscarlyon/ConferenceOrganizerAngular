import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import {ConferenceOrganizerService} from "../services/conference-organizer.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import Spy = jasmine.Spy;
import {Observable} from "rxjs";

describe('HomeComponent', () => {
  let component: HomeComponent;
  let conferenceOrganizerService: ConferenceOrganizerService;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      providers: [ConferenceOrganizerService],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    conferenceOrganizerService = TestBed.get(ConferenceOrganizerService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display correct CFP message for open CFP status',() => {
    let spy: Spy = spyOn(conferenceOrganizerService, 'getCfpStatus').and.returnValue(Observable.of("open"));
    component.SetCfpStatus();
    expect(spy).toHaveBeenCalled();
    expect(component.cfpMessage).toEqual("Call for proposals is open!");
    expect(component.cfpStatus).toEqual("open");
  });

  it('should display correct CFP message for closed CFP status',() => {
    let spy: Spy = spyOn(conferenceOrganizerService, 'getCfpStatus').and.returnValue(Observable.of("closed"));
    component.SetCfpStatus();
    expect(spy).toHaveBeenCalled();
    expect(component.cfpMessage).toEqual("Call for proposals is closed!");
    expect(component.cfpStatus).toEqual("closed");
  });

  it('should display correct CFP message for no error',() => {
    let spy: Spy = spyOn(conferenceOrganizerService, 'getCfpStatus').and.returnValue(Observable.of("error"));
    component.SetCfpStatus();
    expect(spy).toHaveBeenCalled();
    expect(component.cfpMessage).toEqual("Server is down!");
    expect(component.cfpStatus).toEqual("error");
  });
});
