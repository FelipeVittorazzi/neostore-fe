import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpProviderService } from '../service/http-provider.service';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.scss']
})
export class AddSupplierComponent implements OnInit {
  addSupplierForm: supplierForm = new supplierForm();

  @ViewChild("supplierForm")
  supplierForm!: NgForm;

  isSubmitted: boolean = false;

  constructor(private router: Router, private httpProvider: HttpProviderService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  AddSupplier(isValid: any) {
    this.isSubmitted = true;
    if (isValid) {
      this.httpProvider.saveSupplier(this.addSupplierForm).subscribe(async data => {
        if (data.status === 201) {
          this.toastr.success('Criado com sucesso!');
          setTimeout(() => {
            this.router.navigate(['/Home']);
          }, 500);
        }
      },
        async error => {
          this.toastr.error(error.error);
          setTimeout(() => {
            this.router.navigate(['/Home']);
          }, 500);
        });
    }
  }

}

export class supplierForm {
  name: string = "";
  cnpj: string = "";
  email: string = "";
  description: string = "";
}