import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

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
    this._http
      .get(`${this._url}cfp`, this._options)
      .subscribe(
        data => {
          return data["status"];
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log('An error occurred:', err.error.message);
          } else {
            console.log(`Backend returned code ${err.status}, body was: ${err.error[0]}`);
          }
        }
      );
  }

  postProposal(proposal: any): Observable<any> {
     return this._http
                .post(`${this._url}proposals`, proposal, this._options);
    }
}
