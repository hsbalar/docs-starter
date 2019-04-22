import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { BaseURL, Organization, User } from '../reference/api.constant';
import { AccountContext } from '../services/account.context';

@Injectable()
export class BackendService {
  contentHeaders: any;

  constructor(private http: HttpClient, private accountContext: AccountContext) {}

  setContentHeaders() {
    let authorization = this.accountContext.currentElement ?
    `User ${User}, Organization ${Organization}, Element ${this.accountContext.currentElement}` : 
    `User ${User}, Organization ${Organization}`;

    const contentHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': authorization
    };
    this.contentHeaders = { headers: new HttpHeaders(contentHeaders) };
  }

  postDataService(URL: any, data: any) {
    this.setContentHeaders();
    return this.http.post(`${BaseURL}${URL}`, data, this.contentHeaders);
  }

  getDataService(URL: any) {
    this.setContentHeaders();
    return this.http.get(`${BaseURL}${URL}`, this.contentHeaders);
  }

  deleteService(URL: any, id?: any) {
    return this.http.delete(`${BaseURL}${URL}/${id}`);
  }
}
