import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../models/todo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private readonly http: HttpClient = inject(HttpClient);

  getAll(): Observable<Todo[]> {
    return this.http.get<Todo[]>('');
  }

  create(todo: Omit<Todo, 'id'>): Observable<Todo> {
    return this.http.post<Todo>('', todo);
  }

  update(id: number, todo: Todo): Observable<Todo> {
    return this.http.patch<Todo>(`/${id}`, todo);
  }

  remove(id: number): Observable<unknown> {
    return this.http.delete<any>(`/${id}`);
  }
}
