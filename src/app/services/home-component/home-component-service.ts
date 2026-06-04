import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { baseBbdApiUrl } from '../base-api-url';
import { ResponseBodyWithObject } from '../../models/response-body/response-body-with-object.model';
import { RemovalDateSection } from '../../models/home-component/removal-date-section.model';
import { HomePageResponseDto } from '../../models/home-component/home-page-response-dto.model';

@Injectable({
  providedIn: 'root',
})
export class HomeComponentService {

  private httpClient : HttpClient = inject(HttpClient);
  private apiUrl : String = baseBbdApiUrl + "/homepage";

  public getBbdListByUserId(userId : number) {
    
    return this.httpClient
      .get<ResponseBodyWithObject<HomePageResponseDto>>(this.apiUrl + "/get-whole-data-for-home-page/" + userId);
  }
}
