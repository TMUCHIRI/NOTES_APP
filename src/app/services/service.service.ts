import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { notes } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private apiUrl = 'http://localhost:3000/notes'; // Adjust the URL as needed

  constructor(private http: HttpClient) {}

  getNotes(): Observable<notes[]> {
    return this.http.get<notes[]>(this.apiUrl);
  }

  createNote(note: notes): Observable<notes> {
    return this.http.post<notes>(this.apiUrl, note);
  }

  updateNote(id: string, note: notes): Observable<notes> {
    return this.http.put<notes>(`${this.apiUrl}/${id}`, note);
  }

  deleteNote(id: string): Observable<notes> {
    return this.http.delete<notes>(`${this.apiUrl}/${id}`);
  }
}
