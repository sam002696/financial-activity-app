import { GetIncome } from './../../../model/income/income';
import { Component, inject, OnInit } from '@angular/core';
import { IncomeService } from '../../../services/income.service';
import { IApiResponseIncome } from '../../../model/income/income';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { PaginationComponent } from "../../pagination/pagination.component";
import { IncomeModalComponent } from "../../modal/income-modal/income-modal.component";

@Component({
  selector: 'app-income-list',
  imports: [CommonModule, RouterLink, PaginationComponent, IncomeModalComponent],
  templateUrl: './income-list.component.html',
  styleUrl: './income-list.component.css'
})
export class IncomeListComponent implements OnInit {

  selectedIncomeId: number | null = null;

  meta: any = {};

  constructor(private router: Router) { }

  incomeList: GetIncome[] = []

  incomeService = inject(IncomeService);

  ngOnInit(): void {
    this.loadIncomes(1, 10);  // Default to page 1 and size 10 items per page
  }

  // Load loans with pagination
  loadIncomes(page: number, size: number): void {
    this.incomeService.getIncomeList(page, size).subscribe((res: IApiResponseIncome) => {
      if (res.status === 'success') {
        this.incomeList = res.data;
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
      this.loadIncomes(page, this.meta.size);  // Fetch the loans for the selected page
    }
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


  onViewContract(incomeId: number) {
    this.selectedIncomeId = incomeId;
  }




  handleIncome() {
    this.router.navigate(['/income/log']);
  }

  // Close the modal
  closeModal() {
    this.selectedIncomeId = null;
  }

}
