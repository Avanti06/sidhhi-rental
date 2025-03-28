import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router =  inject(Router);
  const token = localStorage.getItem('token');

  const userRole = localStorage.getItem('role');

  if (!token) {
    alert('Login please ')
    router.navigate(['/']);
    return false;
  }
  
   // Check the expected role from route data
   const expectedRole = route.data?.['role'];

   if (expectedRole && !expectedRole.include(userRole || '')) {
    alert('your do not have permission to access this page.')
     router.navigate(['/unauthorized']); // Redirect to unauthorized page
     return false;
   }
 
   return true;
};


