import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NoteService } from './service.service';
import { notes } from '../interfaces/interface';

describe('NoteService', () => {
  let service: NoteService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:3000/notes';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NoteService]
    });
    service = TestBed.inject(NoteService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve notes from the API via GET', () => {
    const dummyNotes: notes[] = [
      { id: '1', title: 'Note 1', content: 'Content 1', createdAt: '2023-06-01' },
      { id: '2', title: 'Note 2', content: 'Content 2', createdAt: '2023-06-02' }
    ];

    service.getNotes().subscribe(notes => {
      expect(notes.length).toBe(2);
      expect(notes).toEqual(dummyNotes);
    });

    const request = httpMock.expectOne(apiUrl);
    expect(request.request.method).toBe('GET');
    request.flush(dummyNotes);
  });

  it('should create a new note via POST', () => {
    const newNote: notes = { id: '3', title: 'Note 3', content: 'Content 3', createdAt: '2023-06-03' };

    service.createNote(newNote).subscribe(note => {
      expect(note).toEqual(newNote);
    });

    const request = httpMock.expectOne(apiUrl);
    expect(request.request.method).toBe('POST');
    request.flush(newNote);
  });

  it('should update a note via PUT', () => {
    const updatedNote: notes = { id: '1', title: 'Updated Note 1', content: 'Updated Content 1', createdAt: '2023-06-01' };

    service.updateNote(updatedNote.id, updatedNote).subscribe(note => {
      expect(note).toEqual(updatedNote);
    });

    const request = httpMock.expectOne(`${apiUrl}/${updatedNote.id}`);
    expect(request.request.method).toBe('PUT');
    request.flush(updatedNote);
  });

  it('should delete a note via DELETE', () => {
    const noteId = '1';

    service.deleteNote(noteId).subscribe(note => {
      expect(note).toEqual(note);
    });

    const request = httpMock.expectOne(`${apiUrl}/${noteId}`);
    expect(request.request.method).toBe('DELETE');
    request.flush({});
  });
});
