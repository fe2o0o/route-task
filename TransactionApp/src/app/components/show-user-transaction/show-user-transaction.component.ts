import { Component, input, OnChanges, output, signal, SimpleChanges } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CurrencyPipe , DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-show-user-transaction',
  standalone: true,
  imports: [MatIconModule,CurrencyPipe,DatePipe],
  templateUrl: './show-user-transaction.component.html',
  styleUrl: './show-user-transaction.component.css'
})
export class ShowUserTransactionComponent implements OnChanges {
  constructor(private _UserService:UserService){}
  transactionId = input()
  transaction = signal<any>(null)
  myEmitter = output<boolean>()
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['transactionId'].currentValue != null) {
      this.fetchTransactionData(changes['transactionId'].currentValue)
    }
  }


  fetchTransactionData(id: any) {
    this._UserService.getTransactionById(id).subscribe({
      next: (res) => {
        this.transaction.set(res.transaction)
        console.log(this.transaction());

      }
    })
  }

  closeForm() {
    this.myEmitter.emit(false)
  }
}
