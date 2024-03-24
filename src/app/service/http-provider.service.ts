import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from './web-api.service';

//var apiUrl = "https://localhost:44370/";

var apiUrl = "http://localhost:8080";

var httpLink = {
  getAllSupplier: apiUrl + "/supplier",
  deleteSupplierById: apiUrl + "/supplier/",
  getSupplierDetailById: apiUrl + "/supplier/",
  saveSupplier: apiUrl + "/supplier",
  updateSupplier: apiUrl + "/supplier/"
}

@Injectable({
  providedIn: 'root'
})
export class HttpProviderService {

  constructor(private webApiService: WebApiService) { }

  public getAllSupplier(): Observable<any> {
    return this.webApiService.get(httpLink.getAllSupplier);
  }

  public getSupplierDetailById(model: any): Observable<any> {
    return this.webApiService.get(httpLink.getSupplierDetailById + model);
  }

  public saveSupplier(model: any): Observable<any> {
    return this.webApiService.post(httpLink.saveSupplier, model);
  }

  public updateSupplier(model: any): Observable<any> {
    return this.webApiService.put(httpLink.updateSupplier + model.id, model);
  }

  public deleteSupplierById(supplierId: number): Observable<any> {
    return this.webApiService.delete(httpLink.deleteSupplierById + supplierId);
  }
  
}
