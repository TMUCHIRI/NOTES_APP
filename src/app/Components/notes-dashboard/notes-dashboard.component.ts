import { Component, OnInit } from '@angular/core';
import { notes } from '../../interfaces/interface';
import { NoteService } from '../../services/service.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';




@Component({
  selector: 'app-notes-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './notes-dashboard.component.html',
  styleUrl: './notes-dashboard.component.css'
})


export class NotesDashboardComponent implements OnInit{

    notes: notes[] = [];
    newNote: notes = { id: '', title: '', content: '', createdAt: '' };
    selectedNote: notes | null = null;
  
    constructor(private noteService: NoteService, private fb: FormBuilder) {}
  
    ngOnInit(): void {
      this.getNotes();
      console.log('notes dashboard loaded');
      
    }
  
    getNotes(): void {
      this.noteService.getNotes().subscribe(notes => this.notes = notes);
    }
  
    addNote(): void {
      this.noteService.createNote(this.newNote).subscribe(note => {
        this.notes.push(note);
        this.newNote = { id: '', title: '', content: '', createdAt: '' };
      });
    }
  
    updateNote(): void {
      if (this.selectedNote) {
        this.noteService.updateNote(this.selectedNote.id, this.selectedNote).subscribe(note => {
          const index = this.notes.findIndex(n => n.id === note.id);
          this.notes[index] = note;
          this.selectedNote = null;
        });
      }
    }
  
    deleteNote(id: string): void {
      this.noteService.deleteNote(id).subscribe(() => {
        this.notes = this.notes.filter(note => note.id !== id);
      });
    }
  
    selectNoteForUpdate(note: notes): void {
      this.selectedNote = { ...note };
    }
  }
  


