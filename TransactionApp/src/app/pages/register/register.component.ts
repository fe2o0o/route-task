import { Component } from '@angular/core';
import { RegisterFromComponent } from "../../components/register-from/register-from.component";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RegisterFromComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

}
