import { LayoutComponent } from './pages/layout/layout.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AddIncomeComponent } from './pages/income/add-income/add-income.component';
import { IncomeListComponent } from './pages/income/income-list/income-list.component';
import { IncomeLayoutComponent } from './pages/layout/income-layout/income-layout/income-layout.component';
import { EditIncomeComponent } from './pages/income/edit-income/edit-income.component';

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
            }
        ]
    },
];
