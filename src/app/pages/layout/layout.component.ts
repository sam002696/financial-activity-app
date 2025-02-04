import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  // Variable to track the state of the menu
  isSubMenuOpen = false;

  // Method to toggle the state of the menu
  toggleMenu() {
    this.isSubMenuOpen = !this.isSubMenuOpen;
  }
}
