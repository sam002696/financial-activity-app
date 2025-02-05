import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoanService } from '../../../services/loan.service';
import { addLoan } from '../../../model/loan/loan';
import { IApiResponse } from '../../../model/apiresponse/apiresponse';

@Component({
  selector: 'app-add-loan',
  imports: [FormsModule],
  templateUrl: './add-loan.component.html',
  styleUrl: './add-loan.component.css'
})
export class AddLoanComponent {
  constructor(
    private router: Router
  ) { }

  loanService = inject(LoanService);

  // Model for the form
  addLoan: addLoan = new addLoan();

  onSubmit() {
    console.log('Form Submitted', this.addLoan);
    const loanData = { ...this.addLoan };
    delete loanData.id;

    this.loanService.createNewLoan(loanData).subscribe((res: IApiResponse) => {
      console.log('Response', res);
      if (res.status === 'success') {
        alert(res.message);
        this.router.navigate(['/loan/list']);
      }

    });

  }
}
