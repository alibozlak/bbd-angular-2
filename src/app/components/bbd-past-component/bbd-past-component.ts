import { Component, inject, OnInit } from '@angular/core';
import { BbdRecordService } from '../../services/bbd-record/bbd-record-service';
import { BbdPastComponentReponseDto } from '../../models/bbd-past-component/bbd-past-component-response.model';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { user, userActivityType, utilFunctions } from '../../utils/project-constant';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';
import { ResponseBody } from '../../models/response-body/response-body.model';
import { BbdPastComponentRequestDto } from '../../models/bbd-past-component/bbd-past-component-resquest.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bbd-past-component',
  imports: [MatSnackBarModule, MatButtonModule],
  templateUrl: './bbd-past-component.html',
  styleUrl: './bbd-past-component.css',
})
export class BbdPastComponent implements OnInit {

  private bbdRecordService : BbdRecordService = inject(BbdRecordService);
  private snackBar : MatSnackBar = inject(MatSnackBar);
  private router : Router = inject(Router);

  public bbdPastComponentResponseDto : BbdPastComponentReponseDto | undefined;

  ngOnInit(): void {
    this.bbdRecordService.getBbdPastRecord(history.state.bbdRecordId).subscribe({
      next : (response) => {
        this.bbdPastComponentResponseDto = response.object;
      },

      error : (error) => {
        this.snackBar.open(`Bir Hata oluştu! Ali'yi ara : 507 021 8322`, "Kapat", { duration: 4000 });
      }
    });
  }

  public convertLocalDateStringToTurkeyDateString(localDateString : string){
    return utilFunctions.convertLocalDateStringToTurkeyDateString(localDateString);
  }

  public anyUpdateQuantityButtonClicked(activityTypeId : number) {
    const bbdPastComponentRequestDto : BbdPastComponentRequestDto = {
      userId : user.getUserId(),
      activityTypeId : activityTypeId,
      bbdRecordId : this.bbdPastComponentResponseDto?.bbdRecordId!,
      quantity : this.bbdPastComponentResponseDto?.quantity!
    }

    this.bbdRecordService.updateBbdRecordForBbdPast(bbdPastComponentRequestDto).subscribe({
      next : (response) => {
        this.router.navigate(['/home'], { replaceUrl: true });
        this.snackBar.open(`İşleminiz tamamlandı`, "Kapat", { duration: 2000 });
      },

      error : (error) => {
        console.log(error);
        this.snackBar.open(`İşlem gerçekleşmedi!!`, "Kapat", { duration: 4000 });
      }
    });
  }

  public doesntExistProductButtonClicked(){
    const activityTypeId = parseInt(localStorage.getItem(userActivityType.CHECK_BBD_PAST_PRODUCT_DONT_EXIST)!);

    this.anyUpdateQuantityButtonClicked(activityTypeId);
  }

  public removedSaleBbdPastProductButtonClicked(){
    const activityTypeId = parseInt(localStorage.getItem(userActivityType.CHECK_BBD_PAST_PRODUCT_REMOVED)!);

    this.anyUpdateQuantityButtonClicked(activityTypeId);
  }
}
