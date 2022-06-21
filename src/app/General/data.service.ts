import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { WebApiResponse } from './models';
import HttpStatusCode from './http-status-code.enum';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {
   }


   getHttp<T>(url: string, requestData?: any, showError: boolean = true): Observable<any> {

    const queryString = requestData ? this.parseRequestDataToQueryString(requestData) : '';
    return this.http.get<WebApiResponse<T>>(url + queryString)
      .pipe(
        map(value => {
          const response = value as WebApiResponse<T>;
          return this.onSuccess(response);
        }),
        catchError((err: any) => {
          if (showError == false)
            throw err;

          console.log(err);
          throw err;
        })
      );
  }

  postHttp<T>(url: string, requestData?: HttpParams): Observable<any> {
    var options = { params:  requestData };
    return this.http.post<WebApiResponse<T>>(url,null, options)
    .pipe(
      map(value => {
        const response = value as WebApiResponse<T>;
        return this.onSuccess(response);
      }),
      catchError(err => {

        console.log(err);
        throw err;
      })
    );
  }


  private parseRequestDataToQueryString(requestData: any): string {
    let queryString = '?';
    for (const propName in requestData) {
      queryString = queryString + `${propName}=${requestData[propName]}&`;
    }
    queryString = queryString.slice(0, -1);
    return queryString;
  }

  private onSuccess<T>(response: WebApiResponse<any>): any {
    if (response.data && !response.data.isRevealErrorMessage) {

      switch (response.statusCode) {
        case HttpStatusCode.OK:
          return response.data;
        case HttpStatusCode.BAD_REQUEST:
          this.handleError(response, 'לא תקין', 'בקשה לא תקינה  ');
          break;
        case HttpStatusCode.INTERNAL_SERVER_ERROR:
          this.handleError(response, 'חלה שגיאה בשרת', 'חלה שגיאה בשרת');
        default:
          break;
      }

     }  else {
      this.handleError(response, 'שגיאה', response.errorMessage);
    }
  }
  private handleError<T>(response: WebApiResponse<T>, errorTitle: string, errorMessage: string): void {

    console.log(response.errorMessage);
  }
}
