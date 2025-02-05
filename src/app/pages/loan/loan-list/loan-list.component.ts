import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { GetLoan } from '../../../model/loan/loan';
import { LoanService } from '../../../services/loan.service';
import { IApiResponse } from '../../../model/apiresponse/apiresponse';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loan-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './loan-list.component.html',
  styleUrl: './loan-list.component.css'
})
export class LoanListComponent implements OnInit {
  constructor(private router: Router) { }

  loanList: GetLoan[] = []

  loanService = inject(LoanService);

  ngOnInit(): void {
    this.loanService.getLoanList().subscribe((res: IApiResponse) => {
      console.log(res);
      if (res.status === 'success') {
        this.loanList = res.data;
      }
    });
  }

  // Method to handle expense deletion
  onDelete(id: number): void {
    if (confirm('Are you sure you want to delete this loan record?')) {
      this.loanService.deleteLoan(id).subscribe((res: IApiResponse) => {
        if (res.status === 'success') {
          alert(res.message);
          this.loanList = this.loanList.filter(loan => loan.id !== id);
        } else {
          alert('Error deleting loan');
        }
      });
    }
  }

  // Handle Repay Loan
  onRepay(loanId: number, amount: number): void {
    // Confirm repayment action
    const confirmRepayment = confirm('Are you sure you want to repay this loan?');
    if (confirmRepayment) {
      this.loanService.repayLoan(loanId, amount).subscribe((res: IApiResponse) => {
        if (res.status === 'success') {
          alert(res.message);
          // Optionally refresh the loan list or update the loan status
          this.ngOnInit();  // Fetch the updated loan list after repayment
        } else {
          alert(res.message);
        }
      });
    }
  }




  handleAddLoan() {
    this.router.navigate(['/loan/log']);
  }
}
