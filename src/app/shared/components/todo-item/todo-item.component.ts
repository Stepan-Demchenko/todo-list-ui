import { ChangeDetectionStrategy, Component, input, InputSignal, output, OutputEmitterRef } from '@angular/core';
import { CheckBoxComponent } from '../check-box/check-box.component';
import { FormsModule } from '@angular/forms';
import { Todo } from '../../models/todo';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [
    CheckBoxComponent,
    FormsModule,
    DatePipe
  ],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoItemComponent {
  readonly todo: InputSignal<Todo> = input.required<Todo>();
  onComplete: OutputEmitterRef<Todo> = output<Todo>();

  toggleComplete(completed: boolean) {
    this.onComplete.emit({...this.todo(), completed})
  }
}
