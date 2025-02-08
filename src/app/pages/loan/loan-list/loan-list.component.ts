import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { GetLoan } from '../../../model/loan/loan';
import { LoanService } from '../../../services/loan.service';
import { IApiResponse } from '../../../model/apiresponse/apiresponse';
import { PaginationComponent } from "../../pagination/pagination.component";
import { CommonModule } from '@angular/common';
import { LoanModalComponent } from "../../modal/loan-modal/loan-modal.component";
import { GlobalAlertService } from '../../../services/global-alert.service';

@Component({
  selector: 'app-loan-list',
  imports: [CommonModule, PaginationComponent, RouterLink, LoanModalComponent],
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.css']
})
export class LoanListComponent implements OnInit {
  selectedLoanId: number | null = null

  loanList: GetLoan[] = [];

  meta: any = {};  // Store pagination metadata

  loanService = inject(LoanService);

  constructor(private router: Router) { }
  globalAlertService = inject(GlobalAlertService)

  ngOnInit(): void {
    this.loadLoans(1, 10);  // Default to page 1 and size 10 items per page
  }

  // Load loans with pagination
  loadLoans(page: number, size: number): void {
    this.loanService.getLoanList(page, size).subscribe((res: IApiResponse) => {
      if (res.status === 'success') {
        this.loanList = res.data;
        this.meta = res.meta;
        // Calculate total pages if not provided by API
        if (this.meta.total && this.meta.size) {
          this.meta.totalPages = Math.ceil(this.meta.total / this.meta.size);
        }
      }
    });
  }

  // Handle page change from pagination component
  onPageChange(page: number): void {
    // Don't call loadLoans if the page is out of bounds (e.g., before page 1 or after totalPages)
    if (page > 0 && page <= this.meta.totalPages) {
      this.loadLoans(page, this.meta.size);  // Fetch the loans for the selected page
    }
  }

  // Method to handle loan deletion
  onDelete(id: number): void {
    if (confirm('Are you sure you want to delete this loan record?')) {
      this.loanService.deleteLoan(id).subscribe((res: IApiResponse) => {
        if (res.status === 'success') {
          this.globalAlertService.showAlert(res.message, 'success');
          this.loanList = this.loanList.filter(loan => loan.id !== id);
        }
      }, error => {
        this.globalAlertService.showAlert(error.error.message, 'error');
      });
    }
  }

  // Handle loan repayment
  onRepay(loanId: number, amount: number): void {
    const confirmRepayment = confirm('Are you sure you want to repay this loan?');
    if (confirmRepayment) {
      this.loanService.repayLoan(loanId, amount).subscribe((res: IApiResponse) => {
        if (res.status === 'success') {
          this.globalAlertService.showAlert(res.message, 'success');
          this.loadLoans(this.meta.currentPage, this.meta.size);  // Refresh the loan list after repayment
        }
      }, error => {
        this.globalAlertService.showAlert(error.error.message, 'error');
      });
    }
  }


  onViewContract(loanId: number) {
    this.selectedLoanId = loanId;
  }

  closeModal() {
    this.selectedLoanId = null;
  }

  handleAddLoan() {
    this.router.navigate(['/loan/log']);
  }
}
