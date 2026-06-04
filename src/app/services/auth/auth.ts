import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { LoginRequestModel } from '../../models/login/login-request.model';
import { Observable, tap } from 'rxjs';
import { AuthResponseModel } from '../../models/login/auth-response.model';
import { baseBbdApiUrl } from '../base-api-url';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  
  private httpClient = inject(HttpClient);
  private apiUrl = baseBbdApiUrl+"/auth";
  public isAuthenticated = signal<boolean>(false);
  
  public login(loginRequestModel : LoginRequestModel) : Observable<AuthResponseModel> {
    return this.httpClient.post<AuthResponseModel>(`${this.apiUrl}/login`, loginRequestModel)
    .pipe(
      tap((response) => {
        this.isAuthenticated.set(true);
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('userId', response.userId.toString());

        for(let activityType of response.activityTypes){
          localStorage.setItem(activityType.activityType, activityType.id.toString());
        }
        
        if (response.isUserAdmin) {
          localStorage.setItem('role', "admin");
        } else {
          localStorage.setItem('role', "user");
        }
      })
    );
  }

  public logout() : void {
    this.isAuthenticated.set(false);
    localStorage.clear();
  }

}
