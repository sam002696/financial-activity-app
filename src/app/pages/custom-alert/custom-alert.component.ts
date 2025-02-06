import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalAlertService } from '../../services/global-alert.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-alert',
  imports: [CommonModule],
  templateUrl: './custom-alert.component.html',
  styleUrls: ['./custom-alert.component.css']
})
export class CustomAlertComponent implements OnInit, OnDestroy {
  message: string = ''; // Alert message
  status: 'success' | 'error' | null = null; // Alert status
  visible: boolean = false; // Control visibility
  private alertTimeout: any; // To store timeout reference for clearing it on component destruction

  constructor(private globalAlertService: GlobalAlertService) { }

  ngOnInit(): void {
    // Subscribe to the alert state from the service
    this.globalAlertService.message$.subscribe(message => this.message = message);
    this.globalAlertService.status$.subscribe(status => this.status = status);
    this.globalAlertService.visible$.subscribe(visible => {
      this.visible = visible;
      // Automatically hide the alert after 5 seconds when it becomes visible
      if (visible) {
        this.startAlertTimeout();
      }
    });
  }

  ngOnDestroy(): void {
    // Clear timeout when component is destroyed to avoid any memory leaks
    if (this.alertTimeout) {
      clearTimeout(this.alertTimeout);
    }
  }

  // Start the timeout to hide the alert after 5 seconds
  private startAlertTimeout() {
    this.alertTimeout = setTimeout(() => {
      this.closeAlert(); // Close the alert automatically after 5 seconds
    }, 5000);
  }

  // Close the alert
  closeAlert() {
    this.globalAlertService.hideAlert(); // Hide the alert when closed
    if (this.alertTimeout) {
      clearTimeout(this.alertTimeout); // Clear timeout if the alert is manually closed
    }
  }
}
