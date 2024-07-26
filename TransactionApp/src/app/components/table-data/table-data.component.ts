import { Component, input, OnChanges, OnInit, output, signal, SimpleChanges } from '@angular/core';
import { ViewChild } from '@angular/core';
import {MatIconModule} from '@angular/material/icon'
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery'
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UserService } from '../../services/user.service';
import { DatePipe , CurrencyPipe } from '@angular/common';
import { ShowUserTransactionComponent } from "../show-user-transaction/show-user-transaction.component";
@Component({
  selector: 'app-table-data',
  standalone: true,
  imports: [CurrencyPipe, MatIconModule, DatePipe, MatTableModule, MatPaginatorModule, ShowUserTransactionComponent],
  templateUrl: './table-data.component.html',
  styleUrl: './table-data.component.css'
})
export class TableDataComponent implements OnInit  {
  constructor(private _UserService: UserService , private _ToastrService:ToastrService) {
    this._UserService.isDataChanged.subscribe({
      next: () => {
        if (this._UserService.isDataChanged.getValue()) {
          this.fetchUserTransaction()
        }
      }
    })
    this.dataSource.paginator = this.paginator;
  }
  displayedColumns: string[] = ['No','date', 'amount',"description","control"];
  dataSource = new MatTableDataSource<any>();
  myEmitter = output()

  showTransactionId = signal(null)

  totalAmount = signal(null)
  updateEmitter = output()
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.fetchUserTransaction()
  }

  updateTransaction(transaction:any) {
    this.updateEmitter.emit(transaction)
  }

  fetchUserTransaction() {
    this._UserService.getUserTransactions().subscribe({
      next: (res) => {
        const { transactions } = res
        this.totalAmount.set(res.totalAmount)
        this.myEmitter.emit(transactions)
        this.dataSource.data = transactions
    }
    })
  }


  deleteTransaction(id:any) {
    const myData = {transactionId:id}
    this._UserService.deleteTransaction(myData).subscribe({
      next: () => {
        this.fetchUserTransaction()
        this._ToastrService.success("Transaction Deleted","Success")
      },
      error: (err) => {
        this._ToastrService.error(err.error.message,"Faild")
      }
    })

  }

  ShowUserTransaction(id:any) {
    jQuery('.showTransactionOverlay').fadeIn(500)
    this.showTransactionId.set(id)
  }

  closeShowTransaction() {
    jQuery('.showTransactionOverlay').fadeOut(500)
  }
}
