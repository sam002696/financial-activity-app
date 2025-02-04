import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { addIncome, IApiResponseIncome } from '../../../model/income/income';
import { IncomeService } from '../../../services/income.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-income',
  imports: [FormsModule],
  templateUrl: './add-income.component.html',
  styleUrl: './add-income.component.css'
})
export class AddIncomeComponent {

  constructor(
    private router: Router
  ) { }

  // Model for the form
  addIncome: addIncome = new addIncome();

  incomeService = inject(IncomeService);

  // Form submission handler
  onSubmit() {
    console.log('Form Submitted', this.addIncome);
    const incomeData = { ...this.addIncome };
    delete incomeData.id;

    this.incomeService.createNewIncome(incomeData).subscribe((res: IApiResponseIncome) => {
      console.log('Response', res);
      if (res.status === 'success') {
        alert(res.message);
        this.router.navigate(['/income/list']);
      }

    });

  }
}
