import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { IApiResponse } from '../model/apiresponse/apiresponse';
import { UrlBuilderService } from './url-builder.service';
import { UpdateUserProfile } from '../model/user/user';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private userSubject = new BehaviorSubject<any>(this.getUserFromLocalStorage());
  public user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient, private urlBuilder: UrlBuilderService) { }

  // Get user data from localStorage
  private getUserFromLocalStorage(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // Update the user profile and sync with localStorage
  updateUserProfileInfo(obj: UpdateUserProfile): Observable<IApiResponse> {
    const url = this.urlBuilder.buildUrl('users/profile-update');
    return this.http.put<IApiResponse>(url, obj).pipe(
      // After the user profile is updated successfully
      tap((res: IApiResponse) => {
        if (res.status === 'success') {
          // Update the localStorage with the new profile data
          const updatedUser = {
            ...this.getUserFromLocalStorage(),
            username: obj.name,  // Update the name in localStorage
            email: obj.email,     // Update the email in localStorage
            balance: obj.balance  // Update the balance in localStorage
          };

          // Save the updated user to localStorage
          localStorage.setItem('user', JSON.stringify(updatedUser));

          // Emit the updated user data
          this.userSubject.next(updatedUser);
        }
      })
    );
  }

  // Fetch user profile information
  getUserProfileInfo(): Observable<IApiResponse> {
    const url = this.urlBuilder.buildUrl('users/profile-info');
    return this.http.get<IApiResponse>(url);
  }

  setUser(user: any) {
    this.userSubject.next(user); // Update the current user data
  }
}
