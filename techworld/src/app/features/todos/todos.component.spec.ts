import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodosComponent } from './todos.component';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { TodosService } from '../../../services/todos.service';

describe('TodosComponent', () => {
  let component: TodosComponent;
  let fixture: ComponentFixture<TodosComponent>;
  let mockService: jasmine.SpyObj<TodosService>;

  beforeEach(async () => {
    mockService = jasmine.createSpyObj('TodosService', ['getTodos']);
    mockService.getTodos.and.returnValue(
      of([{ id: 1, title: 'Test Todo', completed: false }])
    );

    await TestBed.configureTestingModule({
      declarations: [TodosComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [{ provide: TodosService, useValue: mockService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch and display todos', () => {
    expect(component.todos.length).toBe(1);
    expect(component.todos[0].title).toBe('Test Todo');
  });

  it('should filter todos based on search', () => {
    component.searchControl.setValue('Test');
    fixture.detectChanges();
    expect(component.filteredTodos.length).toBe(1);
  });
});
