export interface ChangePasswordRequestDto {

    userId : number;
    previousPassword : string;
    newPassword : string;

    activityTypeId : number;
}