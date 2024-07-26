import { Component } from '@angular/core';
import { AdminSideNavComponent } from "../../components/admin-side-nav/admin-side-nav.component";
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet,AdminSideNavComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

}
