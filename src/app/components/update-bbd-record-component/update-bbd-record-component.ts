import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BbdRecordService } from '../../services/bbd-record/bbd-record-service';
import { ProductIdNameCodeAndPriceResponseDto } from '../../models/product/product-id-name-code-price.model';
import { UpdateBbdRecordRequestDto } from '../../models/bbd-record/update-bbd-record-request.model';
import { user, userActivityType } from '../../utils/project-constant';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-bbd-record-component',
  imports: [ReactiveFormsModule, CommonModule, MatSnackBarModule],
  templateUrl: './update-bbd-record-component.html',
  styleUrl: './update-bbd-record-component.css',
})
export class UpdateBbdRecordComponent implements OnInit {

  private formBuilder = inject(FormBuilder);
  private bbdService = inject(BbdRecordService);
  private snackBar = inject(MatSnackBar)
  private router = inject(Router);

  public products: ProductIdNameCodeAndPriceResponseDto[] | undefined;
  public bbdRecordId: number | undefined;

  public bbdForm = this.formBuilder.group({
    productId: [null as Number | null, Validators.required],
    bestBeforeDate: [null as string | null, Validators.required],
    quantity: [null as number | null, [Validators.required]]
  });

  ngOnInit(): void {
    this.bbdRecordId = history.state.bbdRecordId;

    this.bbdService.getUpdateBbdRecordPageDto(this.bbdRecordId!).subscribe({
      next: (response) => {
        this.products = response.object.productIdNameCodeAndPriceResponseDtoList;
        this.bbdForm.patchValue(response.object.bbdRecordWithoutRemovalDateResponse);
      },

      error: (error) => {
        // console.log(error);
        this.snackBar.open("Ürünler getirilirken hata oluştu!", "Kapat", { duration: 3000 });
      }
    });
  }

  onUpdate() {

    const updateBbdRecordRequestDto: UpdateBbdRecordRequestDto = {
      bbdRecordId : this.bbdRecordId!,
      userId: user.getUserId(),
      productId: this.bbdForm.getRawValue().productId!.valueOf(),
      bestBeforeDate: this.bbdForm.getRawValue().bestBeforeDate!,
      quantity: this.bbdForm.getRawValue().quantity!,

      activityTypeId: parseInt(localStorage.getItem(userActivityType.UPDATE_BBD_RECORD)!)
    }

    this.bbdService.updateBbdRecord(updateBbdRecordRequestDto).subscribe({
      next : (response) => {
        const returnedBbdRecordId = response.object.valueOf();

        this.router.navigate(['/edit-bbd-record', returnedBbdRecordId], {
          replaceUrl: true,
          state: {bbdRecordId : returnedBbdRecordId} 
        });

        this.snackBar.open("Güncelleme işlemi tamamlandı", "Kapat", { duration: 3000 });
      },

      error : (error) => {
        console.log(error);
        this.snackBar.open("Güncelleme işlemi yapılamadı!", "Kapat", { duration: 3000 });
      }
    });
  }

}
