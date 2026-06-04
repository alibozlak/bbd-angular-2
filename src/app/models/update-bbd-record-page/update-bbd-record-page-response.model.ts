import { BbdRecordWithoutRemovalDateResponse } from "../bbd-record/bbd-record-without-removal-date-response.model";
import { ProductIdNameCodeAndPriceResponseDto } from "../product/product-id-name-code-price.model";

export interface UpdateBbdRecordPageResponseDto {
    
    bbdRecordWithoutRemovalDateResponse : BbdRecordWithoutRemovalDateResponse ;
    productIdNameCodeAndPriceResponseDtoList : ProductIdNameCodeAndPriceResponseDto[];
}