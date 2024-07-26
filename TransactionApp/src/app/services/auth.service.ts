import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from "jwt-decode";
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private _Router:Router , private _HttpClient: HttpClient) {
      const IsPLATFORM_ID = inject(PLATFORM_ID)

    if (isPlatformBrowser(IsPLATFORM_ID) && localStorage.getItem('token') != null) {
      this.loginUser()
    }
   }

  userData:BehaviorSubject<any> = new BehaviorSubject<any>(null)


  loginUser() {
    const decoded = jwtDecode(JSON.stringify(localStorage.getItem('token')))
    this.userData.next(decoded)
    this.userData.getValue().role == "admin" ? this._Router.navigate(['/admin']) : this._Router.navigate(['/user'])
  }

  register(data:any): Observable<any>{
    return this._HttpClient.post('http://localhost:3000/api/v1/user/register' , data)
  }

  login(data: any): Observable<any>{
    return this._HttpClient.post('http://localhost:3000/api/v1/user/login', data)
  }

  logOut() {
    localStorage.clear()
    this._Router.navigate(['/login'])
    this.userData.next(null)
  }

}
