import { Component, inject, OnInit } from '@angular/core';
import { UpdateBbdRecordPageModel } from '../../models/update-bbd-record/update-bbd-record-page-model.model';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { user, userActivityType, utilFunctions } from '../../utils/project-constant';
import { SaleProductRequestDto } from '../../models/bbd-record/sale-product-request.model';
import { BbdRecordService } from '../../services/bbd-record/bbd-record-service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { DeleteBbdRecordRequestDto } from '../../models/bbd-record/delete-bbd-record-request.model';

@Component({
  selector: 'app-edit-bbd-record-component',
  standalone: true,
  imports: [FormsModule, RouterLink, MatButtonModule, MatIconModule, MatSelectModule, MatFormField, MatLabel, MatOption,
    MatSnackBarModule
  ],
  templateUrl: './edit-bbd-record-component.html',
  styleUrl: './edit-bbd-record-component.css',
})
export class EditBbdRecordComponent implements OnInit {

  public model: UpdateBbdRecordPageModel | undefined;
  public quantityList: number[] = [];
  public selectedGiveQuantity: number = 1;
  public selectedSaleQuantity: number = 1;

  private bbdRecordService: BbdRecordService = inject(BbdRecordService);
  private snackBar = inject(MatSnackBar);
  private router : Router = inject(Router);

  ngOnInit(): void {
    const bbdRecordId = history.state.bbdRecordId;

    if (bbdRecordId) {
      this.bbdRecordService.getUpdateBbdRecordPageModel(bbdRecordId).subscribe({
        next: (response) => {
          this.model = response.object;
          this.model.bbdRecordId = bbdRecordId;

          for (let i = 0; i < response.object.quantity; i++) {
            this.quantityList[i] = i + 1;
          }
        },

        error: (error) => {
          console.log(error);
          this.snackBar.open(`Sayfa yüklenirken bir hata oluştu!!`, "Kapat", { duration: 2000 });
        }
      });
    }
  }

  onAction(quantity: number, activityType: string) {
    let activityTypeId: number;

    if (activityType == "GIVE") {
      activityTypeId = parseInt(localStorage.getItem(userActivityType.REMOVAL_TYPE_GIVE)!);
    } else {
      activityTypeId = parseInt(localStorage.getItem(userActivityType.REMOVAL_TYPE_SALE)!);
    }

    const saleProductRequestDto: SaleProductRequestDto = {
      activityTypeId: activityTypeId,
      bbdRecordId: this.model?.bbdRecordId!,
      newQuantity: (this.quantityList.length - quantity),
      quantity: quantity,
      userId: user.getUserId()
    };

    this.bbdRecordService.saleProduct(saleProductRequestDto).subscribe({
      next: (response) => {
        this.quantityList.splice(saleProductRequestDto.newQuantity);
        if (saleProductRequestDto.newQuantity > 0) {
          this.snackBar.open(`${saleProductRequestDto.newQuantity} Adet Kaldı..`, "Kapat", { duration: 2000 });
        } else {
          this.snackBar.open(`Üründen hiç kalmadı. Sıradakine devam..`, "Kapat", { duration: 2000 });
        }
      },

      error: (error) => {
        this.snackBar.open(`İşlem yapılamadı.. :(`, "Kapat", { duration: 2000 });
        console.log(error);
      }
    });
  }

  public convertLocalDateStringToTurkeyDateString(localDateString : String) : String {
    return utilFunctions.convertLocalDateStringToTurkeyDateString(localDateString);
  }

  public onDelete(){
    
    const deleteBbdRecordRequestDto : DeleteBbdRecordRequestDto = {
      bbdRecordId : this.model?.bbdRecordId!,
      userId : user.getUserId(),
      quantity : this.model?.quantity!,
      activityTypeId : parseInt(localStorage.getItem(userActivityType.DELETE_BBD_RECORD)!)
    }

    this.bbdRecordService.deleteBbdRecord(deleteBbdRecordRequestDto).subscribe({
      next : (response) => {
        if (response.success) {
          this.router.navigate(['/home'], { replaceUrl: true });
          this.snackBar.open(`SKT kaydı silindi!`, "Kapat", { duration: 2000 });
        }
      },

      error : (error) => {
        this.snackBar.open(`Silme işlemi yapılamadı :(`, "Kapat", { duration: 2000 });
        console.log(error);
      }
    });
  }

}