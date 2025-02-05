import { LayoutComponent } from './pages/layout/layout.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AddIncomeComponent } from './pages/income/add-income/add-income.component';
import { IncomeListComponent } from './pages/income/income-list/income-list.component';
import { IncomeLayoutComponent } from './pages/layout/activity-layout/income-layout/income-layout.component';
import { EditIncomeComponent } from './pages/income/edit-income/edit-income.component';
import { ExpenseLayoutComponent } from './pages/layout/activity-layout/expense-layout/expense-layout.component';
import { ExpenseListComponent } from './pages/expense/expense-list/expense-list.component';
import { AddExpenseComponent } from './pages/expense/add-expense/add-expense.component';
import { EditExpenseComponent } from './pages/expense/edit-expense/edit-expense.component';
import { LoanLayoutComponent } from './pages/layout/activity-layout/loan-layout/loan-layout.component';
import { LoanListComponent } from './pages/loan/loan-list/loan-list.component';
import { AddLoanComponent } from './pages/loan/add-loan/add-loan.component';
import { EditLoanComponent } from './pages/loan/edit-loan/edit-loan.component';
import { UserProfileComponent } from './pages/profile/user-profile/user-profile.component';
import { UserReportComponent } from './pages/report/user-report/user-report.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'income',
                component: IncomeLayoutComponent,
                children: [
                    {
                        path: 'list',
                        component: IncomeListComponent
                    },
                    {
                        path: 'log',
                        component: AddIncomeComponent
                    },
                    {
                        path: 'edit/:id',
                        component: EditIncomeComponent
                    }
                ]
            },
            {
                path: 'expense',
                component: ExpenseLayoutComponent,
                children: [
                    {
                        path: 'list',
                        component: ExpenseListComponent
                    },
                    {
                        path: 'log',
                        component: AddExpenseComponent
                    },
                    {
                        path: 'edit/:id',
                        component: EditExpenseComponent
                    }
                ]
            },
            {
                path: 'loan',
                component: LoanLayoutComponent,
                children: [
                    {
                        path: 'list',
                        component: LoanListComponent
                    },
                    {
                        path: 'log',
                        component: AddLoanComponent
                    },
                    {
                        path: 'edit/:id',
                        component: EditLoanComponent
                    }
                ]
            },
            {
                path: 'reports',
                component: UserReportComponent
            },
            {
                path: 'user-profile',
                component: UserProfileComponent
            },
        ]
    },
];
