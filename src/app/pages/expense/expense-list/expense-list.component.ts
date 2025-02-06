import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { GetExpense } from '../../../model/expense/expense';
import { ExpenseService } from '../../../services/expense.service';
import { IApiResponse } from '../../../model/apiresponse/apiresponse';
import { PaginationComponent } from "../../pagination/pagination.component";
import { ExpenseModalComponent } from "../../modal/expense-modal/expense-modal.component";

@Component({
  selector: 'app-expense-list',
  imports: [CommonModule, RouterLink, PaginationComponent, ExpenseModalComponent],
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.css'
})
export class ExpenseListComponent implements OnInit {

  selectedExpenseId: number | null = null;

  constructor(private router: Router) { }

  expenseList: GetExpense[] = []

  meta: any = {};  // Storing pagination metadata

  expenseService = inject(ExpenseService);

  ngOnInit(): void {
    this.loadExpenses(1, 10);  // Default to page 1 and size 10 items per page
  }

  // Load loans with pagination
  loadExpenses(page: number, size: number): void {
    this.expenseService.getExpenseList(page, size).subscribe((res: IApiResponse) => {
      if (res.status === 'success') {
        this.expenseList = res.data;
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

    if (page > 0 && page <= this.meta.totalPages) {
      this.loadExpenses(page, this.meta.size);
    }
  }

  // Method to handle expense deletion
  onDelete(id: number): void {
    if (confirm('Are you sure you want to delete this expense record?')) {
      this.expenseService.deleteExpense(id).subscribe((res: IApiResponse) => {
        if (res.status === 'success') {
          alert(res.message);
          this.expenseList = this.expenseList.filter(expense => expense.id !== id);
        } else {
          alert('Error deleting expense');
        }
      });
    }
  }

  onViewContract(expenseId: number) {
    this.selectedExpenseId = expenseId;
  }

  closeModal() {
    this.selectedExpenseId = null;
  }


  handleAddExpense() {
    this.router.navigate(['/expense/log']);
  }
}
