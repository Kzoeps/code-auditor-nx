import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export class HeaderInterceptor implements HttpInterceptor {
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.getToken();
    return next.handle(httpRequest.clone({setHeaders: {'Authorization': 'Bearer '+token}}))
  }

  getToken(): Object | '' {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      return user.token;
    }
    return ''
  }
}
