import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { addIncome, IApiResponseIncome } from '../model/income/income';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  constructor(private http: HttpClient) { }

  createNewIncome(obj: addIncome): Observable<IApiResponseIncome> {
    return this.http.post<IApiResponseIncome>('http://localhost:9500/api/v1/financial-activities/income/create', obj);
  }

  getIncomeList(): Observable<IApiResponseIncome> {
    return this.http.get<IApiResponseIncome>('http://localhost:9500/api/v1/financial-activities/income/list');
  }

  getSingleIncome(id: number): Observable<IApiResponseIncome> {
    return this.http.get<IApiResponseIncome>(`http://localhost:9500/api/v1/financial-activities/income/${id}`);
  }

  updateIncome(id: number, obj: addIncome): Observable<IApiResponseIncome> {
    return this.http.put<IApiResponseIncome>(`http://localhost:9500/api/v1/financial-activities/income/update/${id}`, obj);
  }

  deleteIncome(id: number): Observable<IApiResponseIncome> {
    return this.http.delete<IApiResponseIncome>(`http://localhost:9500/api/v1/financial-activities/income/delete/${id}`);
  }
}
