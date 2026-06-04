export interface AddUserRequestDto {

    userName : string;
    password : string;
    storeId : number;
    isAdmin : boolean;
    isActive : boolean;
    isBbdTracker : boolean;
}