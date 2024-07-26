import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { DatePipe ,CurrencyPipe } from '@angular/common';
import { ChartComponent } from "../chart/chart.component";
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
@Component({
  selector: 'app-admin-user-transactions-details',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule,DatePipe, CurrencyPipe, ChartComponent],
  templateUrl: './admin-user-transactions-details.component.html',
  styleUrl: './admin-user-transactions-details.component.css'
})
export class AdminUserTransactionsDetailsComponent implements OnInit {
  constructor(private _ActivatedRoute: ActivatedRoute, private _AdminService: AdminService) {
    this._ActivatedRoute.params.subscribe({
      next: (res) => {
        this.userId.set(res['id'])
      }
    })
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this._AdminService.getSpacificUserTransactions(this.userId()).subscribe({
      next: (res) => {
        this.userData.set(res)
        this.dataSource.data=res?.transactions
      }
      })
  }
  userData = signal<any>(null)
  userId = signal<any>(null)



  displayedColumns: string[] = ['position', 'amount', 'date', 'update','desc'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator !: MatPaginator;



}
