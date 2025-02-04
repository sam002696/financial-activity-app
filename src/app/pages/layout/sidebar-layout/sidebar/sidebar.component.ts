import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  // For toggling nested submenu(s) inside the sidebar (if needed)
  isSubMenuOpen: boolean = false;

  toggleMenu(): void {
    this.isSubMenuOpen = !this.isSubMenuOpen;
  }
}
