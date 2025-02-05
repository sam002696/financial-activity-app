import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { GetExpense } from '../../../model/expense/expense';
import { ExpenseService } from '../../../services/expense.service';
import { IApiResponse } from '../../../model/apiresponse/apiresponse';

@Component({
  selector: 'app-expense-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.css'
})
export class ExpenseListComponent implements OnInit {
  constructor(private router: Router) { }

  expenseList: GetExpense[] = []

  expenseService = inject(ExpenseService);

  ngOnInit(): void {
    this.expenseService.getExpenseList().subscribe((res: IApiResponse) => {
      console.log(res);
      if (res.status === 'success') {
        this.expenseList = res.data;
      }
    });
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




  handleAddExpense() {
    this.router.navigate(['/expense/log']);
  }
}
