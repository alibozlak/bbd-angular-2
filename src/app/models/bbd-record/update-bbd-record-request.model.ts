export interface UpdateBbdRecordRequestDto {
    bbdRecordId : number;
    userId : number;
    productId : number;
    bestBeforeDate : string;
    quantity : number;

    activityTypeId : number;
}