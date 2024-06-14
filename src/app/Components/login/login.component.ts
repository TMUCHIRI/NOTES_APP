import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RegisterComponent } from '../register/register.component';
import { NotesDashboardComponent } from '../notes-dashboard/notes-dashboard.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, RegisterComponent, NotesDashboardComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}
