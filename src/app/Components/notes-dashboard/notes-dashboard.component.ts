import { Component } from '@angular/core';

interface Note{
  type: string;
  description: string;
  creationDate: Date;
}

@Component({
  selector: 'app-notes-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './notes-dashboard.component.html',
  styleUrl: './notes-dashboard.component.css'
})


export class NotesDashboardComponent {
  addNote(){
    console.log()
  }

}
