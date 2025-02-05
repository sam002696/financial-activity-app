import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { addExpense } from '../../../model/expense/expense';
import { ExpenseService } from '../../../services/expense.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IApiResponse } from '../../../model/apiresponse/apiresponse';

@Component({
  selector: 'app-edit-expense',
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-expense.component.html',
  styleUrl: './edit-expense.component.css'
})
export class EditExpenseComponent implements OnInit {
  // This will hold the data for the form
  addExpense: addExpense = new addExpense();

  constructor(
    private expenseService: ExpenseService,
    private route: ActivatedRoute, // to get the id from the route
    private router: Router // for navigating after successful update
  ) { }

  ngOnInit(): void {

    const expenseId = Number(this.route.snapshot.paramMap.get('id'));

    if (expenseId) {

      this.expenseService.getSingleExpense(expenseId).subscribe((res: IApiResponse) => {
        if (res.status === 'success') {
          this.addExpense = res.data;
        }
      });
    }
  }

  //Method to handle form submission
  onSubmit(): void {

    console.log(this.addExpense);
    const id = this.addExpense.id || 0
    const expenseData = { ...this.addExpense };
    delete expenseData.id;
    delete expenseData.userId;

    this.expenseService.updateExpense(id, expenseData).subscribe((res: IApiResponse) => {
      if (res.status === 'success') {
        alert(res.message);
        this.router.navigate(['/expense/list']);
      } else {
        console.log('Error updating expense');
      }
    });
  }
}
