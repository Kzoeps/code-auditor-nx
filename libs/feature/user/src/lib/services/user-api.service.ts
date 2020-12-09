import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  constructor( private http: HttpClient ) { }

  private url = 'http://localhost:3000/users';

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.url);
  }
}
