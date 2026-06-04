import { Component, inject, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UserService } from '../../services/user/user-service';
import { UserIdAndCodeForAddUserByTrackerResponseDto } from '../../models/user/user-id-and-code-response.model';
import { RequestDtoForListCoworkers } from '../../models/user/request-dto-for-list-coworkers.model';
import { store, user } from '../../utils/project-constant';
import { AddStoreToUserRequestDto } from '../../models/user/add-store-to-user-request.model';

@Component({
  selector: 'app-remove-user-from-store-by-bbd-tracker-component',
  imports: [MatSnackBarModule],
  templateUrl: './remove-user-from-store-by-bbd-tracker-component.html',
  styleUrl: './remove-user-from-store-by-bbd-tracker-component.css',
})
export class RemoveUserFromStoreByBbdTrackerComponent implements OnInit {

  private snackBar  = inject(MatSnackBar);
  private userService : UserService = inject(UserService);

  public userIdAndCodeResponseDtoList : UserIdAndCodeForAddUserByTrackerResponseDto[] | undefined;

  ngOnInit(): void {
    const requestDtoForListCoworkers : RequestDtoForListCoworkers = {
      storeId : store.getStoreId(),
      userId : user.getUserId(),
    };

    this.userService.getUserIdAndCodeResponseDtoListWithoutHimself(requestDtoForListCoworkers).subscribe({
      next : (response) => {
        this.userIdAndCodeResponseDtoList = response;
      },

      error : (e) => {
        this.snackBar.open(`Mağazadaki çalışma arkadaşları listelenemedi :(`,"Kapat", {duration : 5000});
      }
    });
  }

  public removeUserFromStore(userId : number, userCode : string){  
    const removeUserFromStoreByBbdTrackerRequestDto : AddStoreToUserRequestDto = {
      userId : userId,
      storeId : store.getStoreId(),
      activityTypeId : parseInt(localStorage.getItem("REMOVE_USER_FROM_STORE_BY_BBD_TRACKER")!),
      bbdTrackerId : user.getUserId(),
    };

    this.userService.removeUserFromStoreByBbdTracker(removeUserFromStoreByBbdTrackerRequestDto).subscribe({
      next : (response) => {
        const indexForRemovedUser : number = this.userIdAndCodeResponseDtoList?.findIndex(u => u.id == userId)!;
        this.userIdAndCodeResponseDtoList?.splice(indexForRemovedUser, 1);

        this.snackBar.open(`${userCode} kodlu çalışan mağazadan çıkarıldı..`,"Kapat", {duration : 2000});
      },

      error : (e) => {
        console.log(e.error);        
        this.snackBar.open(`${userCode} kodlu çalışan mağazadan çıkarılamadı :(`,"Kapat", {duration : 4000});
      }
    });
  }

}