import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { baseBbdApiUrl } from '../base-api-url';
import { AddOrUpdateProductRequestDto } from '../../models/product/add-or-update-product-request.model';
import { Observable } from 'rxjs';
import { ResponseBody } from '../../models/response-body/response-body.model';
import { ProductIdNameCodeAndPriceResponseDto } from '../../models/product/product-id-name-code-price.model';
import { ResponseBodyWithObject } from '../../models/response-body/response-body-with-object.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private httpClient : HttpClient = inject(HttpClient);
  private apiUrl = baseBbdApiUrl + "/products"

  public addProduct(addProductRequestDto : AddOrUpdateProductRequestDto) : Observable<ResponseBody> {
    return this.httpClient.post<ResponseBody>(`${this.apiUrl}`, addProductRequestDto);
  }

  public getAllProductIdNameCodeAndPriceDtos() : Observable<ResponseBodyWithObject<ProductIdNameCodeAndPriceResponseDto[]>> {
    return this.httpClient.get<ResponseBodyWithObject<ProductIdNameCodeAndPriceResponseDto[]>>(
      `${this.apiUrl}/get-all-product-id-name-code-and-price-dto`
    );
  }
  
}
