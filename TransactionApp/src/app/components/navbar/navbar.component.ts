import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';
import * as $ from 'jquery'
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  constructor(private _AuthService: AuthService) {
    this._AuthService.userData.subscribe({
      next: () => {
        if (this._AuthService.userData.getValue() != null) {
          this.userData = this._AuthService.userData.getValue()
        }
      }
    })
  }

  ngOnInit(): void {
  }

  userData: any;

  logOut() {
    this._AuthService.logOut()
  }

  toggleUserData() {
    jQuery('.userData').slideToggle(500)
  }
}
