import { Injectable } from '@angular/core';
import {HttpDecorator} from '../http-decorator/http-decorator.service';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {HttpParams} from '@angular/common/http';

/**
 * This class provides the Git service which interacts with the GIT USER REST API.
 */
@Injectable()
export class GitApiService {
  private baseUrl = 'https://api.github.com/search/users';
  gitSearchResults: any = null;
  constructor(protected http: HttpDecorator) {
  }

  /****************************************************************************
   * GIT USER SEARCH ENDPOINT
   ****************************************************************************/
  searchGitUsers(query: string) {
    let params: HttpParams = new HttpParams();
    params = params.append('q', query);
    const options = this.generateOptions(params);
    return this.wrap(this.http.get(this.baseUrl , options));
  }


  /****************************************************************************
   * GIT USER DETAIL ENDPOINT
   ****************************************************************************/
  getUserDetail(userUrl: string) {
    return this.wrap(this.http.get(userUrl));
  }


  setGitSearchResults(result: any) {
    this.gitSearchResults = result;
  }

  getGitSearchResults() {
    return this.gitSearchResults;
  }

  protected wrap(obs: Observable<any>): Observable<any> {
    // I have put catch error in this mehtod which is missing before.
    return obs.pipe(map(this.extractData), catchError(this.handleError));
  }

  protected extractData(res: Response) {
    return res;
  }

  protected handleError(errorResponse: any) {
    console.log('errorResponse', errorResponse);
    const error = errorResponse;
    return throwError(error);
  }

  protected generateOptions(searchParams: HttpParams): any {

    const httpOptions = {
      params: new HttpParams(),
      responseType: ''
    };
    // const options = new RequestOptions({headers: headers});
    if (searchParams) {
      httpOptions.params = searchParams;
    }

    return httpOptions;
  }
}
