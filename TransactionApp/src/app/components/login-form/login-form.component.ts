import { Component, signal } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  constructor(private _Router:Router,private _AuthService:AuthService){}
  inputType = signal<boolean>(false)
  globalError = signal<string>('')
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password : new FormControl(null,[Validators.required])
  })

  handleLogin(form:FormGroup) {
    if (form.valid) {
      this._AuthService.login(form.value).subscribe({
        next: (res) => {
          localStorage.setItem('token', res.token)
          this._AuthService.loginUser()
          
        },
        error: (err) => {
          this.globalError.set(err.error.message)
        }
      })
    }
    else {
      this.globalError.set("All Data Is Required")
    }

  }
}
