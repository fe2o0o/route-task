import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-admin-side-nav',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './admin-side-nav.component.html',
  styleUrl: './admin-side-nav.component.css'
})
export class AdminSideNavComponent {
  constructor(private _AuthService: AuthService) { }

  logout() {
    this._AuthService.logOut()
  }
}
