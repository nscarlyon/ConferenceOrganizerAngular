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
      return response;
    });
  }

  openCfp(cfp: any): Observable<any> {
    return this._http.put(`${this._url}CFP/${cfp.id}`, cfp, this._options).pipe(catchError((error) => {
      return "error";
    })).map((response) => {
      return response;
    });
  }

  closeCfp(cfp: any): Observable<any> {
    return this._http.put(`${this._url}CFP/${cfp.id}`, cfp, this._options).pipe(catchError((error) => {
      return "error";
    })).map((response) => {
      return response;
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
    return this._http.post(`${this._url}/sessions`, session, this._options);
  }

  getProposalById(proposalId: string): Observable<any> {
    return this._http
      .get(`${this._url}/proposals/${proposalId}`, this._options).pipe(catchError((error) => {
        return "error";
      })).map((response) => {
        return response;
      });
  }

  putSchedule(schedule: any): Observable<any> {
    return this._http.put(`${this._url}schedule/${schedule.id}`, schedule, this._options).pipe(catchError((error) => {
      return "error";
    })).map((response) => {
      return response;
    });
  }

  getSessions(): Observable<any> {
    return this._http
      .get(`${this._url}/sessions`, this._options).pipe(catchError((error) => {
        return "error";
      })).map((response) => {
        return response;
      });
  }

  publishSchedule(schedule: any): Observable<any> {
    return this._http.put(`${this._url}schedule/publish`, schedule, this._options).pipe(catchError((error) => {
      return "error";
    })).map((response) => {
      return response;
    });
  }

  unpublishSchedule(schedule: any): Observable<any> {
    return this._http.put(`${this._url}schedule/unpublish`, schedule, this._options).pipe(catchError((error) => {
      return "error";
    })).map((response) => {
      return response;
    });
  }

  getSessionById(sessionId: string): Observable<any> {
    return this._http
      .get(`${this._url}/sessions/${sessionId}`, this._options).pipe(catchError((error) => {
        return "error";
      })).map((response) => {
        return response;
      });
  }

  deleteSession(sessionId: string): Observable<any> {
    return this._http
      .delete(`${this._url}/sessions/${sessionId}`, this._options).pipe(catchError((error) => {
        return "error";
      })).map((response) => {
        return response;
      });
  }

  updateProposal(proposal: any): Observable<any> {
    return this._http
      .put(`${this._url}/proposals`, proposal, this._options).pipe(catchError((error) => {
        return "error";
      })).map((response) => {
        return response;
      });
  }

  deleteProposal(proposalId: number): Observable<any> {
    return this._http
      .delete(`${this._url}/proposals/${proposalId}`, this._options).pipe(catchError((error) => {
        return "error";
      })).map((response) => {
        return response;
      });
  }

  deleteSchedule(schedule: any): Observable<any> {
    return this._http
      .delete(`${this._url}/schedule`, this._options).pipe(catchError((error) => {
        return "error";
      })).map((response) => {
        return response;
      });
  }
}
