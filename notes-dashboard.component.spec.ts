import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NotesDashboardComponent } from './notes-dashboard.component';
import { NoteService } from '../../services/service.service';
import { of } from 'rxjs';
import { notes } from '../../interfaces/interface';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


describe('NotesDashboardComponent', () => {
  let component: NotesDashboardComponent;
  let fixture: ComponentFixture<NotesDashboardComponent>;
  let noteService: jasmine.SpyObj<NoteService>;
  const mockNotes: notes[] = [
    { id: '1', title: 'Note 1', content: 'Content 1', createdAt: '2023-01-01' },
    { id: '2', title: 'Note 2', content: 'Content 2', createdAt: '2023-01-02' }
  ];

  beforeEach(async () => {
    const noteServiceSpy = jasmine.createSpyObj('NoteService', ['getNotes', 'createNote', 'updateNote', 'deleteNote']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule],
      declarations: [NotesDashboardComponent],
      providers: [{ provide: NoteService, useValue: noteServiceSpy }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotesDashboardComponent);
    component = fixture.componentInstance;
    noteService = TestBed.inject(NoteService) as jasmine.SpyObj<NoteService>;

    noteService.getNotes.and.returnValue(of(mockNotes));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load notes on init', () => {
    expect(noteService.getNotes.calls.any()).toBe(true, 'getNotes called');
    expect(component.notes.length).toBe(2);
    expect(component.notes).toEqual(mockNotes);
  });

  it('should add a new note', () => {
    const newNote: notes = { id: '3', title: 'Note 3', content: 'Content 3', createdAt: '2023-01-03' };
    noteService.createNote.and.returnValue(of(newNote));

    component.newNote = newNote;
    component.addNote();

    expect(noteService.createNote.calls.any()).toBe(true, 'createNote called');
    expect(component.notes.length).toBe(3);
    expect(component.notes[2]).toEqual(newNote);
    expect(component.newNote).toEqual({ id: '', title: '', content: '', createdAt: '' });
  });

  it('should update a note', () => {
    const updatedNote: notes = { id: '1', title: 'Updated Note 1', content: 'Updated Content 1', createdAt: '2023-01-01' };
    noteService.updateNote.and.returnValue(of(updatedNote));

    component.selectedNote = updatedNote;
    component.updateNote();

    expect(noteService.updateNote.calls.any()).toBe(true, 'updateNote called');
    expect(component.notes[0]).toEqual(updatedNote);
    expect(component.selectedNote).toBeNull();
  });

  it('should delete a note', () => {
    const noteId = '1';
    noteService.deleteNote.and.returnValue(of());

    component.deleteNote(noteId);

    expect(noteService.deleteNote.calls.any()).toBe(true, 'deleteNote called');
    expect(component.notes.length).toBe(1);
    expect(component.notes.find(note => note.id === noteId)).toBeUndefined();
  });

  it('should select a note for update', () => {
    const note: notes = { id: '1', title: 'Note 1', content: 'Content 1', createdAt: '2023-01-01' };

    component.selectNoteForUpdate(note);

    expect(component.selectedNote).toEqual(note);
  });
});
