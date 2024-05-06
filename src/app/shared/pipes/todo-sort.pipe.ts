import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../models/todo';

@Pipe({
  name: 'todoSort',
  standalone: true
})
export class TodoSortPipe implements PipeTransform {

  transform(value: Todo[]): Todo[] {
    return value.sort((a: Todo, b: Todo)=> {
      if(a.completed && !b.completed) {
        return 1;
      }else if (!a.completed && b.completed){
        return -1;
      }else {
        return 0
      }
    });
  }

}
