import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private _HttpClient:HttpClient) { }


  getAllUsersTransactions(): Observable<any>{
    return this._HttpClient.get('http://localhost:3000/api/v1/transaction')
  }

  getSpacificUserTransactions(id: any): Observable<any>{
        return this._HttpClient.get(`http://localhost:3000/api/v1/transaction/userTransaction/${id}`)

  }

}
