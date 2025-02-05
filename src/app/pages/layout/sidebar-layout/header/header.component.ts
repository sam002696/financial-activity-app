import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../../model/user/user';
import { UserProfileService } from '../../../../services/user-profile.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  constructor(private userProfileService: UserProfileService) { }

  user: User | null = null;
  isUserMenuOpen: boolean = false;

  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  // Variable to hold the user data

  ngOnInit(): void {
    // Subscribe to user data changes
    this.userProfileService.user$.subscribe(user => {
      this.user = user; // Automatically get updated user data
    });
  }

}
