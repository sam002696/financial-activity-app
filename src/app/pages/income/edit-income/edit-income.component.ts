import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IncomeService } from '../../../services/income.service';
import { IApiResponseIncome, addIncome } from '../../../model/income/income';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-income',
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-income.component.html',
  styleUrls: ['./edit-income.component.css']
})
export class EditIncomeComponent implements OnInit {

  // This will hold the data for the form
  addIncome: addIncome = new addIncome();

  constructor(
    private incomeService: IncomeService,
    private route: ActivatedRoute, // to get the id from the route
    private router: Router // for navigating after successful update
  ) { }

  ngOnInit(): void {

    const incomeId = Number(this.route.snapshot.paramMap.get('id'));

    if (incomeId) {
      // Fetch the income details from the API
      this.incomeService.getSingleIncome(incomeId).subscribe((res: IApiResponseIncome) => {
        if (res.status === 'success') {
          this.addIncome = res.data; // Bind the data to the form fields
        }
      });
    }
  }

  //Method to handle form submission
  onSubmit(): void {

    console.log(this.addIncome);
    const id = this.addIncome.id || 0
    const incomeData = { ...this.addIncome };
    delete incomeData.id;

    this.incomeService.updateIncome(id, incomeData).subscribe((res: IApiResponseIncome) => {
      if (res.status === 'success') {
        alert(res.message);
        this.router.navigate(['/income/list']);
      } else {
        console.log('Error updating income');
      }
    });
  }
}
