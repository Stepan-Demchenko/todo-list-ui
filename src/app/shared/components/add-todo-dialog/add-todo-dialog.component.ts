import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { DialogRef } from '@ngneat/dialog';

@Component({
  selector: 'app-add-todo-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './add-todo-dialog.component.html',
  styleUrl: './add-todo-dialog.component.scss'
})
export class AddTodoDialogComponent {
  private readonly dialogRef: DialogRef = inject(DialogRef);
  private readonly fb: FormBuilder = inject(FormBuilder);
  protected readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    date: [null, [Validators.required]],
    completed: [false]
  })


  saveToDo() {
    this.dialogRef.close(this.form.value);
  }
}
