import { Component, input, OnChanges, OnDestroy, output, signal, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../services/user.service';
import { NgClass } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [NgClass,MatIconModule,ReactiveFormsModule],
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.css'
})
export class TransactionFormComponent implements OnChanges  {
  constructor(private _ToastrService:ToastrService,private _UserService:UserService){}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentTransactionForUpdate'].currentValue != null) {
      this.mood.set('update')
      this.handleFormForUpdate(changes['currentTransactionForUpdate'].currentValue)
      this.currantTransactionUpdateData.set(changes['currentTransactionForUpdate'].currentValue)
    }
  }

  currantTransactionUpdateData = signal<any>(null)

  myEmitter = output<boolean>()

  globalError = signal<string>('')

  currentTransactionForUpdate = input()

  mood = signal<string>('add')


  transactionForm: FormGroup = new FormGroup({
    amount: new FormControl(null, [Validators.required, Validators.min(100)]),
    description:new FormControl(null , [Validators.required])
  })

  closeForm() {
    this.myEmitter.emit(false)
    this.mood.set('add')
    this.transactionForm.reset()
    this._UserService.isDataChanged.next(false)
  }

  handleTransaction(form:FormGroup) {
    if (form.valid) {
      if (this.mood() == 'add') {
        this._UserService.addTransaction(form.value).subscribe({
          next: () => {
            this._ToastrService.success('Transaction Added', "Success")
            this._UserService.isDataChanged.next(true)
            this.closeForm()
          },
          error: (err) => {
            this._ToastrService.error(err.error.message, "Faild")
            this.closeForm()
          }
        })
      } else {
        let formValue = form.value;
        const currentValues = this.currantTransactionUpdateData()
        if (formValue.amount != currentValues.amount || formValue.description != currentValues.description) {
          formValue.transactionId = currentValues._id
          this._UserService.updateTransaction(formValue).subscribe({
            next: () => {
              this.closeForm()
              this._ToastrService.success('Transaction Updated', "Success")
              this._UserService.isDataChanged.next(true)
            },
            error: (err) => {
              this._ToastrService.success(err.error.message, "Faild")
              this.closeForm()
            }
          })
        } else {
          this.globalError.set('Data Not Changed To UpDate')
        }
      }
    } else[
      this.globalError.set('All Data Is Required')
    ]
  }

  handleFormForUpdate(data: any) {
    this.transactionForm.setValue({amount:data.amount , description:data.description})
  }



}
