import { GetIncome } from './../../../model/income/income';
import { Component, inject, OnInit } from '@angular/core';
import { IncomeService } from '../../../services/income.service';
import { IApiResponseIncome } from '../../../model/income/income';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-income-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './income-list.component.html',
  styleUrl: './income-list.component.css'
})
export class IncomeListComponent implements OnInit {

  constructor(private router: Router) { }

  incomeList: GetIncome[] = []

  incomeService = inject(IncomeService);

  ngOnInit(): void {
    this.incomeService.getIncomeList().subscribe((res: IApiResponseIncome) => {
      console.log(res);
      if (res.status === 'success') {
        this.incomeList = res.data;
      }
    });
  }

  // Method to handle income deletion
  onDelete(id: number): void {
    if (confirm('Are you sure you want to delete this income record?')) {
      this.incomeService.deleteIncome(id).subscribe((res: IApiResponseIncome) => {
        if (res.status === 'success') {
          alert(res.message);
          this.incomeList = this.incomeList.filter(income => income.id !== id);
        } else {
          alert('Error deleting income');
        }
      });
    }
  }




  handleIncome() {
    this.router.navigate(['/income/log']);
  }



}
