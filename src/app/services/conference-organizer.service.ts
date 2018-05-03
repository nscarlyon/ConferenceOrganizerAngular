import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import 'rxjs/add/operator/map';
import {catchError} from "rxjs/operators";
import {CFP} from "../shared/CFP";

@Injectable()
export class ConferenceOrganizerService {
  private _url = "http://localhost:65388/";
  private _headers = new HttpHeaders().set("Content-Type", "application/json");
  private _options: any;

  constructor(private _http: HttpClient) {
    this._options = {headers: this._headers};
  }

  getCfpStatus(): Observable<any> {
    return this._http.get(`${this._url}cfp`, this._options).pipe(catchError((error) => {
      return "error";
    })).map((response) => {
      return response;
    });
  }

  openCfp(cfp: CFP): Observable<any> {
    return this._http.put(`${this._url}CFP/${cfp.id}`, cfp, this._options).pipe(catchError((error) => {
      return "error";
    })).map((response) => {
      return response;
    });
  }

  closeCfp(cfp: CFP): Observable<any> {
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

  putSchedule(schedule: any): Observable<any> {
    return this._http.put(`${this._url}schedule/${schedule.id}`, schedule, this._options).pipe(catchError((error) => {
      return "error";
    })).map((response) => {
      return response;
    });
  }

  clearSchedule(schedule: any): Observable<any> {
    return this._http
      .delete(`${this._url}/schedule`, this._options).pipe(catchError((error) => {
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

  getProposal(proposalId: string): Observable<any> {
    return this._http
      .get(`${this._url}/proposals/${proposalId}`, this._options).pipe(catchError((error) => {
        return "error";
      })).map((response) => {
        return response;
      });
  }

  postProposal(proposal: any): Observable<any> {
     return this._http
                .post(`${this._url}/proposals`, proposal, this._options);
  }

  deleteProposal(proposalId: string): Observable<any> {
    return this._http
      .delete(`${this._url}/proposals/${proposalId}`, this._options).pipe(catchError((error) => {
        return "error";
      })).map((response) => {
        return response;
      });
  }

  postSession(session: any): Observable<any> {
    return this._http.post(`${this._url}/sessions`, session, this._options);
  }

  getSessions(): Observable<any> {
    return this._http
      .get(`${this._url}/sessions`, this._options).pipe(catchError((error) => {
        return "error";
      })).map((response) => {
        return response;
      });
  }

  getSession(sessionId: string): Observable<any> {
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
}
