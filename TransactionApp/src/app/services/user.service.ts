import { inject, Injectable,  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _HttpClient: HttpClient) {
  }

  isDataChanged:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  getUserTransactions(): Observable<any>{
    return this._HttpClient.get('http://localhost:3000/api/v1/transaction/userTransaction')
  }

  addTransaction(data: any) :Observable<any> {
    return  this._HttpClient.post('http://localhost:3000/api/v1/transaction' , data)
  }

  updateTransaction(data: any): Observable<any>{
    return this._HttpClient.put("http://localhost:3000/api/v1/transaction" , data)
  }

  deleteTransaction(data:any):Observable<any> {
    return this._HttpClient.delete('http://localhost:3000/api/v1/transaction', {
      body : data
    })
  }

  getTransactionById(id:any) : Observable<any> {
    return this._HttpClient.get(`http://localhost:3000/api/v1/transaction/${id}`)
  }

}
