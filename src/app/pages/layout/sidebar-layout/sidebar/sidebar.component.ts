import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(private router: Router) { }

  isSubMenuOpen: boolean = true;
  isSubMenuExpenseOpen: boolean = true;
  isSubMenuLoanOpen: boolean = true;

  toggleMenu(): void {
    this.isSubMenuOpen = !this.isSubMenuOpen;
  }

  toggleExpenseMenu(): void {
    this.isSubMenuExpenseOpen = !this.isSubMenuExpenseOpen;
  }

  toggleLoanMenu(): void {
    this.isSubMenuLoanOpen = !this.isSubMenuLoanOpen;
  }

  onSignOut() {
    localStorage.removeItem('user');
    this.router.navigate(['/login'])
  }


}
