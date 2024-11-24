import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { TodosService } from '../../../services/todos.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  todos: any[] = [];
  filteredTodos: any[] = [];
  searchControl = new FormControl('');

  constructor(private todosService: TodosService) {}

  ngOnInit(): void {
    this.fetchTodos();

    this.searchControl.valueChanges
      .pipe(debounceTime(300))
      .subscribe((query) => {
        this.filterTodos(query || '');
      });
  }

  fetchTodos(): void {
    this.todosService.getTodos().subscribe((data) => {
      this.todos = data;
      this.filteredTodos = data;
    });
  }

  filterTodos(query: string): void {
    const lowerQuery = query.toLowerCase();
    this.filteredTodos = this.todos.filter((todo) =>
      todo.title.toLowerCase().includes(lowerQuery)
    );
  }
}
