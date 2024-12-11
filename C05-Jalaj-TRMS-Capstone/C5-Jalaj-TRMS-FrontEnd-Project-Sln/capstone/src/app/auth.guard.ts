import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
 
export const authGuard: CanActivateFn = (route, state) => {
const router = inject(Router);
const loggeduser = localStorage.getItem('loginuser');
if(loggeduser != null){
  return true;
}
else{
  router.navigateByUrl('login');
  return false;
}
 
};