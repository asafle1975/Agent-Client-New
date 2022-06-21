import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AgentViewerComponent } from './Agent/agent-viewer/agent-viewer.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { DialogModalComponent } from './General/dialog-modal/dialog-modal.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { AgentStatComponent } from './Agent/agent-stat/agent-stat.component';
import { JwtServiceService } from './General/jwt-service.service';
import { AuthenticationService } from './General/authentication.service';
import { AuthenticationInterceptor } from './General/http-interceptor/authentication-interceptor';

function checkAuth(authService: AuthenticationService, jwtService: JwtServiceService) {
  return (): Promise<any> => {
    if (authService.firstJwtChecking() == false) {
      return;
    }
    //If Jwt is existing and the valid
    return jwtService.generateToken().toPromise()
      .then(res => {
        if (res) {
          console.log(`setToken`);
        }
      }, err => {
        console.log(`checkJwt error`, err);
      });
  }
}

export function appInitializer(authenticationService: AuthenticationService, jwtService: JwtServiceService) {
  return () => new Promise(resolve => {
      // attempt to refresh token on app start up to auto authenticate
      jwtService.generateToken()
          .subscribe()
          .add(resolve);
  });
}

@NgModule({
  declarations: [
    AppComponent,
    AgentViewerComponent,
    DialogModalComponent,
    AgentStatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatListModule,
    MatSliderModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: appInitializer, deps: [AuthenticationService, JwtServiceService], multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true, deps: [AuthenticationService] },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
