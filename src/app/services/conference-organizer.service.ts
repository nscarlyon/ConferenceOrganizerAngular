import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import 'rxjs/add/operator/map';
import {catchError} from "rxjs/operators";

@Injectable()
export class ConferenceOrganizerService implements OnInit {
  private _url = "http://localhost:65388/";
  private _headers = new HttpHeaders().set("Content-Type", "application/json");
  private _options: any;

  constructor(private _http: HttpClient) {
    this._options = {headers: this._headers};
  }

  ngOnInit() {
    this.getCfpStatus();
  }

  getCfpStatus(): any {
    return this._http.get(`${this._url}cfp`, this._options).pipe(catchError((error) => {
      return "error";
    })).map((response) => {
      return response["status"];
    });
  }

  getSchedule(): Observable<any> {
    return this._http.get(`${this._url}schedule`, this._options).pipe(catchError((error) => {
      return "error";
    })).map((response) => {
      return response;
    });
  }

  getProposals(): Observable<any> {
    return this._http
      .get(`${this._url}/proposals`, this._options).pipe(catchError((error) => {
        return "error";
      })).map((response) => {
        return response;
      });
  }

  postProposal(proposal: any): Observable<any> {
     return this._http
                .post(`${this._url}/proposals`, proposal, this._options);
  }

  addSession(session: any): Observable<any> {
    let sessionToEdit: any = this._http.get(`${this._url}schedule/findsession`, this._options);
    return this._http.put(`${this._url}schedule/sessions`, session, this._options);
  }

  editSession(session: any, id: string): void {
    this._http.put(`${this._url}schedule/sessions/${id}`, session, this._options)
  }

  getProposalById(proposalId: string): Observable<any> {
    return this._http
      .get(`${this._url}/proposals/${proposalId}`, this._options).pipe(catchError((error) => {
        return "error";
      })).map((response) => {
        return response;
      });
  }

  addRoom(rooms: any):Observable<any> {
    let postData: any = {
      rooms: rooms
    };
    return this._http.put(`${this._url}schedule/rooms`, postData, this._options).pipe(catchError((error) => {
      return "error";
    })).map((response) => {
      return response;
    });
  }
}
