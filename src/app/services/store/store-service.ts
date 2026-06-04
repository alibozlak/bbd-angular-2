import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { baseBbdApiUrl } from '../base-api-url';
import { Observable } from 'rxjs';
import { ResponseBodyWithObject } from '../../models/response-body/response-body-with-object.model';
import { Store } from '../../models/store/store.model';
import { CreateStoreRequestDto } from '../../models/store/create-store-request-dto.model';
import { ResponseBody } from '../../models/response-body/response-body.model';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  
  private httpClient : HttpClient = inject(HttpClient);
  private storeApiUrl : String = baseBbdApiUrl + "/stores";

  public getStoreByStoreId(storeId : number) : Observable<ResponseBodyWithObject<Store>> {
    return this.httpClient.post<ResponseBodyWithObject<Store>>(this.storeApiUrl + "/get-store-by-store-id", storeId);
  }

  public getStoreList() : Observable<ResponseBodyWithObject<Store[]>> {
    return this.httpClient.get<ResponseBodyWithObject<Store[]>>(`${this.storeApiUrl}/get-all`);
  }

  public createStore(createStoreRequestDto : CreateStoreRequestDto) : Observable<ResponseBody> {
    return this.httpClient.post<ResponseBody>(this.storeApiUrl.toString(), createStoreRequestDto);
  }
}
