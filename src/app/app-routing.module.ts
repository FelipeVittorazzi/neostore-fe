import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSupplierComponent } from './add-supplier/add-supplier.component';
import { EditSupplierComponent } from './edit-supplier/edit-supplier.component';
import { HomeComponent } from './home/home.component';
import { ViewSupplierComponent } from './view-supplier/view-supplier.component';

const routes: Routes = [
  { path: '', redirectTo: 'Home', pathMatch: 'full'},
  { path: 'Home', component: HomeComponent },
  { path: 'ViewSupplier/:supplierId', component: ViewSupplierComponent },
  { path: 'AddSupplier', component: AddSupplierComponent },
  { path: 'EditSupplier/:supplierId', component: EditSupplierComponent } 
];
  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }