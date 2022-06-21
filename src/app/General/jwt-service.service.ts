import { environment } from './../../environments/environment';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { DataService } from './data.service';
import { JwtUrl } from './jwtConfig';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class JwtServiceService {

  private readonly jwtName: string = environment.Name;
  private readonly jwtId: string = environment.Id;


  constructor(private dataService: DataService,private authenticationService: AuthenticationService) { }

  generateToken(): Observable<any> {
    var options = new HttpParams().set('jwtId', this.jwtId).set('jwtName', this.jwtName) ;

    return this.dataService.postHttp<Array<string>>(JwtUrl.GenerateToken, options).pipe(
      tap((token: string) => {
        this.authenticationService.setToken(token);
      }),
      catchError(err => {
        if (err.status === 401 || err.status === 403) {
          return of(null);
        }
      }));
  }

}
