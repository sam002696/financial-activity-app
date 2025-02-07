import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlBuilderService } from './url-builder.service';
import { Signup } from '../model/user/signup';
import { Observable } from 'rxjs';
import { IApiResponse } from '../model/apiresponse/apiresponse';
import { Login } from '../model/user/login';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private http: HttpClient, private urlBuilder: UrlBuilderService) { }

  signup(obj: Signup): Observable<IApiResponse> {
    const url = this.urlBuilder.buildUrl('auth/register');
    return this.http.post<IApiResponse>(url, obj);
  }


  login(obj: Login): Observable<IApiResponse> {
    const url = this.urlBuilder.buildUrl('auth/login');
    return this.http.post<IApiResponse>(url, obj);
  }



}
