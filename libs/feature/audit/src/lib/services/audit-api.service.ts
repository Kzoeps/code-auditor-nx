import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Audit } from '../models/audit';

@Injectable({
  providedIn: 'root'
})
export class AuditApiService {

  private url = 'http://localhost:3000/audits';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor( private http: HttpClient ) { }

  getAudits(): Observable<Audit[]> {
    return this.http.get<Audit[]>(this.url);
  }

  createAudit(audit: Audit): Observable<Audit> {
    return this.http.post<Audit>(this.url, audit, this.httpOptions);
  }

  getAudit(id: number): Observable<Audit> {
    const url = `${this.url}/${id}`;
    return this.http.get<Audit>(url);
  }
}
