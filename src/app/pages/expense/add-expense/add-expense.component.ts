import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { addExpense } from '../../../model/expense/expense';
import { ExpenseService } from '../../../services/expense.service';
import { IApiResponse } from '../../../model/apiresponse/apiresponse';

@Component({
  selector: 'app-add-expense',
  imports: [FormsModule],
  templateUrl: './add-expense.component.html',
  styleUrl: './add-expense.component.css'
})
export class AddExpenseComponent {
  constructor(
    private router: Router
  ) { }

  expenseService = inject(ExpenseService);

  // Model for the form
  addExpense: addExpense = new addExpense();

  onSubmit() {
    console.log('Form Submitted', this.addExpense);
    const expenseData = { ...this.addExpense };
    delete expenseData.id;

    this.expenseService.createNewExpense(expenseData).subscribe((res: IApiResponse) => {
      console.log('Response', res);
      if (res.status === 'success') {
        alert(res.message);
        this.router.navigate(['/expense/list']);
      }

    });

  }
}
