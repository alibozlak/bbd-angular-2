export interface AddOrUpdateProductRequestDto {
    productName : string;
    productCode : string;
    bestBefore : number;
    price : number;
    tax : number;

    userId : number;
    bbdTrackerId : number;
    activityTypeId : number;
}