import { Component, inject, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoItemComponent } from './shared/components/todo-item/todo-item.component';
import { Todo } from './shared/models/todo';
import { TodoSortPipe } from './shared/pipes/todo-sort.pipe';
import { DialogService } from '@ngneat/dialog';
import { AddTodoDialogComponent } from './shared/components/add-todo-dialog/add-todo-dialog.component';
import { TodoService } from './shared/services/todo.service';
import { filter, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TodoItemComponent, TodoSortPipe, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnDestroy {
  private readonly dialog: DialogService = inject(DialogService);
  protected todosList: Todo[] = [];
  private readonly unsubscribe: Subject<unknown> = new Subject<unknown>();
  constructor(private readonly todoService: TodoService) {
    this.initTodos();
  }

  private initTodos() {
    this.todoService.getAll().pipe(
      tap((todos: Todo[])=> this.todosList = todos),
      takeUntil(this.unsubscribe))
      .subscribe()
  }

  changeComplete(todo: Todo): void {
    this.todoService.update(todo.id, todo)
      .pipe(tap(()=>(this.initTodos())))
      .subscribe();
  }

  addTodo() {
   const dialogRef =  this.dialog.open(AddTodoDialogComponent);
   dialogRef.afterClosed$
     .pipe(
       filter((todo: Todo)=> !!todo),
       switchMap((todo: Todo)=> (this.todoService.create(todo))),
       tap(()=> this.initTodos()),
       takeUntil(this.unsubscribe)
     )
     .subscribe()
  }

  ngOnDestroy() {
    this.unsubscribe.next(null);
    this.unsubscribe.complete();
  }
}
