import { ActivityType } from "../activity-type/activity-type.model";

export interface AuthResponseModel {
    accessToken : string;
    isUserAdmin : boolean;
    userId : number;  
    activityTypes : ActivityType[];
}