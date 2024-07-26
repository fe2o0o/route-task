import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { MatIconModule } from '@angular/material/icon';

import { CurrencyPipe } from '@angular/common';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-admin-user-transactions',
  standalone: true,
  imports: [RouterLink,MatIconModule,CurrencyPipe,MatTableModule, MatPaginatorModule],
  templateUrl: './admin-user-transactions.component.html',
  styleUrl: './admin-user-transactions.component.css'
})
export class AdminUserTransactionsComponent implements OnInit {
  constructor(private _AdminService:AdminService) {
    this.dataSource.paginator = this.paginator;
  }
  displayedColumns: string[] = ['position', 'name', 'TransactionsCount', 'totalAmount' , 'show'];
  dataSource = new MatTableDataSource<any>();
  allUsersTransactionsData = signal<any>(null)
  @ViewChild(MatPaginator) paginator !: MatPaginator;

  ngOnInit(): void {
    this._AdminService.getAllUsersTransactions().subscribe({
      next: (res) => {
        console.log(res);

        this.allUsersTransactionsData.set(res)
          this.dataSource.data=res
      }
    })
  }

  applyFilter(targetEvent: any, filterBy: string) {
    const searchTerm = targetEvent.value;
    if (filterBy == "name") {

      this.dataSource.data = this.allUsersTransactionsData().filter((e: any) => e[filterBy]?.includes(searchTerm))
    } else {
      this.dataSource.data = this.allUsersTransactionsData().filter((e: any) => {
        if (!searchTerm) {
          return e
        }
        return e[filterBy] == +searchTerm
      })
    }

  }

}
