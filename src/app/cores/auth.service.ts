
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private baseUrl = `${environment.API_URL}/auth`;
  
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient, private router: Router) {
    const decodedUser = this.getUserFromToken();
    this.currentUserSubject = new BehaviorSubject<any>(decodedUser);
    this.currentUser = this.currentUserSubject.asObservable();
   }

 
  getToken(): string | null {
    return localStorage.getItem('token');
  }

    /** ✅ Decode JWT Token */
  private getUserFromToken(): any {
    const token = this.getToken();
    if (!token) return null;
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Invalid token', error);
      return null;
    }
  }
   public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  /** ✅ Login & Store Token */
  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, credentials).pipe(
      map(response => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          const decodedUser = this.getUserFromToken();
          this.currentUserSubject.next(decodedUser);
        }
        return response;
      })
    );
  }
  
   /** ✅ Check If User is Logged In */
   isAuthenticated(): boolean {
    return !!this.getToken();
  }

  /** ✅ Get User Role */
  getUserRole(): string | null {
    return this.currentUserValue?.role || null;
  }
  
  register(userData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, userData);
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
    this.router.navigate(['/']);
  }

  getUserDetails() {
    return this.getUserFromToken();
  }

   // ✅ Add Driver (Admin Only)
   addDriver(formData: FormData): Observable<any> {
    const token = this.getToken();
    if (!token) {
      console.error('No token found');
      return new Observable();
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.post(`${this.baseUrl}/register-driver`, formData, { headers });
  }
  
}
