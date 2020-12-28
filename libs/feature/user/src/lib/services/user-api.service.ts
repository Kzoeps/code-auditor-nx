import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_CONFIG } from '@selise-start/app-config';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  private url = `${this.appConfig.apiURL}/users`;
  private token = this.getToken();
  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer '+this.token
    })
  };

  constructor(
    @Inject(APP_CONFIG) private appConfig: any,
    private http: HttpClient
  ) { }

  getToken(): Object|'' {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      return user.token;
    } else {
      return ''
    }
  }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.url);
  }

  getUser(id: number): Observable<User>{
    const userUrl = `${this.url}/${id}`;
    return this.http.get<User>(userUrl);
  }

  updateUser(user: User): Observable<User>{
    const url = `${this.url}/${user.id}`;
    return this.http.patch<User>(url, user, this.httpOptions);
  }

  addUser(user: User): Observable<Object> {
    return this.http.post<Object>(this.url, user, this.httpOptions);
  }
}
