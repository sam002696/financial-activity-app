import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class GlobalAlertService {
    private messageSource = new BehaviorSubject<string>(''); // Default empty message
    private statusSource = new BehaviorSubject<'success' | 'error' | null>(null); // Default to null
    private visibleSource = new BehaviorSubject<boolean>(false); // Default to hidden

    // Observable for message
    message$ = this.messageSource.asObservable();
    // Observable for status (success or error)
    status$ = this.statusSource.asObservable();
    // Observable for visibility
    visible$ = this.visibleSource.asObservable();

    // Set the alert message, status and visibility
    showAlert(message: string, status: 'success' | 'error') {
        this.messageSource.next(message);
        this.statusSource.next(status);
        this.visibleSource.next(true);
    }

    // Hide the alert
    hideAlert() {
        this.visibleSource.next(false);
    }
}
