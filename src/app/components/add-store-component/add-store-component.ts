import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { StoreService } from '../../services/store/store-service';
import { CreateStoreRequestDto } from '../../models/store/create-store-request-dto.model';
import { user } from '../../utils/project-constant';

@Component({
  selector: 'app-add-store-component',
  imports: [ReactiveFormsModule],
  templateUrl: './add-store-component.html',
  styleUrl: './add-store-component.css',
})
export class AddStoreComponent {

  private formBuilder : FormBuilder = inject(FormBuilder);
  private storeService : StoreService = inject(StoreService);

  public createStoreForm = this.formBuilder.group({
    storeName : [null, Validators.required],
    storeCode : [null, Validators.required],
  });

  public createStore(){
    const createStoreRequestDto : CreateStoreRequestDto = {
      storeName : this.createStoreForm.getRawValue().storeName!,
      storeCode : this.createStoreForm.getRawValue().storeCode!,

      //FixMe: adminId
      adminId : 1,
      userId : user.getUserId()
    };

    this.storeService.createStore(createStoreRequestDto).subscribe({
      next : (response) => {
        this.createStoreForm.reset();
        alert("Mağaza kaydedildi..");
      },

      error : (error) => {
        alert("Mağaza kaydı başarısız : \n\n" + error.error.message);
      }
    });
  }

}
