export interface AddBbdRecordRequestDto {
    userId : number;
    productId : number;
    bestBeforeDate : string;
    quantity : number;

    activityTypeId : number;
}