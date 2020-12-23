import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '@selise-start/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  private url = 'http://localhost:3000'
  httpOptions = {
    headers: new  HttpHeaders({
      'Content-Type':'application/json'
    })
  }

  constructor( private http: HttpClient ) { }

  register(user: User): Observable<User> {
    const registerURL = `${this.url}/register`;
    return this.http.post<User>(registerURL, user, this.httpOptions);
  }

  login(loginCredentials: Object): Observable<Object> {
    const loginURL = `${this.url}/login`;
    return this.http.post<Object>(loginURL, loginCredentials, this.httpOptions);
  }
}
