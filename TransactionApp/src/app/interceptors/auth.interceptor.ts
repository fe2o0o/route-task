import { HttpInterceptorFn } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID)
  let token:any;
  if (isPlatformBrowser(platformId)) {

    token = localStorage.getItem('token')
  }
  const currentReq = req.clone({
    headers:req.headers.set('token', `${token}`)
  })
  return next(currentReq)

};
