import { Injectable } from '@angular/core';
import {API} from "../models/api.interface";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {StringUtil} from "../util/string-util";
import {PortalType} from "../constant/portal-type.enum";

@Injectable({
  providedIn: 'root'
})
export class HttpDaoService {

  private baseURI = 'http://localhost:8181/api/';
  private baseURINonAuth = 'auth';
  private baseURIUser = 'user';
  private baseSession = 'session';

  private headerApplicationJson = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) { }

  doPost(pathAPI: API, body: any): Observable<any> {
    const href = this.pathAPI(pathAPI);
    return this.http.post<any>(href, body, {headers: this.headerApplicationJson});
  }

  doGet(pathAPI: API, params?: {}): Observable<any> {
    const href = this.pathAPI(pathAPI, params);
    return this.http.get<any[]>(href, {headers: this.headerApplicationJson});
  }

  pathAPI(pathAPI: API, params?: {}): string {
    let apiFull = this.baseURI;
    if (pathAPI.module == PortalType.NON_AUTH) {
      apiFull += this.baseURINonAuth;
    }
    if (pathAPI.module == PortalType.USER) {
      apiFull += this.baseURIUser;
    }
    if (pathAPI.module == PortalType.SESSION) {
      apiFull += this.baseSession;
    }
    let tmpURI = pathAPI.uri;
    if (params) {
      tmpURI = StringUtil.formatString(tmpURI, params);
    }
    return (apiFull + tmpURI);
  }


}
