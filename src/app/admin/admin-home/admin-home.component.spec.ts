import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHomeComponent } from './admin-home.component';
import {RouterTestingModule} from "@angular/router/testing";
import {ConferenceOrganizerService} from "../../services/conference-organizer.service";
import {Observable} from "rxjs";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import Spy = jasmine.Spy;

describe('AdminHomeComponent', () => {
  let component: AdminHomeComponent;
  let fixture: ComponentFixture<AdminHomeComponent>;
  let conferenceOrganizerService: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminHomeComponent ],
      providers: [ConferenceOrganizerService],
      imports: [RouterTestingModule, HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminHomeComponent);
    component = fixture.componentInstance;
    conferenceOrganizerService = TestBed.get(ConferenceOrganizerService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set cfp', () => {
    let cfp = {id: "cfp-1", status: ""};
    spyOn(conferenceOrganizerService, "getCfpStatus").and.returnValue(Observable.of(cfp));
    component.setCfpStatus();
    expect(component.cfp).toEqual(cfp);
  });

  it('should open cfp', () => {
    component.cfp = {id: "cfp-1", status: "closed"};
    spyOn(conferenceOrganizerService, "openCfp").and.returnValue(Observable.of());
    component.openCfp();
    expect(component.cfp.status).toEqual("open");
    expect(conferenceOrganizerService.openCfp as Spy).toHaveBeenCalledWith(component.cfp);
  });

  it('should close cfp', () => {
    component.cfp = {id: "cfp-1", status: "open"};
    spyOn(conferenceOrganizerService, "closeCfp").and.returnValue(Observable.of());
    component.closeCfp();
    expect(component.cfp.status).toEqual("closed");
    expect(conferenceOrganizerService.closeCfp as Spy).toHaveBeenCalledWith(component.cfp);
  });
});
