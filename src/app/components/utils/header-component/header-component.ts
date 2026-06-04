import { Component, inject, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user/user-service';
import { user } from '../../../utils/project-constant';

@Component({
  selector: 'app-header-component',
  imports: [MatToolbarModule, MatMenuTrigger, MatIconModule, MatMenuModule, MatDividerModule],
  templateUrl: './header-component.html',
  styleUrl: './header-component.css',
})
export class HeaderComponent implements OnInit {

  private router : Router = inject(Router);
  private userService : UserService = inject(UserService);

  public isUserABbdTracker : Boolean | undefined;

  ngOnInit(): void {
    
    const userId = user.getUserId();
    this.userService.getIsUserABbdTracker(userId).subscribe({
      next : (response) => {
        this.isUserABbdTracker = response.object.isUserABbdTracker;
        if (this.isUserABbdTracker)
          localStorage.setItem("bbdTrackerId", response.object.bbdTrackerId.toString());
        
      },

      error : (error) => {
        console.log(error.error)
      }
    });
  }

  public logout() : void {
    
    localStorage.clear(); 
    this.router.navigate(['/login'], { replaceUrl: true });
  }

  public goChangePasswordPage(){
    this.router.navigate(['/change-password']);
  }

  public goAddUserForBbdTrackerPage(){
    this.router.navigate(['/add-user-for-bbd-tracker'], { state : { storeId : parseInt(localStorage.getItem("storeId")!) } });
  }

  public goUserListForBbdTracker(){
    this.router.navigate(
      ['/remove-user-from-store-by-bbd-tracker'], 
      { state : { storeId : parseInt(localStorage.getItem("storeId")!) } }
    );
  }

  public goAddProductPage(){
    this.router.navigate(['/add-or-update-product']);
  }


}
