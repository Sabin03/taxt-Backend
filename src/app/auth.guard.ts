/*import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, retry } from 'rxjs';


export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
  const router: Router = inject(Router);


  if (true) {
    return true;
  }else{
    router?.navigate(['/login'], {queryParams: {returnUrl: state.url}} );
    return false;
  }
  return true;
};*/

import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, retry } from 'rxjs';
import { Common } from './common';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
  const router: Router = inject(Router);
  var authToke = Common.accessToken;

  if (authToke != null && authToke != "") {
    return true;
  }else{
    router?.navigate(['/login'], {queryParams: {returnUrl: state.url}} );
    return false;
  }
};

/*import { PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, retry } from 'rxjs';
import { Common } from './common';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
  const router: Router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  let authToke: string | null = null;

  if (isPlatformBrowser(platformId)) {
    // Client-side, use Common class to access accessToken
    authToke = Common.accessToken;
  } else {
    // Server-side, use a different approach to access the access token
    // For example, you can use a server-side storage mechanism or a token stored in a cookie
    authToke = null; // or retrieve the token from a server-side storage mechanism
  }

  if (authToke != null && authToke != "") {
    return true;
  } else {
    router?.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
};*/




/*import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, retry } from 'rxjs';
import { Common } from './common';


export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
  const router: Router = inject(Router);
  var authToke = Common.accessToken;


  if (authToke != null && authToke != "") {
    return true;
  }else{
    router?.navigate(['/login'], {queryParams: {returnUrl: state.url}} );
    return false;
  }
};*/
