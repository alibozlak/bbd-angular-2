import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UserService } from '../../services/user/user-service';
import { user } from '../../utils/project-constant';
import { ChangePasswordRequestDto } from '../../models/user/change-password-request.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-user-password-component',
  imports: [ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './change-user-password-component.html',
  styleUrl: './change-user-password-component.css',
})
export class ChangeUserPasswordComponent {

  private formBuilder : FormBuilder = inject(FormBuilder);
  private snackBar  = inject(MatSnackBar);
  private userService : UserService = inject(UserService);
  private router : Router = inject(Router);

  public changePasswordForm = this.formBuilder.group({
     previousPassword :  [null, Validators.required],
     newPassword : [null, Validators.required],
  });

  public changePassword(){
    const changePasswordRequestDto : ChangePasswordRequestDto = {
      userId : user.getUserId(),
      previousPassword : this.changePasswordForm.getRawValue().previousPassword!,
      newPassword : this.changePasswordForm.getRawValue().newPassword!,
      activityTypeId : parseInt(localStorage.getItem("USER_CHANGE_PASSWORD")!)
    }

    this.userService.changePassword(changePasswordRequestDto).subscribe({
      next : (response) => {
        this.router.navigate(['/'], { replaceUrl: true });
        this.snackBar.open("Şifre güncellendi!", "Kapat", { duration: 3000 });
      },

      error : (error) =>  {
        console.log(error);
        alert(error.error.message);
      }
    });
  }

}
