import { BbdListItemForRemovalDateSection } from "./bbd-list-item-for-removal-date-section.model";
import { RemovalDateSection } from "./removal-date-section.model";

export interface HomePageWholeList {

    bestBeforeDatePastList : BbdListItemForRemovalDateSection[];
    removalDateSectionList : RemovalDateSection[];
}