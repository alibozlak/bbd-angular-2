import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { HomeComponent } from './components/home-component/home-component';
import { authGuard } from './guards/auth.guard';
import { AddOrUpdateProductComponent } from './components/add-or-update-product-component/add-or-update-product-component/add-or-update-product-component';
import { AddOrUpdateBbdRecordComponent } from './components/add-or-update-bbdrecord-component/add-or-update-bbd-record-component/add-or-update-bbd-record-component';
import { EditBbdRecordComponent } from './components/edit-bbd-record-component/edit-bbd-record-component';
import { UpdateBbdRecordComponent } from './components/update-bbd-record-component/update-bbd-record-component';
import { AddUserComponent } from './components/add-user-component/add-user-component';
import { BbdPastComponent } from './components/bbd-past-component/bbd-past-component';
import { loginGuard } from './guards/login.guard';
import { ChangeUserPasswordComponent } from './components/change-user-password-component/change-user-password-component';
import { AddUserComponentForBbdTracker } from './components/add-user-component-for-bbd-tracker/add-user-component-for-bbd-tracker';
import { RemoveUserFromStoreByBbdTrackerComponent } from './components/remove-user-from-store-by-bbd-tracker-component/remove-user-from-store-by-bbd-tracker-component';
import { AddStoreComponent } from './components/add-store-component/add-store-component';

export const routes: Routes = [
    {path : 'login', component : Login, canActivate : [loginGuard]},
    {path : "home", component : HomeComponent, canActivate : [authGuard]},
    {path : '', redirectTo : 'home', pathMatch : 'full'},
    {path : 'add-or-update-product', component : AddOrUpdateProductComponent, canActivate : [authGuard]},
    {path : 'add-or-update-bbd-record', component : AddOrUpdateBbdRecordComponent, canActivate : [authGuard]},
    {path : 'update-bbd-record/:bbdRecordId', component : UpdateBbdRecordComponent, canActivate : [authGuard]},
    {path : 'edit-bbd-record/:bbdRecordId', component : EditBbdRecordComponent, canActivate : [authGuard]},
    {path : 'add-user', component : AddUserComponent, canActivate : [authGuard]},
    {path : 'bbd-past/:bbdRecordId', component : BbdPastComponent, canActivate : [authGuard]},
    {path : 'change-password', component : ChangeUserPasswordComponent, canActivate : [authGuard]},
    {path : 'add-user-for-bbd-tracker', component : AddUserComponentForBbdTracker, canActivate : [authGuard]},
    {path : 'remove-user-from-store-by-bbd-tracker', component : RemoveUserFromStoreByBbdTrackerComponent, canActivate : [authGuard]},
    {path : 'add-store', component : AddStoreComponent, canActivate : [authGuard]},
];
