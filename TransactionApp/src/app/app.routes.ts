import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { UserComponent } from './pages/user/user.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminUserTransactionsComponent } from './components/admin-user-transactions/admin-user-transactions.component';
import { AdminUserTransactionsDetailsComponent } from './components/admin-user-transactions-details/admin-user-transactions-details.component';
import { adminGuard } from './guard/admin.guard';
import { userGuard } from './guard/user.guard';

export const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "user", component: UserComponent , canActivate:[userGuard] },
  {
    path: "admin", component: AdminComponent, canActivate:[adminGuard] ,children: [
      { path: "", redirectTo: "allTransactions", pathMatch: "full" },
      { path: "allTransactions", component: AdminUserTransactionsComponent },
      {path:"userDetails/:id" , component:AdminUserTransactionsDetailsComponent}
  ]}
];
