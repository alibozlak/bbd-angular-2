import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { StoreService } from '../../services/store/store-service';
import { Store } from '../../models/store/store.model';
import { UserService } from '../../services/user/user-service';
import { AddUserRequestDto } from '../../models/user/add-user-request.model';
import { UserIdAndCodeForAddUserByTrackerResponseDto } from '../../models/user/user-id-and-code-response.model';
import { AddStoreToUserRequestDto } from '../../models/user/add-store-to-user-request.model';
import { user } from '../../utils/project-constant';

@Component({
  selector: 'app-add-user-component-for-bbd-tracker',
  imports: [ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './add-user-component-for-bbd-tracker.html',
  styleUrl: './add-user-component-for-bbd-tracker.css',
})
export class AddUserComponentForBbdTracker implements OnInit {

  private formBuilder : FormBuilder = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);
  private storeService : StoreService = inject(StoreService);
  private userService : UserService = inject(UserService);

  public store : Store | undefined;
  public userIdAndCodeResponseDtoList : UserIdAndCodeForAddUserByTrackerResponseDto[] | undefined;

  public userForm  = this.formBuilder.group({
    userCode : [null, [Validators.required]],
    password : [null, [Validators.required]],
  });

  ngOnInit(): void {
    this.storeService.getStoreByStoreId(parseInt(localStorage.getItem("storeId")!)).subscribe({
      next : (response) => {
        this.store = response.object;
      },

      error : (e) => {
        console.log(e.error);
      }
    });

    this.userService.getUserIdAndCodeResponseDtoList().subscribe({
      next : (response) => {
        this.userIdAndCodeResponseDtoList = response;
      },

      error : (e) => {
        console.log(e.error);
      }
    });
  }

  public add(){
    const addUserRequestDto : AddUserRequestDto = {
      storeId : this.store?.id!,
      isActive : true,
      isAdmin : false,
      isBbdTracker : false,
      userName : this.userForm.getRawValue().userCode!,
      password : this.userForm.getRawValue().password!
    }

    this.userService.addUser(addUserRequestDto).subscribe({
      next : (response) => {
        this.userForm.reset();
        this.snackBar.open("Kullanıcı Eklendi :)","Kapat", {duration : 4000});
      },

      error : (e) => {
        console.log(e.error);
        this.snackBar.open("Kullanıcı Kaydı Yapılamadı :(","Kapat", {duration : 3000});
      }
    });
  }

  public selectUser(userId : number){
    const addStoreToUserByBbdTrackerRequestDto : AddStoreToUserRequestDto = {
      userId : userId,
      storeId : this.store?.id!,
      activityTypeId : parseInt(localStorage.getItem("ADD_STORE_TO_USER_BY_BBD_TRACKER")!),
      bbdTrackerId : user.getUserId()
    }

    this.userService.addStoreToUserByBbdTracker(addStoreToUserByBbdTrackerRequestDto).subscribe({
      next : (response) => {
        let indexForRemoveUser : number =  this.userIdAndCodeResponseDtoList?.findIndex(u => u.id == userId)!;
        let removedUsers =  this.userIdAndCodeResponseDtoList?.splice(indexForRemoveUser, 1);

        this.snackBar.open(`${removedUsers![0].userName} kodlu kullanıcı mağazanıza eklendi.`,"Kapat", {duration : 5000});
      },

      error : (e) => {
        this.snackBar.open(`Mağazaya eleman ekleme başarısız! :(`,"Kapat", {duration : 5000});
        console.log(e.error);
      }
    });
  }

}
