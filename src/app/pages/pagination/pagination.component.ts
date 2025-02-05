import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-pagination',
    imports: [CommonModule],
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
    @Input() meta: any;  // pagination metadata
    @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();

    // Handle page change event
    onPageChange(page: number): void {
        if (page > 0 && page <= this.meta.totalPages) {
            this.pageChanged.emit(page);  // Emit the selected page
        }
    }

    // Generate page numbers
    getPageRange(): number[] {
        const range = [];
        for (let i = 1; i <= this.meta.totalPages; i++) {
            range.push(i);
        }
        return range;
    }

    // Determine if Previous and Next buttons should be disabled
    isPreviousDisabled(): boolean {
        return this.meta.currentPage === 1;
    }

    isNextDisabled(): boolean {
        return this.meta.currentPage === this.meta.totalPages;
    }
}
