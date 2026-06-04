import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BbdRecordService } from '../../../services/bbd-record/bbd-record-service';
import { ProductService } from '../../../services/product/product-service';
import { ProductIdNameCodeAndPriceResponseDto } from '../../../models/product/product-id-name-code-price.model';
import { AddBbdRecordRequestDto } from '../../../models/bbd-record/add-bbd-record-request.model';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { user, userActivityType } from '../../../utils/project-constant';

@Component({
  selector: 'app-add-or-update-bbd-record-component',
  imports: [
    ReactiveFormsModule, 
    CommonModule,
    MatSnackBarModule
  ],
  templateUrl: './add-or-update-bbd-record-component.html',
  styleUrl: './add-or-update-bbd-record-component.css',
})
export class AddOrUpdateBbdRecordComponent {

  private formBuilder = inject(FormBuilder);
  private bbdService = inject(BbdRecordService);
  private productService = inject(ProductService);
  private snackBar = inject(MatSnackBar);

  public products : ProductIdNameCodeAndPriceResponseDto[] | undefined;
  public today : string | undefined;

  public constructor() {
    this.productService.getAllProductIdNameCodeAndPriceDtos().subscribe(response => {
      this.products = response.object;
    });

    const date : Date = new Date();
    let _today = `${date.getFullYear()}-`;
    const month = date.getMonth() + 1;
    if (month < 10) {
      _today += `0${month}-`;
    } else {
      _today += `${month}-`;
    }

    if (date.getDate() < 10) {
      _today += `0${date.getDate()}`;
    } else {
      _today += `${date.getDate()}`;
    }
    this.today = _today;
  }

  public bbdForm = this.formBuilder.group({
    productId : [null, Validators.required],
    bestBeforeDate : [null, Validators.required],
    quantity : [null, [Validators.required, Validators.min(1)]]
  });

  public onSubmit() {
    const addBbdRecordRequestDto : AddBbdRecordRequestDto = {
      userId : user.getUserId(),
      productId : parseInt(this.bbdForm.getRawValue().productId!),
      bestBeforeDate : this.bbdForm.getRawValue().bestBeforeDate!,
      quantity : parseInt(this.bbdForm.getRawValue().quantity!),

      activityTypeId : parseInt(localStorage.getItem(userActivityType.CREATE_BBD_RECORD)!)
    };    

    this.bbdService.addBbdRecord(addBbdRecordRequestDto).subscribe({
      next: (response) => {
        this.bbdForm.reset();
        this.snackBar.open("Kayıt eklendi","Kapat", {duration : 2000});
      },
      error: (error) => {
        this.snackBar.open("Kayıt EKLENEMEDİ!! Ali ile irtibata geçin : +90 507 021 8322", "Kapat", {duration : 6000});
      }
    });
  }

}
