import { Component, signal } from '@angular/core';
import {ReactiveFormsModule ,FormControl, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register-from',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './register-from.component.html',
  styleUrl: './register-from.component.css'
})
export class RegisterFromComponent {
  constructor(private _Router:Router,private _ToastrService:ToastrService,private _AuthService:AuthService){}
  inputType = signal<boolean>(false)

  globalError = signal<string>('')

  registerForm: FormGroup = new FormGroup({
    name:new FormControl(null , [Validators.required , Validators.minLength(3)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password : new FormControl(null,[Validators.required])
  })

  handleRegister(form: FormGroup) {
    if (form.valid) {
      this._AuthService.register(form.value).subscribe({
        next: (res) => {
          this._ToastrService.success("Confirm Register","Success")
          this._Router.navigate(['/login'])
        },
        error: (err) => {
          this.globalError.set(err.error.message)
        }
      })

    } else {
      this.globalError.set('ALL Data Is Required And Vaild')
    }
  }
}
