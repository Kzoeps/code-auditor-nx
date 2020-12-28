import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG } from '@selise-start/app-config';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  private url = `${this.appConfig.apiURL}/users`;

  constructor(
    @Inject(APP_CONFIG) private appConfig: any,
    private http: HttpClient
  ) {
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  getUser(id: number): Observable<User> {
    const userUrl = `${this.url}/${id}`;
    return this.http.get<User>(userUrl);
  }

  updateUser(user: User): Observable<User> {
    const url = `${this.url}/${user.id}`;
    return this.http.patch<User>(url, user);
  }

  addUser(user: User): Observable<Object> {
    return this.http.post<Object>(this.url, user);
  }
}
