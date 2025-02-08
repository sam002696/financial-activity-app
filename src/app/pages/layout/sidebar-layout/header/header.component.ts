import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../../model/user/user';
import { UserProfileService } from '../../../../services/user-profile.service';
import { RouterLink } from '@angular/router';
import { Notification } from '../../../../model/user/notfication';
import { UserNotificationService } from '../../../../services/user-notification.service';
import { UserAuthService } from '../../../../services/user-auth.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  notifications: Notification[] = [];
  dropdownOpen = false;

  constructor(private userProfileService: UserProfileService,
    private notificationService: UserNotificationService,
    private authService: UserAuthService
  ) { }

  user: User | null = null;
  isUserMenuOpen: boolean = false;

  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  // Variable to hold the user data

  ngOnInit(): void {

    const user = localStorage.getItem('user');
    const userId = user ? JSON.parse(user).id : null;

    // Subscribe to user data changes
    this.userProfileService.user$.subscribe(user => {
      this.user = user; // Automatically get updated user data
    });

    if (userId) {
      // Register user to receive notifications
      this.notificationService.registerUser(userId);
      // Fetch initial notifications
      this.notificationService.fetchNotifications();
    }

    // Subscribe to the notifications
    this.notificationService.notifications$.subscribe((notifications) => {
      this.notifications = notifications;
      console.log(this.notifications)
    });


  }


  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  markAsRead(notificationId: number): void {
    // Implement logic for marking the notification as read, if necessary
    console.log(`Marking notification with ID: ${notificationId} as read`);
  }

  onSignOut() {
    this.authService.signOut()
  }

}
