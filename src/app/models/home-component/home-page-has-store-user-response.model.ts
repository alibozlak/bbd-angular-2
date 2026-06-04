import { HomePageStoreResponseDto } from "../store/home-page-store-response-dto.model";
import { HomePageWholeList } from "./home-page-whole-list.model";

export interface HomePageHasStoreUserResponseDto {

    homePageStoreResponseDto : HomePageStoreResponseDto;
    homePageWholeList : HomePageWholeList;
}