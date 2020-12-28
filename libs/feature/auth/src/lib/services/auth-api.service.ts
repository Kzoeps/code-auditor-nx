import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '@selise-start/user';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '@selise-start/app-config';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  httpOptions = {
    headers: new  HttpHeaders({
    })
  }

  constructor(
    @Inject(APP_CONFIG) private appConfig: any,
    private http: HttpClient
  ) { }

  register(user: User): Observable<User> {
    const registerURL = `${this.appConfig.apiURL}/register`;
    return this.http.post<User>(registerURL, user, this.httpOptions);
  }

  login(loginCredentials: Object): Observable<Object> {
    const loginURL = `${this.appConfig.apiURL}/login`;
    return this.http.post<Object>(loginURL, loginCredentials, this.httpOptions);
  }
}
