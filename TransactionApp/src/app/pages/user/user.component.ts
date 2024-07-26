import { Component, signal } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { TableDataComponent } from "../../components/table-data/table-data.component";
import { ChartComponent } from "../../components/chart/chart.component";
import { TransactionFormComponent } from "../../components/transaction-form/transaction-form.component";
import {MatIconModule} from '@angular/material/icon'
import * as $ from 'jquery'
import { ShowUserTransactionComponent } from "../../components/show-user-transaction/show-user-transaction.component";
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatIconModule, NavbarComponent, TableDataComponent, ChartComponent, TransactionFormComponent, ShowUserTransactionComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  transactionData = signal(null);



  updateTransaction = signal(null)

  getTransactionData(event:any) {
    this.transactionData.set(event)
  }

  toggleForm() {
    jQuery('#tran-form').fadeToggle(500)
  }

  handleToggle(event: any) {
    if (!event) {
      this.updateTransaction.set(null)
      this.toggleForm()
    }
  }


  gatUpdateTransaction(event: any) {
    this.updateTransaction.set(event)
    this.toggleForm()
  }


}
