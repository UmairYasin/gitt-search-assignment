import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


/**
 * This class decorates the standard Http class from Angular to provide common
 * handling of Http requests and responses.
 */
@Injectable()
export class HttpDecorator {
  constructor(private http: HttpClient) {
  }

  get(url: string, options?: any) {
    return this.http.get<any>(url, options)
      .pipe(catchError(err => this.handleError(err)));
  }

  handleError(errorResponse: any) {
    // rethrow the caught error to allow other error handlers to manage the error response.
    return throwError(errorResponse);
  }
}
