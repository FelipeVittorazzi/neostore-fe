import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpProviderService } from '../service/http-provider.service';
import { WebApiService } from '../service/web-api.service';

@Component({
  selector: 'app-view-supplier',
  templateUrl: './view-supplier.component.html',
  styleUrls: ['./view-supplier.component.scss'],
})

export class ViewSupplierComponent implements OnInit {

  supplierId: any;
  supplierDetail : any= [];
   
  constructor(public webApiService: WebApiService, private route: ActivatedRoute, private httpProvider : HttpProviderService) { }
  
  ngOnInit(): void {
    this.supplierId = this.route.snapshot.params['supplierId'];      
    this.getSupplierDetailById();
  }

  getSupplierDetailById() {       
    this.httpProvider.getSupplierDetailById(this.supplierId).subscribe((data : any) => {      
      if (data != null && data.body != null) {
        var resultData = data.body;
        if (resultData) {
          this.supplierDetail = resultData;
        }
      }
    },
    (error :any)=> { }); 
  }

  formatCnpj(cnpj: string): string {
    if(!cnpj) {
      return '';
    }
      return cnpj.replace(
        /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
        '$1.$2.$3/$4-$5'
      );
  }
}
