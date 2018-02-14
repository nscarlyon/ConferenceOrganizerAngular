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
                .post(`${this._url}speakers/proposals`, proposal, this._options);
    }
}
