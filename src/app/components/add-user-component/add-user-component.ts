import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Store } from '../../models/store/store.model';
import { StoreService } from '../../services/store/store-service';
import { AddUserRequestDto } from '../../models/user/add-user-request.model';
import { UserService } from '../../services/user/user-service';

@Component({
  selector: 'app-add-user-component',
  imports: [
    ReactiveFormsModule, 
    CommonModule,
    MatSnackBarModule
  ],
  templateUrl: './add-user-component.html',
  styleUrl: './add-user-component.css',
})
export class AddUserComponent implements OnInit {

  private formBuilder = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);
  private storeService : StoreService = inject(StoreService);
  private userService : UserService = inject(UserService);

  public stores : Store[] | undefined;

  public userForm = this.formBuilder.group({
    storeId : [null, Validators.required],
    username : [null, [Validators.required]],
    password : [null, [Validators.required]]
  });

  ngOnInit(): void {
    this.storeService.getStoreList().subscribe({
      next : (response) => {
        this.stores = response.object;
      },

      error : (error) => {
        console.log(error);
        this.snackBar.open("Mağazalar Veritabanından Çekilemedi :(","Kapat", {duration : 2000});
      }
    });
  }

  public save(){
    const addUserRequestDto : AddUserRequestDto = {
      storeId : this.userForm.getRawValue().storeId!,
      userName : `${this.userForm.getRawValue().username!}`,
      password : this.userForm.getRawValue().password!,
      isAdmin : false,
      isActive : true,
      isBbdTracker : false,
    };

    this.userService.addUser(addUserRequestDto).subscribe({
      next : (response) => {
        alert("Kullanıcı Kaydedildi! :)");
        this.userForm.reset();
      },

      error : (error) => {
        this.snackBar.open("Kullanıcı Kaydı Yapılamadı :(","Kapat", {duration : 3000});
      }
    });
  }
}
