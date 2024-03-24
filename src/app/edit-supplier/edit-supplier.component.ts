import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from '../service/http-provider.service';

@Component({
  selector: 'app-edit-supplier',
  templateUrl: './edit-supplier.component.html',
  styleUrls: ['./edit-supplier.component.scss']
})
export class EditSupplierComponent implements OnInit {
  editSupplierForm: supplierForm = new supplierForm();

  @ViewChild("supplierForm")
  supplierForm!: NgForm;

  isSubmitted: boolean = false;
  supplierId: any;

  constructor(private toastr: ToastrService, private route: ActivatedRoute, private router: Router,
    private httpProvider: HttpProviderService) { }

  ngOnInit(): void {
    this.getSupplierDetailById(this.route.snapshot.params['supplierId']);
  }
  
  getSupplierDetailById(supplierId: number) {
    this.httpProvider.getSupplierDetailById(supplierId).subscribe((data: any) => {
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          this.editSupplierForm.id = resultData.id;
          this.editSupplierForm.name = resultData.name;
          this.editSupplierForm.cnpj = resultData.cnpj;
          this.editSupplierForm.email = resultData.email;
          this.editSupplierForm.description = resultData.description;
        }
      }
    },
      (error: any) => { });
  }

  EditSupplier(isValid: any) {
    this.isSubmitted = true;
    if (isValid) {
      this.httpProvider.updateSupplier(this.editSupplierForm).subscribe(async data => {
        if (data.status === 200) {
          this.toastr.success('Atualizado com sucesso!');
          setTimeout(() => {
            this.router.navigate(['/Home']);
          }, 500);
        }
      },
        async error => {
          this.toastr.error(error.message);
          setTimeout(() => {
            this.router.navigate(['/Home']);
          }, 500);
        });
    }
  }
}

export class supplierForm {
  id: number = 0;
  name: string = "";
  cnpj: string = "";
  email: string = "";
  description: string = "";
}
