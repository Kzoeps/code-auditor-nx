import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Audit } from '../models/audit';
import { APP_CONFIG } from '@selise-start/app-config';

@Injectable({
  providedIn: 'root'
})
export class AuditApiService {

  private url = `${this.appConfig.apiURL}/audits`;

  constructor(
    @Inject(APP_CONFIG) private appConfig: any,
    private http: HttpClient
  ) { }

  getAudits(): Observable<Audit[]> {
    return this.http.get<Audit[]>(this.url);
  }

  createAudit(audit: Audit): Observable<Audit> {
    return this.http.post<Audit>(this.url, audit);
  }

  getAudit(id: number): Observable<Audit> {
    const url = `${this.url}/${id}`;
    return this.http.get<Audit>(url);
  }

  updateAudit(audit: Audit): Observable<Audit>{
    const url = `${this.url}/${audit.id}`;
    return this.http.patch<Audit>(url, audit);
  }
}
