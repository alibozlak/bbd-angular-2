import { HomePageStoreResponseDto } from "../store/home-page-store-response-dto.model";
import { HomePageWholeList } from "./home-page-whole-list.model";

export interface HomePageResponseDto {

    userId : number;
    hasStore : boolean;
    isAdmin : boolean;

    homePageStoreResponseDto : HomePageStoreResponseDto;
    homePageWholeList : HomePageWholeList;
}