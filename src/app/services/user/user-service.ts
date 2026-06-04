import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { baseBbdApiUrl } from '../base-api-url';
import { Observable } from 'rxjs';
import { ResponseBodyWithObject } from '../../models/response-body/response-body-with-object.model';
import { AddUserRequestDto } from '../../models/user/add-user-request.model';
import { ResponseBody } from '../../models/response-body/response-body.model';
import { ChangePasswordRequestDto } from '../../models/user/change-password-request.model';
import { UserIdAndCodeForAddUserByTrackerResponseDto } from '../../models/user/user-id-and-code-response.model';
import { AddStoreToUserRequestDto } from '../../models/user/add-store-to-user-request.model';
import { RequestDtoForListCoworkers } from '../../models/user/request-dto-for-list-coworkers.model';
import { IsBbdTrackerAndBbdTrackerIdResponseDto } from '../../models/user/is-bbd-tracker-and-tracker-id.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  
  private httpClient : HttpClient = inject(HttpClient);
  private userApiUrl : string = baseBbdApiUrl + "/users";

  public getStoreIdByUserId(userId : number) : Observable<ResponseBodyWithObject<number>> {
    return this.httpClient.post<ResponseBodyWithObject<number>>(`${this.userApiUrl}/get-store-id-by-user-id`, userId);
  }

  public addUser(addUserRequestDto : AddUserRequestDto) : Observable<ResponseBody> {
    return this.httpClient.post<ResponseBody>(this.userApiUrl, addUserRequestDto);
  }

  public changePassword(changePasswordRequestDto : ChangePasswordRequestDto) : Observable<ResponseBody> {
    return this.httpClient.post<ResponseBody>(`${this.userApiUrl}/change-password`, changePasswordRequestDto);
  }

  public getIsUserABbdTracker(userId : number) : Observable<ResponseBodyWithObject<IsBbdTrackerAndBbdTrackerIdResponseDto>> {
    return this.httpClient
      .get<ResponseBodyWithObject<IsBbdTrackerAndBbdTrackerIdResponseDto>>(`${this.userApiUrl}/is-user-a-bbd-tracker/${userId}`);
  }

  public getUserIdAndCodeResponseDtoList() : Observable<UserIdAndCodeForAddUserByTrackerResponseDto[]> {
    return this.httpClient.get<UserIdAndCodeForAddUserByTrackerResponseDto[]>(`${this.userApiUrl}/get-user-id-and-code-list`);
  }

  public addStoreToUserByBbdTracker(addStoreToUserRequestDto : AddStoreToUserRequestDto) : Observable<ResponseBody> {
    return this.httpClient.put<ResponseBody>(`${this.userApiUrl}/add-store-to-user-by-bbd-tracker`, addStoreToUserRequestDto);
  }

  public getUserIdAndCodeResponseDtoListWithoutHimself(requestDtoForListCoworkers : RequestDtoForListCoworkers) 
    : Observable<UserIdAndCodeForAddUserByTrackerResponseDto[]> 
    {
    return this.httpClient.post<UserIdAndCodeForAddUserByTrackerResponseDto[]>(
      `${this.userApiUrl}/get-user-id-and-code-list-without-himself`, requestDtoForListCoworkers
    );
  }

  public removeUserFromStoreByBbdTracker(addStoreToUserRequestDto : AddStoreToUserRequestDto) : Observable<ResponseBody> {
    return this.httpClient.put<ResponseBody>(
      `${this.userApiUrl}/remove-user-from-store-by-bbd-tracker`, addStoreToUserRequestDto
    );
  }

}
